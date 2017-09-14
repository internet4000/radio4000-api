require('dotenv').config()
const express = require('express')
const admin = require('firebase-admin')
const functions = require('firebase-functions')
const bodyParser = require('body-parser')
const got = require('got')
const cors = require('cors')
const pkg = require('./package.json')
const getIframe = require('./utils/get-iframe')
const getOEmbed = require('./utils/get-oembed')

const billings = require('./billings')
const oEmbed = require('./oembed')
const embed = require('./embed')


/*
 * start Express server
 * */

const app = express()

app.use(cors())
app.use(bodyParser.json())


/*
	 If we want to run the server outside of firebase's function servers
	 we'll need a service account, to have the right authorization
	 to connect as admin to our firebase instance.

	 const serviceAccount = require("./serviceAccountKey.json")
	 admin.initializeApp({
     credential: admin.credential.cert(serviceAccount),
     databaseURL: "https://radio4000-staging.firebaseio.com"
	 });
*/

/*
	 When used on firebase servers, we just need to pull the config
	 and run the server that way:
	 $ firebase serve --only functions
	 source: https://firebase.google.com/docs/functions/local-emulator
*/

admin.initializeApp(functions.config().firebase);


/*
 * Global variables +
 * set URL path for api, `embed.` + `api.` calls
 * when serving for `production` or `development` (localhost *)
 * */

const {NODE_ENV, PORT = 3000} = process.env

let R4PlayerScriptUrl = 'https://unpkg.com/radio4000-player'
let host = `http://localhost:${PORT}`
let R4ApiRoot = 'https://radio4000-staging.firebaseio.com/'

if (NODE_ENV === 'production') {
	host = `https://api.radio4000.com`
	R4ApiRoot = 'https://radio4000.firebaseio.com/'
}


/*
 * Routes
 * */

app.get('/', function (req, res) {
	res.json({
		message: 'Welcome to the Radio4000 api',
		documentationUrl: 'https://github.com/internet4000/radio4000-api',
		dataUrl: 'https://radio4000.firebaseio.com',
		embedUrl: host + '/embed',
		oembedUrl: host + '/oembed',
		billingsUrl: host + '/billings'
	})
})


app.use('/embed', embed);
app.use('/oembed', oEmbed);
app.use('/billings', billings);


/*
 * Run server
 * */

app.listen(PORT, function () {
	console.log(`[+] running on port ${PORT}`);
})

module.exports = app
