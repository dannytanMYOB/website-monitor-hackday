var helpers = require('./urlParser');

function getErrorPayload(site) {
    console.log('website', helpers.getHost(site));
    return {
        application: 'website',
        priorityLevel: 'P1',
        country: `${helpers.getCountry(site.url)}`,
        status: 'DOWN',
        hostname: `${helpers.getHost(url)}`,
        endpoint: url,
        statusCode: 404,
        category: 'website',
        error: {
            errorCode: 404, // HTTP Statuscode
            errorMsg: 'Webpage unavailable', // Message for error user generated
            priorityLevel: P1, // P1 or P2 or P3
        }
    };

}


function getSuccessPayload(site) {
    console.log('site',site)
    return {
        application: 'website',
        country: `${helpers.getCountry(site)}`,
        status: 'UP',
        hostname: `${helpers.getHost(site)}`,
        endpoint: site,
        statusCode: 200,
        category: 'website'
    };

}

module.exports = {
    getErrorPayload,
    getSuccessPayload
}