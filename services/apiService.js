var axios = require('axios');



function checkUrl(url){
	axios.get(url)
	.then(response => {
		// console.log(response.data.url);
		console.log(response.data);
		// x(response.data, 'body', 'svg')(function(err, svg) {
		//     svg // => Pear
		//     console.log(svg)
		// })
	})
	.catch(error => {
		console.log(error.response.status);
	});
}
