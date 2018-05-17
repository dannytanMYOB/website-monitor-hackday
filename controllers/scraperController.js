var Xray = require('x-ray');
var x = Xray();
const apiService = require('../services/apiService.js');

// links 
// x('https://www.myob.com/au/', ['a@href'])(function(err, links) {
  
//   let filteredLinks = links;

//   filteredLinks = Scraper.removeUndefined(filteredLinks);

//   console.log(filteredLinks);

//   filteredLinks = filteredLinks.filter(link => {
//     if (link.indexOf('http') !== -1) {
//       return true;
//     }
//     return false;
//   });
//   // remove duplicates
//   filteredLinks = filteredLinks.filter((link, position) => 
//     filteredLinks.indexOf(link) === position
//   );  
  
// });

// // scripts
// x('https://www.myob.com/au/', ['script@src'])(function(err, scripts) {

// // console.log(scripts);
//   let filteredScripts = scripts;

//   filteredScripts = filteredScripts.filter(script => script);
  
// });

// // images
// x('https://www.myob.com/au/', ['img@data-interchange'])(function(err, images) {
  
//   let filteredImages = images;

//   filteredImages = filteredImages.filter(image => image);

//   filteredImages.forEach((image, index, array) => {
//     array[index] = `https://www.myob.com/${image.match(/\,(.*)\]/).pop().trim()}`;
//   });

//   console.log(filteredImages);

// });


class Scraper {
  constructor() {
    this.assets = {sd: 1};

    this.getLinks = this.getLinks.bind(this);
    // this.removeUndefined = this.removeUnderfined.bind(this);
  }

  static removeUndefined(array) {
    let filteredArray = array;

    filteredArray = filteredArray.filter(item => item);

    return filteredArray;
  }

  getLinks(key, html) {
    const promise = new Promise((resolve, reject) => {
      x(html, ['a@href'])(function(err, links) {
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
        
        console.log(filteredLinks);

        // Scraper.assets[key].links = filteredLinks;

        resolve(filteredLinks);
      });
    });

    return promise;
  }

  getScripts(key, html) {
    const promise = new Promise((resolve, reject) => {
      x(html, ['script@src'])(function(err, scripts) {

        let filteredScripts = scripts;

        filteredScripts = Scraper.removeUndefined(filteredScripts);
        resolve(filteredScripts);
        
      });
    });
    return promise;
  }

  static getImages(html) {
    x('https://www.myob.com/au/', ['img@data-interchange'])(function(err, images) {
  
      let filteredImages = images;

      filteredImages = this.removeUndefined(filteredImages);

      filteredImages.forEach((image, index, array) => {
        array[index] = `https://www.myob.com/${image.match(/\,(.*)\]/).pop().trim()}`;
      });

    });
  }

  startScrape(pages) {
    Object.keys(pages).forEach(function(key, index) {
      console.log('key', key);
      console.log('pages', pages[key]);
    });
  }
}
const example = {
  auHomepage: 'htmldsfglsdfl',
  nzHomepage: 'https://www.myob.com/nz',
}
const s = new Scraper();
// s.startScrape(example);

// Scraper.getLinks();

// console.log(apiService.checkUrl('https://www.myob.com/au').then((data) => {console.log(data)}));

apiService
  .checkUrl('https://www.myob.com/au')
  .then((data) => {
    const html = data.data;


    s.getLinks('auHomepage', html).then(data => {
      s.assets.links = data;
      // console.log(s.assets);
      s.getScripts('auHomepage', html).then(data => {
        s.assets.scripts = data;
      console.log(s.assets);
      })
      .catch((error) => { console.log('err', error) });
      
    });

    
  })
  .catch((error) => { console.log('err', error) });