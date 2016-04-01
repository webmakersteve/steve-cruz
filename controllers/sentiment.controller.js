var express = require('express');
var router = express.Router();
var twitter = require('../services/twitter.service');
var _ = require('lodash');
var tweets_ = require('../services/tweet.service');

router.get('/', function(req, res) {
	twitter.get('search/tweets', {q: 'Blizzard', count: req.query.count || 1000}, function(err, tweets, response) {
		// Map it to sentiment
		// We need to sort them by day and get daily averages
		res.json({days: tweets_.format(tweets)});
	});
});

router.get('/:q', function(req, res) {
	twitter.get('search/tweets', {q: req.params.q, count: req.query.count || 1000}, function(err, tweets, response) {
		// Map it to sentiment
		res.json({days: tweets_.format(tweets), query: req.params.q});
	});
});

module.exports = router;
