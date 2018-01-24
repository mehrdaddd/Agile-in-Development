var express = require('express');
var router = express.Router();
const mysql = require('mysql');
var mySQLDB = require('./../Models/my-sql-db');
<!-- mysql database connection and retrieve the query to retrieve data from the famous places tabel-->
router.get('/', function(req, res, next) {

    mySQLDB.connection.query('SELECT * FROM FamousPlaces', (err, rows) => {
        if (err) {
            console.log(err);
            res.render('error', { error : err } );
        }
        else {
            res.render('template', { title: 'WebApp', page_name  : 'famousplaces.ejs' , data: rows});
        }

    });

});
<!-- routing for each corresponding page-->
router.get('/canal', function(req, res, next) {
    res.render('template',  { title: 'WebApp', page_name  : 'places/canal.ejs' });
});

router.get('/memorial', function(req, res, next) {
    res.render('template',  { title: 'WebApp', page_name  : 'places/memorial.ejs' });
});

router.get('/submarine', function(req, res, next) {
    res.render('template',  { title: 'WebApp', page_name  : 'places/submarine.ejs' });
});

router.get('/museum', function(req, res, next) {
    res.render('template',  { title: 'WebApp', page_name  : 'places/museum.ejs' });
});

router.get('/tannenberg', function(req, res, next) {
    res.render('template',  { title: 'WebApp', page_name  : 'places/tannenberg.ejs' });
});

module.exports = router;