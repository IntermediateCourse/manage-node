var express = require('express');
var router = express.Router();
var debug = require('debug')('query');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.isLogin){
  	res.render('index', { title: 'Express'});
  }else{
  	res.render('login',{layout:false});
  }
});

module.exports = router;
