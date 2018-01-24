var express = require('express');
const mysql = require('mysql');
var router = express.Router();
var mySQLDB = require('./../Models/my-sql-db');
var session = require('express-session')
mySQLDB.openDB();


/* GET users listing. */
router.post('/signup', function(req, res, next) {
  console.log('signup route');
    var Email = req.body.Email;
    var Password = req.body.Password;
    var PasswordConfirm = req.body.PasswordConfirm;
    var F_Name = req.body.F_Name;
    var L_Name = req.body.L_Name;


    console.log(Email, Password, PasswordConfirm);

    mySQLDB.connection.query('SELECT * FROM User WHERE Email='+mysql.escape(Email), (err, rows) => {
        if (err)
        {
            console.log(err);
            res.render('error', { error : err } );
        }
        else {
          if(rows.length>0){
              res.render('error',{message: 'This email already registered', error:{status: "", stack: err}});
          }
          else
          {
              var sql = "INSERT INTO User (Email, Password,F_Name,L_Name) VALUES ("+ mysql.escape(Email) +","+ mysql.escape(Password)+","+mysql.escape(F_Name)+","+mysql.escape(L_Name) +")";
              console.log('SQL Statement: '+ sql);
              mySQLDB.connection.query(sql, function (err, result) {
                  if (err) {
                      console.log(err);
                      res.render('error', { error : err } );
                  }
                  else {
                      res.redirect('/');
                  }
              });
          }

        }

    });
});

router.get('/signin', function(req, res, next){
    res.redirect('/');
});

router.post('/signin', function(req, res, next){

    mySQLDB.connection.query('SELECT * FROM User WHERE Email=' + mysql.escape(req.body.email) + " AND Password=" + mysql.escape(req.body.password), (err, rows) => {
        if (err) {
            console.log(err);
            res.render('error', { error : err } );
        }
        else {
            if (rows.length > 0) {
                req.session.authenticated = true;
                req.session.F_Name = rows[0].F_Name;
                req.session.userid = rows[0].id;
                res.locals.session = req.session;
                res.redirect('/');
            }else{
                res.render('error', { message: "No user registered with these credentials."});
            }
        }
    });

});
router.get('/signout', function(req, res, next){
    req.session.authenticated = false;
    req.session.F_Name = null;
    req.session.userid = null;
    res.locals.session = req.session;
    res.redirect('/');
});

module.exports = router;
