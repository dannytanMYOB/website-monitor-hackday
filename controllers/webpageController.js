var apiService = require('../services/apiService');
var monitoringService = require('../services/monitoringService');

var AU_URL = 'https://www.myob.com/au';
var NZ_URL = 'https://www.myob.com/nz';

function getWebpageStatus() {
  var sites = []
  sites.push(apiService.checkUrl(AU_URL))
  sites.push(apiService.checkUrl(NZ_URL))

  Promise.all(sites)
    .then(([auHTML, nzHTML]) => {
      console.log('AU HTML RESPONSE ', auHTML.status);
      console.log('NZ HTML RESPONSE ', nzHTML.status);
      if (auHTML.status === 200){
        //return scrapingService.scrape({auHTML, nzHTML})
        console.log('call scrapers');
        // Form Document
        var eventDocument = {
          application: 'website', // MYOB Website or Node App
          category: 'website',
          status: 'success', // Error or Success
          country: 'AU', // AU or NZ
          environmentHostname: 'https://www.myob.com', // {Name and Hostname} as {Production/Dev and endpoint}
          endpoint: 'https://www.myob.com/au' // Actual endpoint hit
        };

        monitoringService.record(eventDocument)
          .then((response) => console.log(response))
          .catch((error) => console.error(error));
      } else {
        console.log('calling elastic search');
        // 404 - elastic search

        var errorDetails = {
          application: 'website',
          category: 'website',
          priorityLevel: 'P1',
          country: 'au',
          status: 'error',
          endpoint: 'myob.com/au',
          statusCode: '404',
          errorMsg: 'Server unavailable',
          environmentHostname: 'https://www.myob.com', // {Name and Hostname} as {Production/Dev and endpoint}
        };

        monitoringService.record(errorDetails)
          .then((response) => console.log(response))
          .catch((error) => console.error(error));
      }
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