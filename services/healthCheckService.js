var moment = require('moment')
var timeCalculators = require('../helpers/timeCalculators');
var webpageController = require('../controllers/webpageController');

performHealthCheck();
function performHealthCheck() {
    //performHealthCheck();
    // function recursiveHealthCheck () {
    //     console.info('Performing heath check...', moment().format('MMMM Do YYYY, h:mm:ss a'))
    //     performHealthCheck();
    //     // setTimeout(() => {
    //     //     webpageController.getWebpageStatus();
    //     //     performHealthCheck()
    //     // }, timeCalculators.getMinutesInMilliseconds(1))
    // }

    webpageController.getWebpageStatus();
    //recursiveHealthCheck()
}

module.exports = {
    performHealthCheck
}