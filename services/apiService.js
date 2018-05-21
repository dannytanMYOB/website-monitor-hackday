var axios = require('axios');

function checkUrl(url) {
	return axios.get(url)
		.then(response => {
	//	console.log('response', response);
			return {
				data: response.data,
				status: response.status,
				url: response.config.url
			}
		})
		.catch(error => {
			return {
				data: undefined,
				status: error.response ?  error.response.status : '404',
				url
			}
		});
}

function checkStatus() {

}


module.exports = {
	checkUrl,
	checkStatus
}