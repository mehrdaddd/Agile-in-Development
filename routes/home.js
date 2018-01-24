var express = require('express');
var router = express.Router();
const mysql = require('mysql');
var mySQLDB = require('./../Models/my-sql-db');
mySQLDB.openDB();

/* GET home page. */
router.get('/', function(req, res, next) {

    mySQLDB.connection.query('SELECT AVG(Stars) AS averageRating FROM reviwes', (err, rows) => {
        if (err) {
            console.log(err);
            res.render('error', { error : err } );
        }else {
            res.render('template', { title: 'WebApp', page_name  : 'home.ejs', averageRating : rows[0]['averageRating']});
        }
    });
});

router.get('/about', function(req, res, next) {
    res.render('template', { title: 'About Us', page_name  : 'about.ejs' });
});
router.post('/Subscribe', function(req, res, next) {
    mySQLDB.connection.query('SELECT * FROM subscription WHERE Email=' + mysql.escape(req.body.Email), (err, rows) => {
        if (err) {
            console.log(err);
            res.render('error', { error : err } );
        }
        else {
            if (rows.length > 0) {
                console.log('This email already registered');
                res.send({result: false, message: "This email already registered"});
            }
            else {
                var sql = "INSERT INTO subscription (Email) VALUES (" + mysql.escape(req.body.Email) + ")";
                mySQLDB.connection.query(sql, function (err, result) {
                    if (err) {
                        console.log(err);
                        res.render('error', { error : err } );
                    }
                    else {
                        res.send({result: true, message: "Thanks for subscription"});
                    }
                });

            }
        }

    });

});

router.post('/saveRating', function(req, res, next) {
    mySQLDB.connection.query("INSERT INTO reviwes SET ? ", req.body, function (err, result) {
        if (err) {
            console.log(err);
            res.send( {rated : false, error : err} );
        }
        else {
            mySQLDB.connection.query('SELECT AVG(Stars) AS averageRating FROM reviwes', (err, rows) => {
                if (err) {
                    console.log(err);
                    res.render('error', { rated : false, error : err } );
                }else {
                    res.send( {rated : true, averageRating : rows[0]['averageRating'], message : "Thank you for rating our site."} );
                }
            });
        }
    });
});

module.exports = router;
