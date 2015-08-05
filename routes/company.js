var companyControl = require('../controller/company.js');
var express = require('express');
var router = express.Router();

var isLogin = function(req,res,next){
  if(!req.session.isLogin){
    return res.send('Not login');
  } 
  next();
}



//获取公司列表
router.get('/',function(req,res,next){
	companyControl.getList(function(err,result){
		if(err){
			return res.error(err);
		}
		return res.success(result);
	})
});

//添加公司
router.get('/add',isLogin,function(req,res,next){
	var session = req.session.user;
	companyControl.add(session,function(err,result){
		if(err){
			return res.send(err.message);
		}
		return res.send(result);
	})
})







module.exports = router;