var _                     = require('lodash');
var uuidV4                = require('uuid/v4');
var elasticsearch         = require('elasticsearch');
var path                  = require('path');
var config                = require(path.resolve('config/config'));

// Constants
const PARAMETER_ERROR_MESSAGE = 'Unsuccessful document indexing - ensure the right parameters were passed';

// The monitoring service allows you to create errors and events on an ElasticSearch cluster
class MonitoringService {

  constructor() {
    this.client = new elasticsearch.Client({
      host: _.get(config, 'settings.monitoring.hostname'),
      log: 'error'
    });

    this.environment = {
      name: _.get(config, 'environment', ''),
      hostname: ''
    };

    // Assign document types so can be mapped during doc curation
    this.documentTypes = config.settings.monitoring.documentTypes;

  }

  // Record an Error Object
  record(eventData) {
    let self = this;
    return new Promise((fulfill, reject) => {
      
      // Reject if incomplete
      // @todo: Determine better means of validation
      console.log(eventData);
      if (!eventData) {
        return reject(new Error(PARAMETER_ERROR_MESSAGE));
      }

      if (eventData.environmentHostname !== self.environment.hostname) {
        self.environment.hostname = eventData.environmentHostname;
      }
console.log('INSIDE MONITORING - ', eventData)
      // Form Document
      var eventDocument = {
        application: eventData.application, // MYOB Website or Node App
        timestamp : new Date(),
        status: eventData.status, // Error or Success
        country: eventData.country, // AU or NZ
        environment: self.environment, // {Name and Hostname} as {Production/Dev and endpoint}
        endpoint: eventData.endpoint, // Actual endpoint hit
        error: {
          errorId: eventData.errorId, // HomepageError or LinkError or APIError
          errorCode: eventData.statusCode, // HTTP Statuscode
          errorMsg: eventData.errorMsg, // Message for error user generated
          priorityLevel: eventData.priorityLevel, // P1 or P2 or P3
        }
      };
      console.log('INSIDE MONITORING calling index  -  ', eventDocument)
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
  _index(doc, documentType = 'events') {
    let self = this;
    console.log('INSIDE INDEX - ', doc)
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
