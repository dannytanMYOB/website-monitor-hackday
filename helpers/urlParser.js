

function getCountry(url) {
	var urlMetadata = url.split('/');
	var country = urlMetadata[3]
	return country === 'au' || 'nz' ? country : '';
}

function getHost(url){
	var urlMetadata = url.split('/')[2];
	var host = urlMetadata[2];
	return host;
}

module.exports = {
	getCountry
}