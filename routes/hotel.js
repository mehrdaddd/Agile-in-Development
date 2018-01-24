var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('template', { title: 'WebApp', page_name  : 'hotel.ejs' });
});

module.exports = router;

