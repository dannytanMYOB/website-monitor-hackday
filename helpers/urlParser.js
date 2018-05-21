function getCountry(url) {
	console.log('url>>>>>> getCountry', url);
	if (typeof url === 'string') {
		var urlMetadata = url.split('/');
		var country = urlMetadata[3];
		console.log('country', country);
		return country === 'au' || 'nz' ? country : '';
	}
	return '';

}

function getHost(url) {
	if (typeof url === 'string') {
		console.log('host', url)
		var urlMetadata = url.split('/');
		console.log('url', urlMetadata)
		//console.log(urlMetadata);
		var host = urlMetadata[2];
		console.log(host);
		return host;
	}

	return '';

}

module.exports = {
	getCountry,
	getHost
}