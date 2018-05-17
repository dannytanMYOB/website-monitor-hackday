// A series of Utilities to help work magic.
var interfaces = require('os').networkInterfaces();

module.exports = {
  
  // Get the IP address of the Host
  getHostIP: () => {
    let hostIP = '';
    for (var interface in interfaces) {
      interfaces[interface].filter((details) => {
        if(details.family === 'IPv4' && details.internal === false) {
          hostIP = details.address;
        }
      });
    }
    return hostIP;
  },
  
  // Check if an object contains all required keys
  hasKeys: (object, keys) => {
    keys.forEach(item => {
      if (!object.hasOwnProperty(item)) {
        return false;
      }
    });
    return true;
  },

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