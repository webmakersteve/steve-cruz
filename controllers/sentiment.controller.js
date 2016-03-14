var sentiment = require('sentiment');
var express = require('express');
var router = express.Router();
var twitter = require('../services/twitter.service');
var _ = require('lodash');

router.get('/', function(req, res) {
	twitter.get('search/tweets', {q: 'Blizzard'}, function(err, tweets, response) {
		// Map it to sentiment
		var statuses = _.map(tweets.statuses, function(status) {
			status.sentiment = sentiment(status.text);
			console.log(status.sentiment);
			return status;
		});
		res.render('sentiment/index.html', { tweets: statuses });
	});
});

module.exports = router;
