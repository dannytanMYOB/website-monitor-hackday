var moment = require('moment')
var timeCalculators = require('../helpers/timeCalculators');
var WebPageController = require('./webpageController');
var apiController = require('./apiController');

class healthCheckController {
    constructor () {
        this.WebpageController = new WebPageController()
    }

    recursiveHealthCheck () {
        console.info('Performing heath check...', moment().format('MMMM Do YYYY, h:mm:ss a'));
        setTimeout(() => {
            this.WebpageController.getWebpageStatus();
            apiController.getAPIStatus();
            this.recursiveHealthCheck()
        }, timeCalculators.getMinutesInMilliseconds(5))
    }

    performHealthCheck () {
        this.WebpageController.getWebpageStatus();
        apiController.getAPIStatus();
        this.recursiveHealthCheck()
    }
}

module.exports = healthCheckController;