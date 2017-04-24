import test from 'ava';
import app from './index';

const request = require('supertest');

test('server runs', async t => {
	var res = await request(app).get('/');
	t.is(res.statusCode, 200);
	t.is(res.body.documentationUrl, 'https://github.com/internet4000/radio4000-api-docs');
});

test('there are some channels', async t => {
	var res = await request(app).get('/v1/channels');
	t.is(res.statusCode, 200);
	t.truthy(res.body.length);
});

test('channel returns some data', async t => {
	var res = await request(app)
		.get('/v1/channels/-JXHtCxC9Ew-Ilck6iZ8');
	t.is(res.statusCode, 200);
	t.truthy(res.body.title.length);
	t.truthy(res.body.tracks.length);
	t.truthy(res.body.favoriteChannels.length);
	t.truthy(res.body.image.sizes.small);
});
