var apiService = require('../services/apiService');
var monitoringService = require('../services/monitoringService');
var scraperService = require('../services/scraperService');
var elasticSearchPayloadBuilder = require('../helpers/elasticSearchPayloadBuilder');

var AU_URL = 'https://www.myob.com/au';
var NZ_URL = 'https://www.myob.com/nz';

class WebPageController {
  constructor() {
    this.Scraper = new scraperService();
  }

  getWebpageStatus() {
    var sites = [];
    sites.push(apiService.checkUrl(AU_URL));
    sites.push(apiService.checkUrl(NZ_URL));

    Promise.all(sites)
      .then((sites) => {
        var monitoringServiceResults = []
        sites.forEach((site) => {
          if (parseInt(site.status) === 200) {
            var successDetails = elasticSearchPayloadBuilder.getSuccessPayload(site.url, 'website');
            monitoringServiceResults.push(monitoringService.record(successDetails))
          } else {
            var errorDetails = elasticSearchPayloadBuilder.getErrorPayload(site);
            monitoringServiceResults.push(monitoringService.record(errorDetails));
          }
        });

        monitoringServiceResults.push(sites)
        return Promise.all(monitoringServiceResults)
      })

      .then((results) => {
        var sites = results[2];
        var scraperPromises = []
        sites.forEach((site) => {
          scraperPromises.push(this.Scraper.startScrape(site.data))
        })

        return Promise.all(scraperPromises)
      })
      .then((scrapedData) => {
        var linkPromises = []
        scrapedData.forEach((site) => {
          site.links.forEach((link) => {
            linkPromises.push(apiService.checkUrl(link));
          })
        })

        return Promise.all(linkPromises)
      })
      .then((linkCalls) => {
      
        var monitoringServiceResults = [];
        linkCalls.forEach((link) => {
          var successDetails = elasticSearchPayloadBuilder.getSuccessPayload(link, 'link');
          monitoringServiceResults.push(monitoringService.record(successDetails))
        })
        // var successDetails = elasticSearchPayloadBuilder.getSuccessPayload(linkCalls[0], 'link');
        // monitoringServiceResults.push(monitoringService.record(successDetails))
        return Promise.all(monitoringServiceResults)
      })
      .then((yay) => {
        console.log('YAYYYYYY>>>>>>>>>>>>>> ', yay)
      }).catch((error) => console.error(error))
  }
}


module.exports = WebPageController