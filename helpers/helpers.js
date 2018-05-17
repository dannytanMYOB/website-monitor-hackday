// A series of Utilities to help work magic.
var interfaces = require('os').networkInterfaces();

module.exports = {
  
  // Name the keys that are missing
  missingKeys: (object, keys) => {
    let missing = [];
    keys.forEach(item => {
    if (!object.hasOwnProperty(item)) {
        missing.push(item);
      }
    });
    return (missing.length > 0)
      ? missing.join(', ')
      : false;
  }
};