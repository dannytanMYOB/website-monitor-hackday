var Xray = require('x-ray');

var x = Xray();

// links 

// x('https://www.myob.com/au/', ['a@href'])(function(err, html) {
//   console.log(html);
// });

// scripts

// x('https://www.myob.com/au/', ['script@src'])(function(err, html) {
//   console.log(html);
// });

// fonts
x('https://www.myob.com/au/', ['script@src'])(function(err, html) {
  console.log(html);
});