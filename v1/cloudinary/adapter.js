const base = 'https://res.cloudinary.com/radio4000/image/upload';
const transforms = `q_70,f_auto,fl_lossy`;
const url = `${base}/${transforms}`;

function createImageSizes(id) {
	return {
		small: `${url},w_200,h_200,c_thumb/${id}`,
		medium: `${url},w_480,h_480,c_thumb/${id}`,
		large: `${url},w_1280,h_1280,c_fit/${id}`
	};
}

module.exports = {
	createImageSizes
};
