var apiService = require('./services/apiService');
var monitoringService = require('./services/monitoringService');

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
  sites.push(apiService.checkUrl(MILES_API));
  sites.push(apiService.checkUrl(SCREEN_SCRAPE_API));
  sites.push(apiService.checkUrl(CART_BUY_API));
  sites.push(apiService.checkUrl(CART_TRIAL_API));

  Promise.all(sites)
    .then(([NOTIFICATION_API_HB, SITE_SEARCH_API_HB, PARTNER_SEARCH_API_HB, UPGRADE_ENGINE_API_HB, MILES_API_HB, SCREEN_SCRAPE_API_HB, CART_BUY_API_HB, CART_TRIAL_API_HB]) => {
      if (NOTIFICATION_API_HB.status === '200' && NOTIFICATION_API_HB.data.status === 'UP') {
        var eventDetails = {
          errorId: 'API',
          //priorityLevel: 'P1',
          //country: 'au',
          status: 'UP',
          hostname: 'https://www.myob.com/api/notification',
          //errorCategory: 'Website',
          //errorEndpoint: 'myob.com/au'
        };

        monitoringService.record({}, eventDetails)
          .then((response) => console.log(response))
          .catch((error) => console.error(error));
      } else {
        console.log('calling elastic search');
        // 404 - elastic search

        var errorDetails = {
          errorId: 'API',
          priorityLevel: 'P1',
          //country: 'au',
          status: 'DOWN',
          hostname: 'https://www.myob.com/api/notification',
          errorCategory: 'apiError',
          errorEndpoint: 'https://www.myob.com/api/notification/heartbeat'
        };

        var err = {
          statusCode: '404',
          errorMsg: 'Server unavailable',
          hostname: 'dev'
        };

        monitoringService.record(err, errorDetails)
          .then((response) => console.log(response))
          .catch((error) => console.error(error));
      }

      if (SITE_SEARCH_API_HB.status === '200' && SITE_SEARCH_API_HB.data.status === 'UP') {
        var eventDetails = {
          errorId: 'API',
          //priorityLevel: 'P1',
          //country: 'au',
          status: 'UP',
          hostname: 'https://www.myob.com/api/site-search',
          //errorCategory: 'Website',
          //errorEndpoint: 'myob.com/au'
        };

        monitoringService.record({}, eventDetails)
          .then((response) => console.log(response))
          .catch((error) => console.error(error));
      } else {
        console.log('calling elastic search');
        // 404 - elastic search

        var errorDetails = {
          errorId: 'API',
          priorityLevel: 'P1',
          //country: 'au',
          status: 'DOWN',
          hostname: 'https://www.myob.com/api/site-search',
          errorCategory: 'apiError',
          errorEndpoint: 'https://www.myob.com/api/site-search/heartbeat'
        };

        var err = {
          statusCode: '404',
          errorMsg: 'Server unavailable',
          hostname: 'dev'
        };

        monitoringService.record(err, errorDetails)
          .then((response) => console.log(response))
          .catch((error) => console.error(error));
      }

      if (PARTNER_SEARCH_API_HB.status === '200' && PARTNER_SEARCH_API_HB.data.status === 'UP') {
        var eventDetails = {
          errorId: 'API',
          //priorityLevel: 'P1',
          //country: 'au',
          status: 'UP',
          hostname: 'https://www.myob.com/api/partner-search',
          //errorCategory: 'Website',
          //errorEndpoint: 'myob.com/au'
        };

        monitoringService.record({}, eventDetails)
          .then((response) => console.log(response))
          .catch((error) => console.error(error));
      } else {
        console.log('calling elastic search');
        // 404 - elastic search

        var errorDetails = {
          errorId: 'API',
          priorityLevel: 'P1',
          //country: 'au',
          status: 'DOWN',
          hostname: 'https://www.myob.com/api/partner-search',
          errorCategory: 'apiError',
          errorEndpoint: 'https://www.myob.com/api/partner-search/heartbeat'
        };

        var err = {
          statusCode: '404',
          errorMsg: 'Server unavailable',
          hostname: 'dev'
        };

        monitoringService.record(err, errorDetails)
          .then((response) => console.log(response))
          .catch((error) => console.error(error));
      }

      if (UPGRADE_ENGINE_API_HB.status === '200' && UPGRADE_ENGINE_API_HB.data.status === 'UP') {
        var eventDetails = {
          errorId: 'API',
          //priorityLevel: 'P1',
          //country: 'au',
          status: 'UP',
          hostname: 'https://www.myob.com/api/upgrade-engine',
          //errorCategory: 'Website',
          //errorEndpoint: 'myob.com/au'
        };

        monitoringService.record({}, eventDetails)
          .then((response) => console.log(response))
          .catch((error) => console.error(error));
      } else {
        console.log('calling elastic search');
        // 404 - elastic search

        var errorDetails = {
          errorId: 'API',
          priorityLevel: 'P1',
          //country: 'au',
          status: 'DOWN',
          hostname: 'https://www.myob.com/api/upgrade-engine',
          errorCategory: 'apiError',
          errorEndpoint: 'https://www.myob.com/api/upgrade-engine/heartbeat'
        };

        var err = {
          statusCode: '404',
          errorMsg: 'Server unavailable',
          hostname: 'dev'
        };

        monitoringService.record(err, errorDetails)
          .then((response) => console.log(response))
          .catch((error) => console.error(error));
      }

      if (MILES_API_HB.status === '200' && MILES_API_HB.data.status === 'UP') {
        var eventDetails = {
          errorId: 'API',
          //priorityLevel: 'P1',
          //country: 'au',
          status: 'UP',
          hostname: 'https://www.myob.com/api/miles',
          //errorCategory: 'Website',
          //errorEndpoint: 'myob.com/au'
        };

        monitoringService.record({}, eventDetails)
          .then((response) => console.log(response))
          .catch((error) => console.error(error));
      } else {
        console.log('calling elastic search');
        // 404 - elastic search

        var errorDetails = {
          errorId: 'API',
          priorityLevel: 'P1',
          //country: 'au',
          status: 'DOWN',
          hostname: 'https://www.myob.com/api/miles',
          errorCategory: 'apiError',
          errorEndpoint: 'https://www.myob.com/api/miles/profile/basic'
        };

        var err = {
          statusCode: '404',
          errorMsg: 'Server unavailable',
          hostname: 'dev'
        };

        monitoringService.record(err, errorDetails)
          .then((response) => console.log(response))
          .catch((error) => console.error(error));
      }

      if (SCREEN_SCRAPE_API_HB.status === '200' && SCREEN_SCRAPE_API_HB.data.status === 'UP') {
        var eventDetails = {
          errorId: 'API',
          //priorityLevel: 'P1',
          //country: 'au',
          status: 'UP',
          hostname: 'https://www.myob.com/api/screen-scrape',
          //errorCategory: 'Website',
          //errorEndpoint: 'myob.com/au'
        };

        monitoringService.record({}, eventDetails)
          .then((response) => console.log(response))
          .catch((error) => console.error(error));
      } else {
        console.log('calling elastic search');
        // 404 - elastic search

        var errorDetails = {
          errorId: 'API',
          priorityLevel: 'P1',
          //country: 'au',
          status: 'DOWN',
          hostname: 'https://www.myob.com/api/screen-scrape',
          errorCategory: 'apiError',
          errorEndpoint: 'https://www.myob.com/api/screen-scrape/heartbeat'
        };

        var err = {
          statusCode: '404',
          errorMsg: 'Server unavailable',
          hostname: 'dev'
        };

        monitoringService.record(err, errorDetails)
          .then((response) => console.log(response))
          .catch((error) => console.error(error));
      }

      if (CART_BUY_API_HB.status === '200') {
        var eventDetails = {
          errorId: 'API',
          //priorityLevel: 'P1',
          //country: 'au',
          status: 'UP',
          hostname: 'https://store.myob.com.au/buy/cart',
          //errorCategory: 'Website',
          //errorEndpoint: 'myob.com/au'
        };

        monitoringService.record({}, eventDetails)
          .then((response) => console.log(response))
          .catch((error) => console.error(error));
      } else {
        console.log('calling elastic search');
        // 404 - elastic search

        var errorDetails = {
          errorId: 'API',
          priorityLevel: 'P1',
          //country: 'au',
          status: 'DOWN',
          hostname: 'https://store.myob.com.au/buy/cart',
          errorCategory: 'apiError',
          errorEndpoint: 'https://store.myob.com.au/buy/cart?productId=1-2O62VRY'
        };

        var err = {
          statusCode: '404',
          errorMsg: 'Server unavailable',
          hostname: 'dev'
        };

        monitoringService.record(err, errorDetails)
          .then((response) => console.log(response))
          .catch((error) => console.error(error));
      }

      if (CART_TRIAL_API_HB.status === '200') {
        var eventDetails = {
          errorId: 'API',
          //priorityLevel: 'P1',
          //country: 'au',
          status: 'UP',
          hostname: 'https://store.myob.com.au/buy/trial',
          //errorCategory: 'Website',
          //errorEndpoint: 'myob.com/au'
        };

        monitoringService.record({}, eventDetails)
          .then((response) => console.log(response))
          .catch((error) => console.error(error));
      } else {
        console.log('calling elastic search');
        // 404 - elastic search

        var errorDetails = {
          errorId: 'API',
          priorityLevel: 'P1',
          //country: 'au',
          status: 'DOWN',
          hostname: 'https://store.myob.com.au/buy/trial',
          errorCategory: 'apiError',
          errorEndpoint: 'https://store.myob.com.au/buy/trial?productId=1-3FZIC82&productLine=plus'
        };

        var err = {
          statusCode: '404',
          errorMsg: 'Server unavailable',
          hostname: 'dev'
        };

        monitoringService.record(err, errorDetails)
          .then((response) => console.log(response))
          .catch((error) => console.error(error));
      }
    });
}
