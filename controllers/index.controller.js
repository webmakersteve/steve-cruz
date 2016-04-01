var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('index.html');
});

router.get('/search', function(req, res) {
	res.render('index.html', {
		query1: req.query.query1 || '',
		query2: req.query.query2 || '',
		numTweets: req.query.numTweets || 1000
	});
});

module.exports = router;
