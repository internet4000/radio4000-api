var {buildCloudinaryUrl} = require('../cloudinary/adapter.js');

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

function serializeImage(image, imageId) {
	if (!image) {
		return;
	}
	image.src = buildCloudinaryUrl(image.src);
	image.id = imageId;
	return image;
}

module.exports = {serializeChannel, serializeTrack, serializeImage};
