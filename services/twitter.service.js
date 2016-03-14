var Twitter = require('twitter');
var conf = require('nconf');

var client = new Twitter({
  consumer_key: conf.get('twitter_consumer_key'),
  consumer_secret: conf.get('twitter_consumer_secret'),
  access_token_key: conf.get('twitter_access_token_key'),
  access_token_secret: conf.get('twitter_access_token_secret')
});

module.exports = client;
