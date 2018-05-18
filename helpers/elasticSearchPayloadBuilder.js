var helpers = require('./urlParser');

function getErrorPayload (site) {

    return {
        application: 'website',
        priorityLevel: 'P1',
        country: `${helpers.getCountry(site.url)}`,
        status: 'Error',
        hostname: `${helpers.getHost(url)}`,
        errorCategory: 'apiError',
        errorEndpoint: 'myob.com/au',
        endpoint: 'myob.com/au',
        statusCode: '404',
        environmentHostname: 'https://www.myob.com', // {Name and Hostname} as {Production/Dev and endpoint}
        error: {
            errorId: eventData.errorId, // HomepageError or LinkError or APIError
            errorCode: eventData.statusCode, // HTTP Statuscode
            errorMsg: eventData.errorMsg, // Message for error user generated
            priorityLevel: eventData.priorityLevel, // P1 or P2 or P3
          }
    };

}


function getSuccessPayload () {
    return {
        application: 'website',
        errorId: 'website',
        priorityLevel: 'P1',
        country: `au`,
        status: 'error',
        hostname: 'hostname',
        errorCategory: 'apiError',
        errorEndpoint: 'myob.com/au',
        endpoint: 'myob.com/au',
        statusCode: '404',
        errorMsg: 'Server unavailable',
        environmentHostname: 'https://www.myob.com', // {Name and Hostname} as {Production/Dev and endpoint}
    };

}

module.exports = {
    getErrorPayload,
    getSuccessPayload
}