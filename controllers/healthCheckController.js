var moment = require('moment')
var timeCalculators = require('../helpers/timeCalculators');
var WebPageController = require('./webpageController');

class healthCheckController {
    constructor () {
        this.WebpageController = new WebPageController()
    }

    recursiveHealthCheck () {
        console.info('Performing heath check...', moment().format('MMMM Do YYYY, h:mm:ss a'));
        setTimeout(() => {
            this.WebpageController.getWebpageStatus();
            this.recursiveHealthCheck()
        }, timeCalculators.getMinutesInMilliseconds(1))
    }

    performHealthCheck () {
        this.WebpageController.getWebpageStatus();
        this.recursiveHealthCheck()
    }
}

module.exports = healthCheckController