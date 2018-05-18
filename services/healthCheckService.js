var moment = require('moment')
var timeCalculators = require('../helpers/timeCalculators');
var webpageController = require('../controllers/webpageController');

function performHealthCheck() {
    function recursiveHealthCheck () {
        console.info('Performing heath check...', moment().format('MMMM Do YYYY, h:mm:ss a'));
        setTimeout(() => {
            webpageController.getWebpageStatus();
            performHealthCheck()
        }, timeCalculators.getMinutesInMilliseconds(1))
    }

    webpageController.getWebpageStatus();
    recursiveHealthCheck()
}

module.exports = {
    performHealthCheck
}