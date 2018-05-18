

function getCountry(url) {
	var urlMetadata = url.split('/');
	var country = urlMetadata[3]
	return country === 'au' || 'nz' ? country : '';
}

function getHost(url){
//console.log(url)
	var urlMetadata = url.split('/');
	//console.log('url', urlMetadata)
	//console.log(urlMetadata);
	var host = urlMetadata[2];
	//console.log(host);
	return host;
}

module.exports = {
	getCountry,
	getHost
}