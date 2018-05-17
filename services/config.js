var certFilePath = process.env.API_SIT_CERT_PATH ? process.env.API_SIT_CERT_PATH : '';
var keyFilePath = process.env.API_SIT_KEY_PATH ? process.env.API_SIT_KEY_PATH : '';
var passphrase = process.env.API_CERT_PASSPHRASE ? process.env.API_CERT_PASSPHRASE : '';

module.exports = {
  application: 'Bettacart',
  environment: 'development',
  settings: {
      // Note the 'buy' essentially hidden on the staging server
      apiBaseURL: 'mydot/cart',
      apiHost: 'sit-my.api.myob.com',
      apiPort: 443,
      isSecure: true,
      apiHeaders: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-myobapi-key': 'b4sz8a5ustcvz5j8f4hstpfc'
      },
      v2ApiBaseURL: 'api',
      v2ApiHost: 'billing-sit.gem.myob.com',
      v2ApiPort: 443,
      v2ApiAuth: {
      certFile : certFilePath,
      keyFile : keyFilePath,
      passphrase: passphrase
    },
    pidFile: '/tmp/cart.pid', // Provide absolute path
    logsDir : 'app/logs', // Provide absolute path (starts with '/') or relative path to app root
    mandrillApiKey: 'qgsOVMyfBAgbg1TldMizUA',
    sentryDSN: 'https://af247a6f984840bc872df1b5cbfcfddb:eedf03bbf0ce47909fc2b887346e5b7d@app.getsentry.com/89861',
    baseUrl: '/',
    adobeDTM       : '//assets.adobedtm.com/90767c2038efddc0e74e42ab41943df9c5c6cce0/satelliteLib-cddeedf833fd3fd4762b3e2b5f492ee13155e384-staging.js',
    realtimeConf   : 'app/config/realtime-config.json',
    genesysOn: true,
    genesysGswCampaignName: 'AH Testing Campaign',
    genesysCampaignName: 'SME',
    genesysPostURL : 'http://ocs-api.myob.gsn.com.au/lists/AH_TEST_ONLINE?req=AddRecord',
    notification: {
      hostname: "http://localhost:3100/api/notification"
    },
    experience : {
      optimus : {
        active: true,
        urls: {
        withOptimus: 'http://download.myob.com/arl/Web/AccountRightWebInstaller.exe',
        nonOptimus: 'http://download.myob.com/arl/Current/MYOB_AccountRight.exe'
      }
    },
    sensis: {
      url: 'https://stage-api.ext.sensisdata.com.au/rest/current/phone',
      username: 'myob_tcr_trial',
      password: 'W8aluCw1'
    }
  },
  segmentWriteKey: 'W05RiTFjSsa9BWZj1hLAJVVc0j3C0OfR',
  monitoring: {
  hostname: 'https://search-realtime-dollars-es-dev-wmivrh32tuyhoi7ucykbdx4coi.ap-southeast-2.es.amazonaws.com',
  documentTypes: {
    error: {
      index: 'monitoring-logs-dev',
      type: 'monitoring-errors'
    },
    event: {
      index: 'event-logs-dev',
      type: 'monitoring-events'
    }
  }
  }
  },
  express: {
  additionalCorsHosts: [/^localhost$/i]
  },

  port: 8181
};
