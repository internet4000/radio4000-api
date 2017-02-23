var express = require('express');
var app = express();
var firebase = require('firebase');
var cloudinary = require('cloudinary');
var env = require('./env.json');

var firebaseConfig = {
    apiKey: env.firebaseApiKey,
    authDomain: env.firebaseAuthDomain,
    databaseURL: env.firebase.databaseURL
};

var cloudinaryConfig = {
    firebaseDatabaseURL: env.firebaseDatabaseURL,
    cloudinaryApiKey: env.cloudinaryApiKey,
    cloudinaryApiSecret: env.cloudinaryApiSecret
};

firebase.initializeApp(firebaseConfig);

app.get('/channels', function (req, res) {
    // TODO: remove tracks in reponse (impossible at firebase query)
    var channels = firebase.database().ref('/channels');
    channels.once('value').then(snapshot => {
	res.json(snapshot.val());
    });
})

app.get('/channels/:channelSlug', function (req, res) {
    var ref = firebase.database().ref('channels');
    var slug = req.params.channelSlug;
    console.log( "slug", slug );
    ref.orderByChild('slug').equalTo(slug).once('value').then(snapshot => {
	res.send(snapshot.val());
    }).catch(() => {
	res.status(500).json({ error: 'Data does not exist' });
    });
})
app.get('/images/:imageId', function (req, res) {
    // TODO: make cloudinary request
    var ref = firebase.database().ref(`images/${req.params.imageId}`);
    ref.once('value').then(snapshot => {
	res.send(snapshot.val());
    }).catch(() => {
	res.status(500).json({ error: 'Data does not exist' });
    });

})
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
