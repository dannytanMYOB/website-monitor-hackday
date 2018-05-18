function getCountry(url) {
	var urlMetadata = url.split('/');
	var country = urlMetadata[3]
	return country === 'au' || 'nz' ? country : '';
}



module.exports = {
	getCountry
}