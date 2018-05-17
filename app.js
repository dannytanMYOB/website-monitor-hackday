var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var index = require('./routes/index');
var users = require('./routes/users');
var apiService = require('./services/apiService');
var monitoringService = require('./services/monitoringService');

var app = express();

var AU_URL = 'https://www.myob.com/au'
var NZ_URL = 'https://www.myob.com/nz'

// call the scraping service after the initial call
getPageLinks();


function getPageLinks() {
  var sites = []
  sites.push(apiService.checkUrl(AU_URL))
  sites.push(apiService.checkUrl(NZ_URL))

  Promise.all(sites)
    .then(([auHTML, nzHTML]) => {
      if (auHTML.status === '200') {
        //return scrapingService.scrape({auHTML, nzHTML})
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

        var errorDetails = {
          errorId: 'website',
          priorityLevel: 'P1',
          country: 'au',
          status: 'au',
          hostname: 'hostname',
          errorCategory: 'apiError',
          errorEndpoint: 'myob.com/au'
        };

        var err = {
          statusCode: '404',
          errorMsg: 'Server unavailable',
          hostname: 'dev'
        };

        monitoringService.record(err, errorDetails)
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



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;