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
            console.log(site.url);
            var successDetails = elasticSearchPayloadBuilder.getSuccessPayload(site.url);
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
        var [auSite, nzSite] = results[2];
        console.log('auSite: ', auSite);
        console.log('nzSite: ', nzSite);

        this.Scraper.startScrape(site.data)
          .then((scrapedData) => {
            console.log('scrapedData: ', scrapedData)
          })
          .catch((error) => console.error(error))
      })

      .then(() => {
        var auHTML = {
          links: ['au']
        }
        auHTML.links.forEach((link) => {
          apiService.checkUrl(link);
        })
      })
  }
}


module.exports = WebPageController