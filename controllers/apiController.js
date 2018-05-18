var apiService = require('../services/apiService');
var monitoringService = require('../services/monitoringService');

var NOTIFICATION_API = 'https://www.myob.com/api/notification/heartbeat';

var SITE_SEARCH_API = 'https://www.myob.com/api/site-search/heartbeat';

var PARTNER_SEARCH_API = 'https://www.myob.com/api/partner-search/heartbeat';

var UPGRADE_ENGINE_API = 'https://www.myob.com/api/upgrade-engine/heartbeat';

var MILES_API = 'https://www.myob.com/api/miles/profile/basic'; // - if we are getting status as 'ERROR'

var SCREEN_SCRAPE_API = 'https://www.myob.com/api/screen-scrape/heartbeat';

var CART_BUY_API = 'https://store.myob.com.au/buy/cart?productId=1-2O62VRY';

var CART_TRIAL_API = 'https://store.myob.com.au/buy/trial?productId=1-3FZIC82&productLine=plus';

function getAPIStatus() {
  var sites = [];
  sites.push(apiService.checkUrl(NOTIFICATION_API));
  sites.push(apiService.checkUrl(SITE_SEARCH_API));
  sites.push(apiService.checkUrl(PARTNER_SEARCH_API));
  sites.push(apiService.checkUrl(UPGRADE_ENGINE_API));
  //sites.push(apiService.checkUrl(MILES_API));
  sites.push(apiService.checkUrl(SCREEN_SCRAPE_API));
  sites.push(apiService.checkUrl(CART_BUY_API));
  sites.push(apiService.checkUrl(CART_TRIAL_API));

  Promise.all(sites)
    .then(([NOTIFICATION_API_HB, SITE_SEARCH_API_HB, PARTNER_SEARCH_API_HB, UPGRADE_ENGINE_API_HB, SCREEN_SCRAPE_API_HB, CART_BUY_API_HB, CART_TRIAL_API_HB]) => {
      if (NOTIFICATION_API_HB.status === 200 && NOTIFICATION_API_HB.data.status === 'UP') {
        var eventDocument = {
          application: 'notification', // MYOB Website or Node App
          category: 'API',
          status: 'UP', // Error or Success
          //country: 'AU', // AU or NZ
          environmentHostname: 'https://www.myob.com/api/notification', // {Name and Hostname} as {Production/Dev and endpoint}
          endpoint: 'https://www.myob.com/api/notification/heartbeat' // Actual endpoint hit
        };

        monitoringService.record(eventDocument)
          .then((response) => console.log(response))
          .catch((error) => console.error(error));
      } else {
        // 404 - elastic search
        var errorDetails = {
          application: 'notification',
          category: 'API',
          priorityLevel: 'P1',
          //country: 'au',
          status: 'DOWN',
          endpoint: 'https://www.myob.com/api/notification/heartbeat',
          statusCode: '404',
          errorMsg: 'Server unavailable',
          environmentHostname: 'https://www.myob.com/api/notification', // {Name and Hostname} as {Production/Dev and endpoint}
        };

        monitoringService.record(errorDetails)
          .then((response) => console.log(response))
          .catch((error) => console.error(error));
      }

      if (SITE_SEARCH_API_HB.status === 200 && SITE_SEARCH_API_HB.data.status === 'UP') {
        var eventDocument = {
          application: 'site-search', // MYOB Website or Node App
          category: 'API',
          status: 'UP', // Error or Success
          //country: 'AU', // AU or NZ
          environmentHostname: 'https://www.myob.com/api/site-search', // {Name and Hostname} as {Production/Dev and endpoint}
          endpoint: 'https://www.myob.com/api/site-search/heartbeat' // Actual endpoint hit
        };
        monitoringService.record(eventDocument)
          .then((response) => console.log(response))
          .catch((error) => console.error(error));
      } else {
        // 404 - elastic search
        var errorDetails = {
          application: 'site-search',
          category: 'API',
          priorityLevel: 'P1',
          //country: 'au',
          status: 'DOWN',
          endpoint: 'https://www.myob.com/api/site-search/heartbeat',
          statusCode: '404',
          errorMsg: 'Server unavailable',
          environmentHostname: 'https://www.myob.com/api/site-search', // {Name and Hostname} as {Production/Dev and endpoint}
        };

        monitoringService.record(errorDetails)
          .then((response) => console.log(response))
          .catch((error) => console.error(error));
      }

      if (PARTNER_SEARCH_API_HB.status === 200 && PARTNER_SEARCH_API_HB.data.status === 'UP') {
        var eventDocument = {
          application: 'partner-search', // MYOB Website or Node App
          category: 'API',
          status: 'UP', // Error or Success
          //country: 'AU', // AU or NZ
          environmentHostname: 'https://www.myob.com/api/partner-search', // {Name and Hostname} as {Production/Dev and endpoint}
          endpoint: 'https://www.myob.com/api/partner-search/heartbeat' // Actual endpoint hit
        };

        monitoringService.record(eventDocument)
          .then((response) => console.log(response))
          .catch((error) => console.error(error));
      } else {
        // 404 - elastic search
        var errorDetails = {
          application: 'partner-search',
          category: 'API',
          priorityLevel: 'P1',
          //country: 'au',
          status: 'DOWN',
          endpoint: 'https://www.myob.com/api/partner-search/heartbeat',
          statusCode: '404',
          errorMsg: 'Server unavailable',
          environmentHostname: 'https://www.myob.com/api/partner-search', // {Name and Hostname} as {Production/Dev and endpoint}
        };

        monitoringService.record(errorDetails)
          .then((response) => console.log(response))
          .catch((error) => console.error(error));
      }

      if (UPGRADE_ENGINE_API_HB.status === 200 && UPGRADE_ENGINE_API_HB.data.status === 'UP') {
        var eventDocument = {
          application: 'upgrade-engine', // MYOB Website or Node App
          category: 'API',
          status: 'UP', // Error or Success
          //country: 'AU', // AU or NZ
          environmentHostname: 'https://www.myob.com/api/upgrade-engine', // {Name and Hostname} as {Production/Dev and endpoint}
          endpoint: 'https://www.myob.com/api/upgrade-engine/heartbeat' // Actual endpoint hit
        };
        monitoringService.record(eventDocument)
          .then((response) => console.log(response))
          .catch((error) => console.error(error));
      } else {
        // 404 - elastic search
        var errorDetails = {
          application: 'upgrade-engine',
          category: 'API',
          priorityLevel: 'P1',
          //country: 'au',
          status: 'DOWN',
          endpoint: 'https://www.myob.com/api/upgrade-engine/heartbeat',
          statusCode: '404',
          errorMsg: 'Server unavailable',
          environmentHostname: 'https://www.myob.com/api/upgrade-engine', // {Name and Hostname} as {Production/Dev and endpoint}
        };
        monitoringService.record(errorDetails)
          .then((response) => console.log(response))
          .catch((error) => console.error(error));
      }

      // if (MILES_API_HB.status === 200 && MILES_API_HB.data.status === 'UP') {
      //   var eventDocument = {
      //     application: 'miles', // MYOB Website or Node App
      //     category: 'API',
      //     status: 'UP', // Error or Success
      //     //country: 'AU', // AU or NZ
      //     environmentHostname: 'https://www.myob.com/api/miles', // {Name and Hostname} as {Production/Dev and endpoint}
      //     endpoint: 'https://www.myob.com/api/miles/heartbeat' // Actual endpoint hit
      //   };
      //
      //   monitoringService.record(eventDocument)
      //     .then((response) => console.log(response))
      //     .catch((error) => console.error(error));
      // } else {
      //   // 404 - elastic search
      //   var errorDetails = {
      //     application: 'miles',
      //     category: 'API',
      //     priorityLevel: 'P1',
      //     //country: 'au',
      //     status: 'DOWN',
      //     endpoint: 'https://www.myob.com/api/miles/heartbeat',
      //     statusCode: '404',
      //     errorMsg: 'Server unavailable',
      //     environmentHostname: 'https://www.myob.com/api/miles', // {Name and Hostname} as {Production/Dev and endpoint}
      //   };
      //
      //   monitoringService.record(errorDetails)
      //     .then((response) => console.log(response))
      //     .catch((error) => console.error(error));
      // }

      if (SCREEN_SCRAPE_API_HB.status === 200 && SCREEN_SCRAPE_API_HB.data.status === 'UP') {
        var eventDocument = {
          application: 'screen-scrape', // MYOB Website or Node App
          category: 'API',
          status: 'UP', // Error or Success
          //country: 'AU', // AU or NZ
          environmentHostname: 'https://www.myob.com/api/screen-scrape', // {Name and Hostname} as {Production/Dev and endpoint}
          endpoint: 'https://www.myob.com/api/screen-scrape/heartbeat' // Actual endpoint hit
        };

        monitoringService.record(eventDocument)
          .then((response) => console.log(response))
          .catch((error) => console.error(error));
      } else {
        // 404 - elastic search
        var errorDetails = {
          application: 'screen-scrape',
          category: 'API',
          priorityLevel: 'P1',
          //country: 'au',
          status: 'DOWN',
          endpoint: 'https://www.myob.com/api/screen-scrape/heartbeat',
          statusCode: '404',
          errorMsg: 'Server unavailable',
          environmentHostname: 'https://www.myob.com/api/screen-scrape', // {Name and Hostname} as {Production/Dev and endpoint}
        };

        monitoringService.record(errorDetails)
          .then((response) => console.log(response))
          .catch((error) => console.error(error));
      }

      if (CART_BUY_API_HB.status === 200) {
        var eventDocument = {
          application: 'cart', // MYOB Website or Node App
          category: 'API',
          status: 'UP', // Error or Success
          //country: 'AU', // AU or NZ
          environmentHostname: 'https://store.myob.com.au/buy/cart', // {Name and Hostname} as {Production/Dev and endpoint}
          endpoint: 'https://store.myob.com.au/buy/cart?productId=1-2O62VRY' // Actual endpoint hit
        };

        monitoringService.record(eventDocument)
          .then((response) => console.log(response))
          .catch((error) => console.error(error));
      } else {
        // 404 - elastic search
        var errorDetails = {
          application: 'cart',
          category: 'API',
          priorityLevel: 'P1',
          //country: 'au',
          status: 'DOWN',
          endpoint: 'https://store.myob.com.au/buy/cart?productId=1-2O62VRY',
          statusCode: '404',
          errorMsg: 'Server unavailable',
          environmentHostname: 'https://store.myob.com.au/buy/cart', // {Name and Hostname} as {Production/Dev and endpoint}
        };

        monitoringService.record(errorDetails)
          .then((response) => console.log(response))
          .catch((error) => console.error(error));
      }

      if (CART_TRIAL_API_HB.status === 200) {
        var eventDocument = {
          application: 'cart', // MYOB Website or Node App
          category: 'API',
          status: 'UP', // Error or Success
          //country: 'AU', // AU or NZ
          environmentHostname: 'https://store.myob.com.au/buy/trial', // {Name and Hostname} as {Production/Dev and endpoint}
          endpoint: 'https://store.myob.com.au/buy/trial?productId=1-3FZIC82&productLine=plus' // Actual endpoint hit
        };

        monitoringService.record(eventDocument)
          .then((response) => console.log(response))
          .catch((error) => console.error(error));
      } else {
        // 404 - elastic search
        var errorDetails = {
          application: 'cart',
          category: 'API',
          priorityLevel: 'P1',
          //country: 'au',
          status: 'DOWN',
          endpoint: 'https://store.myob.com.au/buy/trial?productId=1-3FZIC82&productLine=plus',
          statusCode: '404',
          errorMsg: 'Server unavailable',
          environmentHostname: 'https://store.myob.com.au/buy/trial', // {Name and Hostname} as {Production/Dev and endpoint}
        };

        monitoringService.record(errorDetails)
          .then((response) => console.log(response))
          .catch((error) => console.error(error));
      }
    });
}

module.exports = {
  getAPIStatus
}