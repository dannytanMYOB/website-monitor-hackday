var _                     = require('lodash');
var uuidV4                = require('uuid/v4');
var elasticsearch         = require('elasticsearch');
var path                  = require('path');
var config                = require(path.resolve('app/config/env'));
var helpers               = require(path.resolve('app/utils/helpers'));


// Constants
const PARAMETER_ERROR_MESSAGE = 'Unsuccessful document indexing - ensure the right parameters were passed';
const VALID_ERROR_CATEGORIES = ['apiError', 'serverError'];
const REQUIRED_ERROR_FIELDS = ['errorId', 'priorityLevel'];
const PURCHASE_TRANSACTION_EVENT = 'purchase';
const TRIAL_TRANSACTION_EVENT = 'trial';


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

  // Set the name of the application
  setApplication(application) {
    this.application = application || 'unknown';
  }


  // Record an Error Object
  record(errorObj, errorData) {
    let self = this;
    return new Promise((fulfill, reject) => {
      
      // Reject if incomplete
      // @todo: Determine better means of validation
      if (!errorObj || !errorData) {
        return reject(new Error(PARAMETER_ERROR_MESSAGE));
      }
      if (!VALID_ERROR_CATEGORIES.includes(errorData.errorCategory)) {
        return reject(new Error(`Error category: ${errorData.errorCategory} is not registered`));
      }
      let missingKeys = helpers.missingKeys(errorData, REQUIRED_ERROR_FIELDS);
      if (missingKeys) {
        return reject(new Error(`${missingKeys} has not been defined`));
      }

      if (errorData.hostname !== self.environment.hostname) {
        self.environment.hostname = errorData.hostname;
      }

      // Form Document
      var errorDocument = {
        application: self.application,
        timestamp : new Date(), 
        priorityLevel: errorData.priorityLevel,
        environment: self.environment,
        user: errorData.user,
        error: {
          errorId: errorData.errorId,
          category: errorData.errorCategory,
          endpoint: errorData.errorEndpoint,
          errorCode: errorObj.statusCode,
          errorMsg: errorObj.hasOwnProperty('response') && errorObj.response.hasOwnProperty('errors')
            ? errorObj.response.errors[0].description || errorObj.response.errors[0].message
            : 'Error in reaching server',
          exceptionCode: errorData.errorExceptionCode,
          hostname: errorData.errorHostname ||''
        }
      };

      // Index Document
      self._index(errorDocument)
        .then(result => fulfill(result))
        .catch(err => reject(err));

    });
  }

  // Record an Event Object
  event(eventDocument) {
    let self = this;
    return new Promise((fulfill, reject) => {

      // Reject if incomplete
      if (!eventDocument) {
        return reject(new Error(PARAMETER_ERROR_MESSAGE));
      }

      if (eventDocument.hostname !== self.environment.hostname) {
        self.environment.hostname = eventDocument.hostname;
      }

      // Augment event Document with standard stuff
      eventDocument.application = self.application;
      eventDocument.environment = self.environment;
      eventDocument.timestamp = new Date();

      // Index Document
      self._index(eventDocument, 'event')
        .then(result => fulfill(result))
        .catch(err => reject(err));

    });
  }


  /**
    * Convenience Functions
  **/

    // Convenience function to set 
  getClient(req) {
    return {
      userIp: req.get('x-forwarded-for') || req.connection.remoteAddress,
      userAgent: req.get('user-agent'),
      referrer: req.get('referrer')
    };
  }


  // Reduce a list of items to a single named property.
  // For trials, we want the property where there isn't a serial number
  reduceOrderItemsToProperty(items, property, isTrial = false) {
    return property === undefined
      ? false
      : items
        .filter(item => {
          return isTrial
            ? !item.hasOwnProperty('serial_number')
            : item.hasOwnProperty('serial_number');
        })
        .reduce((a, item) => item[property], false);
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
