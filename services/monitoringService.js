var _                     = require('lodash');
var uuidV4                = require('uuid/v4');
var elasticsearch         = require('elasticsearch');
var path                  = require('path');
var config                = require(path.resolve('services/config'));
var helpers               = require(path.resolve('helpers/helpers'));

// Constants
const PARAMETER_ERROR_MESSAGE = 'Unsuccessful document indexing - ensure the right parameters were passed';
const VALID_ERROR_CATEGORIES = ['apiError', 'serverError'];
const REQUIRED_ERROR_FIELDS = ['errorId', 'priorityLevel'];


// The monitoring service allows you to create errors and events on an ElasticSearch cluster
class MonitoringService {

  constructor() {
    this.client = new elasticsearch.Client({
      host: _.get(config, 'settings.monitoring.hostname'),
      log: 'error'
    });

    this.environment = {
      ip: helpers.getHostIP(),
      name: _.get(config, 'environment', ''),
      hostname: ''
    };

    this.application = _.get(config, 'application', undefined);

    // Assign document types so can be mapped during doc curation
    this.documentTypes = config.settings.monitoring.documentTypes;

  }

  // Record an Error Object
  record(eventObj, eventData) {
    let self = this;
    return new Promise((fulfill, reject) => {
      
      // Reject if incomplete
      // @todo: Determine better means of validation
      if (!eventObj || !eventData) {
        return reject(new Error(PARAMETER_ERROR_MESSAGE));
      }
      if (!VALID_ERROR_CATEGORIES.includes(eventData.errorCategory)) {
        return reject(new Error(`Error category: ${eventData.errorCategory} is not registered`));
      }
      let missingKeys = helpers.missingKeys(eventData, REQUIRED_ERROR_FIELDS);
      if (missingKeys) {
        return reject(new Error(`${missingKeys} has not been defined`));
      }

      if (eventData.hostname !== self.environment.hostname) {
        self.environment.hostname = eventData.hostname;
      }

      // Form Document
      var eventDocument = {
        application: self.application,
        timestamp : new Date(), 
        priorityLevel: eventData.priorityLevel,
        environment: self.environment,
        status: eventData.status,
        country: eventData.country,
        error: {
          errorId: eventData.errorId,
          category: eventData.errorCategory,
          endpoint: eventData.errorEndpoint,
          errorCode: eventObj.statusCode,
          errorMsg: eventObj.errorMessage,
          hostname: eventData.errorHostname ||''
        }
      };
      // Index Document
      self._index(eventDocument)
        .then(result => fulfill(result))
        .catch(err => reject(err));

    });
  }

  /**
    * INTERNAL METHODS
  **/

  // Write a document to the index
  // @todo: The index function returns a promise so should just be returning that call without wrapping in a new promise and using callbacks.
  _index(doc, documentType = 'error') {
    let self = this;
    return new Promise((fulfill, reject) => {
      self.client.index({
        index: self.documentTypes[documentType].index, 
        type: self.documentTypes[documentType].type,
        id: uuidV4(),
        body: doc
      }, (error, response) => {
        if(error) {
          reject(`Document type ${documentType} indexing error: `, error);
        } else {
          fulfill(`Document type ${documentType} indexed successfully`);
        }
      });
    });
  }

}



// Singleton Monitoring Service
module.exports = new MonitoringService();
