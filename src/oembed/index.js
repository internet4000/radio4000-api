const express = require('express');
const oembed  = express.Router();

oembed.get('/', (req, res, next) => {
	const slug = req.query.slug
	const usage = '?slug={radio4000-channel-slug}'
	if (!slug) return notEndpointPath(req, res, usage)

	getChannelBySlug(slug).then(response => {
		const channels = JSON.parse(response.body)
		const id = Object.keys(channels)[0]
		let channel = channels[id]
		channel.id = id
		if (!channel) return notEndpointPath(req, res, usage)
		const embedHtml = getOEmbed(host, channel)
		res.send(embedHtml)
	}).catch(error => {
		res.status(500).send({
			'message': `Could not fetch channel from ${R4ApiRoot}`,
			'code': 500,
			'internalError': error
		})
	})
})

function getChannelBySlug(slug) {
	const url = `${R4ApiRoot}channels.json?orderBy="slug"&equalTo="${slug}"`
	return got(url, {
		timeout: 6000,
		retries: 1
	})
}
