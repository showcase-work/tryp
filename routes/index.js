var express = require('express');
var router = express.Router();

var json = require('../assets/languages/espaniol.json');
var selected = "ES";
/* GET home page. */

router.get('/', function(req, res, next) {
    if(req.query.language == "en"){
        json = require('../assets/languages/english.json');
        selected="EN"
    }
    else
    {
        json = require('../assets/languages/espaniol.json');
        selected = "ES";
    }
  res.render('index', { language: json, selected: selected});
});

module.exports = router;
