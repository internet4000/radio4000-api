const express = require('express');
const embed  = express.Router();

embed.get('/', function (req, res) {
	const slug = req.query.slug
	const usage = `?slug={radio4000-channel-slug}`
	if (!slug) return notEndpointPath(req, res, usage)
	res.send(getIframe(slug, R4PlayerScriptUrl))
})
