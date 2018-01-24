var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var users = require('./routes/users');
var hotel= require('./routes/hotel');
const url = require('url');
const querystring = require('querystring');
var session = require('express-session');
var home = require('./routes/home');
var events = require('./routes/events');
var places = require('./routes/places');
var contactus= require('./routes/contactus');
var app = express();
var mySQLDB = require('./Models/my-sql-db');
var connectivity = require('connectivity');

mySQLDB.openDB();


/*
 * Session duration
 */
app.use(session({secret: 'ssshhhhh',
    duration: 30 * 60 * 1000,
    resave: true,
    activeDuration: 5 * 60 * 1000,
    saveUninitialized: true

}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// date picker
// const picker = datepicker('.picker-date');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('trust proxy', 1)
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
app.use(function (req, res, next) {

    res.locals.session = req.session;
    next();

    connectivity(function (online) {
        if (online) {
            mySQLDB.openDB();
            console.log('Internet!');
        } else {
            mySQLDB.openDB();
            console.error('No internet connection!');
            res.render('error', { message : 'No internet connection.' } );
        }
    });
});

app.use('/', home);
app.use('/home', home);
app.use('/users', users);
app.use('/hotel', hotel);
app.use('/events', events);
app.use('/places', places);
app.use('/contactus', contactus);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
