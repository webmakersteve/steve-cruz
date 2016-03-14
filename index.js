var express = require('express');

var morgan = require('morgan');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var nconf = require('nconf');
var mustacheExpress = require('mustache-express');

var path = require('path');

var app = express();

nconf.argv()
	.env();

if (!nconf.get('NODE_ENV') || nconf.get('NODE_ENV') === 'development') {
	nconf.file({ file: path.join(__dirname, 'config', 'local.json' )});
}

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'html');
app.engine('html', mustacheExpress());

app.set('views', path.join(__dirname, 'views'));
app.use(compression());
app.use(cookieParser());
app.use(morgan('dev'));

app.set('appPath', path.join(__dirname, 'public'));

app.use('/sentiment', require('./controllers/sentiment.controller'));
app.use('/', require('./controllers/index.controller'));


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
