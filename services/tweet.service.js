'use strict';

var _ = require('lodash');
var sentiment = require('sentiment');
var moment = require('moment');

var TweetService = {
	format: function(tweets) {
		var statuses = tweets.statuses;

		// This shoves sentiment in. We need to sort by day now

		statuses = _.map(statuses, function(status) {
			var m = moment(new Date(status.created_at));
			status.sentiment = sentiment(status.text);
			status.unix = m.unix();
			status.day_month = m.format('M.D');

			return status;
		});

		var dates = {};

		statuses = _.sortBy(statuses, 'unix');

		_.forEach(statuses, function(status) {
			if (!dates.hasOwnProperty(status.day_month)) {
				dates[status.day_month] = { tweets: [] };
			}

			dates[status.day_month].tweets.push(status);
		});

		// Now we need to come up with the average per day

		dates = _.mapValues(dates, function(date) {
			var sentiment = 0;
			var len = 0;
			_.forEach(date.tweets, function(tweet) {
				len += 1;
				sentiment += tweet.sentiment.score;
			});

			date.sentimentAverage = sentiment / len;

			return date;
		});

		return dates;
	}
};

module.exports = TweetService;
