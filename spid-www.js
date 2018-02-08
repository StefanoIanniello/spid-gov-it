'use strict';

process.env.NODE_ENV = 'production';


var express = require("express");
var path = require("path");
var exphbs = require('express-handlebars');
var globalizeExpress  = require('globalize-express');
var cookieParser = require('cookie-parser');
var helmet = require('helmet');
var path = require('path');
var http = require('http');
var fs = require('fs');
var favicon = require('serve-favicon');

var http_port = 8000;
var https_port = 4430;

var app = express();
app.use(favicon(path.join(__dirname,'views','assets/img','favicon.ico')));

if (process.env.EXP_APPCACHE == 'false') {
    console.log('\n\nView cache disabled, enable in production !\n\n');
    app.disable('view cache');
}

var hbs = exphbs.create({
    defaultLayout: 'template-standard',
    helpers: require('./app/helpers')
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use('/assets', express.static(__dirname + '/views/assets'));

app.use(cookieParser());
app.use(globalizeExpress({
  locales:['it', 'de'],
  defaultLocale: 'it',
  cookieName: 'lang',
  messages: __dirname + '/i18n',
  devMode: false
}));

//require('./app/minifier.js');
require('./app/routes.js')(app);

app.use(helmet());

http.createServer(app).listen(3333);

console.log('=====================================');
console.log(' Sever www.spid.gov.it su porta 3333 ');
console.log('=====================================');
