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

// Replace `images` with a single `thumbnail` URL.
function embedImage(channel, image) {
	delete channel.images;
	channel.image = serializeImage(image);
	return channel;
}

module.exports = {
	serializeChannel,
	serializeTrack,
	serializeImage,
	embedImage
};
