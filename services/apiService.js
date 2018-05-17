var axios = require('axios');



function checkUrl(url) {
	return axios.get(url)
		.then(response => {
			return {
				data: response.data,
				status: response.status
			}
		})
		.catch(error => {
			return {
				data: undefined,
				status: error.response.status
			}
		});
}

function checkStatus() {

}