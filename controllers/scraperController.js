var Xray = require('x-ray');
var x = Xray();

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
    this.assets = {
      links: [],
      scripts: [],
      images: [],
    };
  }

  static removeUndefined(array) {
    let filteredArray = array;

    filteredArray = filteredArray.filter(item => item);

    return filteredArray;
  }

  static getLinks(html) {
    x('https://www.myob.com/au/', ['a@href'])(function(err, links) {
      let filteredLinks = links;

      filteredLinks = this.removeUndefined(filteredLinks);

      console.log(filteredLinks);

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
      
    });
  }

  static getScripts(html) {
    x('https://www.myob.com/au/', ['script@src'])(function(err, scripts) {

      let filteredScripts = scripts;

      filteredScripts = this.removeUndefined(filteredScripts);
      
    });
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
  auHomepage: 'https://www.myob.com/au',
  nzHomepage: 'https://www.myob.com/nz',
}
// const s = new Scraper();
// s.startScrape(example);
