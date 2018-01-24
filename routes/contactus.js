var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
<!-- setup the smtp and email credentials-->
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'haseeb.iqbal29@gmail.com', // generated ethereal user
        pass: 'asdF123/'  // generated ethereal password
    }
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.locals.session = req.session;
    res.render('template', { title: 'WebApp', page_name  : 'contactus.ejs'});
});

router.get('/contact', function(req, res, next) {

    res.render('template', { title: 'WebApp', page_name  : 'contactus.ejs' });
});
<!-- admin email setup-->
router.post('/contact', function(req, res, next) {

    // ------------- Send Contact Us Data to Admin STARTs -------------- //
    let mailOptions = {
        from: '"Kiel Explorer " <admin@kielexplorer.com>', // sender address
        to: 'me@haseebiqbal.com', // list of receivers
        subject: 'Kiel Explorer | Contact Us | ' + req.body.textsurname, // Subject line
        text: null, // plain text body
        html: JSON.stringify(req.body) // html body
    };
    <!-- user email setup-->
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error while sending Email to Admin.', error);
            res.render('template', { title: 'WebApp', page_name  : 'contactus.ejs', message : 'email_not_sent' });
        }else {

            // ------------- Send Confirmation Email to User STARTs -------------- //
            mailOptions = {
                from: '"Kiel Explorer " <foo@blurdybloop.com>', // sender address
                to: req.body.textemail, // list of receivers
                subject: 'Kiel Explorer | Welcome To Kiel', // Subject line
                text: req.body.textmessage, // plain text body
                html: '<h1>Kiel Explorer</h1><p>Thank you very much for contacting us, We will contact you as soon as possible.</p>' // html body
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Error while sending Email to User.', error);
                    res.render('template', { title: 'WebApp', page_name  : 'contactus.ejs', message : 'email_not_sent' });
                }else {
                    res.render('template', { title: 'WebApp', page_name  : 'contactus.ejs', message : 'email_sent' });
                }
            });
            // ------------- Send Confirmation Email to User STARTs -------------- //

        }
    });
    // ------------- Send Contact Us Data to Admin ENDs -------------- //
});


module.exports = router;


