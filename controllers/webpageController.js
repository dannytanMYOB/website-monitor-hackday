var apiService = require('../services/apiService');
var monitoringService = require('../services/monitoringService');
var elasticSearchPayloadBuilder = require('../helpers/elasticSearchPayloadBuilder');

var AU_URL = 'https://www.myob.com/au';
var NZ_URL = 'https://www.myob.com/nz';

function getWebpageStatus() {
  var sites = []
  sites.push(apiService.checkUrl(AU_URL))
  sites.push(apiService.checkUrl(NZ_URL))

  Promise.all(sites)
    .then((sites) => {
      sites.forEach((site) => {
        console.log(site.url)
        if (site.status === '200') {
          //return scrapingService.scrape(site.data)
          console.log('call scrapers');

          // var eventDetails = {
          //   errorId: 'website',
          //   priorityLevel: 'P1',
          //   country: 'au',
          //   status: 'au',
          //   hostname: 'hostname',
          //   errorCategory: 'Website',
          //   errorEndpoint: 'myob.com/au'
          // };
          //
          // monitoringService.record({}, eventDetails)
          //   .then((response) => console.log(response))
          //   .catch((error) => console.error(error));
        } else {
          console.log('calling elastic search');
          // 404 - elastic search



          var errorDetails = elasticSearchPayloadBuilder.getErrorPayload(site);
          
          {
            errorId: 'website',
            priorityLevel: 'P1',
            country: `${helpers.getCountry(site.url)}`,
            status: 'au',
           // hostname: `${}`,
            errorCategory: 'apiError',
            errorEndpoint: 'myob.com/au',
            statusCode: '404',
            errorMsg: 'Server unavailable',
            hostname: 'dev'
          };

          

          monitoringService.record(err, errorDetails)
            .then((response) => console.log(response))
            .catch((error) => console.error(error));
        }
      });

    }).then(() => {
      var auHTML = {
        links: ['au']
      }
      auHTML.links.forEach((link) => {
        apiService.checkUrl(link);
      })
    })
}

module.exports = {
  getWebpageStatus
}