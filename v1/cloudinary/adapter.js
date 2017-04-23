var rootUrl = 'https://res.cloudinary.com/radio4000/image/upload/q_70,w_320,h_320,c_thumb,c_fill,fl_lossy/';

function buildCloudinaryUrl(imageSrc) {
	return `${rootUrl}${imageSrc}`;
}

module.exports = {buildCloudinaryUrl};
