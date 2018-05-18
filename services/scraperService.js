var Xray = require('x-ray');
var x = Xray();
// const apiService = require('./apiService.js');

class Scraper {

  static removeUndefined(array) {
    let filteredArray = array;

    filteredArray = filteredArray.filter(item => item);

    return filteredArray;
  }

  getLinks(html) {
    const promise = new Promise((resolve, reject) => {
      x(html, ['a@href'])(function (err, links) {
        const linksObject = {
          links: [],
        };

        let filteredLinks = links;

        filteredLinks = Scraper.removeUndefined(filteredLinks);

        filteredLinks = filteredLinks.filter(link => {
          if (link.indexOf('http') !== -1) {
            return true;
          }

          return false;
        });

        // remove duplicates
        filteredLinks = filteredLinks.filter((link, position) =>
          filteredLinks.indexOf(link) === position
        );

        linksObject.links = filteredLinks;

        resolve(linksObject);
      });
    });

    return promise;
  }

  getScripts(html) {
    const promise = new Promise((resolve, reject) => {
      x(html, ['script@src'])(function (err, scripts) {
        const scriptsObject = {
          scripts: [],
        };

        let filteredScripts = scripts;

        filteredScripts = Scraper.removeUndefined(filteredScripts);

        filteredScripts.forEach((script, index, array) => {
          if (script.indexOf('https://') === -1 && script.indexOf('http://') === -1) {
            if(script.substring(0,2) === '//') {
              array[index] = `https:${script}`;
            } else {
              array[index] = `https://www.myob.com${script}`;
            }
          }

        });

        scriptsObject.scripts = filteredScripts;

        resolve(scriptsObject);

      });
    });
    return promise;
  }

  getImages(html) {
    const promise = new Promise((resolve, reject) => {

      x(html, ['img@data-interchange'])(function (err, images) {

        const imagesObject = {
          images: [],
        };

        let filteredImages = images;

        filteredImages = Scraper.removeUndefined(filteredImages);

        filteredImages.forEach((image, index, array) => {
          array[index] = `https://www.myob.com${image.match(/\,(.*)\]/).pop().trim()}`;
        });

        imagesObject.images = filteredImages;
        
        resolve(imagesObject);
      });

    });

    return promise;
  }

  startScrape(html) {
    const promise = new Promise((resolve, reject) => {
      Promise.all([this.getLinks(html), this.getScripts(html), this.getImages(html)])
      .then(data => {
        const assets = {};

        data.forEach((item, index, array) => {
          Object.assign(assets, item);
        });

        resolve(assets);
      })
      .catch((error) => {
        reject(error);
      });
    });

    return promise;
  }
}

module.exports = Scraper;

// const s = new Scraper();

// apiService
//   .checkUrl('https://www.myob.com/au/support')
//   .then((data) => {
//     const html = data.data;

//     s.startScrape(html).then(data => {
//       console.log(data);
//     });

//   })
//   .catch((error) => {
//     console.log('err', error)
//   });