var express = require('express');
var router = express.Router();
var mySQLDB = require('./../Models/my-sql-db');
<!-- connect database and select query-->
router.get('/', function (req, res) {
    mySQLDB.connection.query('SELECT * FROM Events', (err, rows) => {
        if (err) {
            console.log(err);
            res.render('error', { error : err } );
        }
        else {
            res.render('template', { title: 'WebApp', page_name  : 'events.ejs' , data: rows});
        }

    });
});
<!-- routing for each corresponding page-->
router.get('/romantic', function(req, res, next) {
    res.render('template',  { title: 'WebApp', page_name  : 'events/romantic.ejs' });
});

router.get('/centeral', function(req, res, next) {
    res.render('template',  { title: 'WebApp', page_name  : 'events/centeral.ejs' });
});

router.get('/charm', function(req, res, next) {
    res.render('template',  { title: 'WebApp', page_name  : 'events/charm.ejs' });
});

router.get('/photocampaign', function(req, res, next) {
    res.render('template',  { title: 'WebApp', page_name  : 'events/photocampaign.ejs' });
});

router.get('/wealth', function(req, res, next) {
    res.render('template',  { title: 'WebApp', page_name  : 'events/wealth.ejs' });
});

module.exports = router;