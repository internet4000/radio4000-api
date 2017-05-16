var {createImageSizes} = require('../cloudinary/adapter.js');

function convertHasMany(fromObject) {
	if (!fromObject) {
		return;
	}
	return Object.keys(fromObject);
}

function serializeChannel(channel, channelId) {
	if (!channel) {
		return;
	}

	delete channel.channelPublic;

	channel.id = channelId;
	channel.tracks = convertHasMany(channel.tracks);
	channel.favoriteChannels = convertHasMany(channel.favoriteChannels);
	if (channel.images) {
		const images = convertHasMany(channel.images);
		channel.image = images[images.length - 1];
		delete channel.images;
	}

	return channel;
}

function serializeTrack(track, trackId) {
	if (!track) {
		return;
	}
	track.id = trackId;
	return track;
}

function serializeImage(image, id) {
	if (!image) {
		return;
	}
	return {
		id,
		src: image.src,
		sizes: createImageSizes(image.src)
	};
}

module.exports = {
	serializeChannel,
	serializeTrack,
	serializeImage
};
