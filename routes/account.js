var express = require('express');
var router = express.Router();
var debug = require('debug')('query');
var AccoutControl = require('../controller/accout.js');

//获取会计列表
router.get('/',function(req,res,next){
	AccoutControl.getList(function(err,result){
		if(err){
			return res.send(err);
		}
		return res.json(result);
	});
	//return res.send('这个是会计列表页面');
})


//获取会计单个列表
router.get('/detail/:id',function(req,res,next){
	var _id = req.params.id;
	return res.send('这个是id为'+_id+'的详细信息');
})

//删除单个会计列表
router.get('/del/:id',function(req,res,next){
	var _id = req.params.id;
	AccoutControl.del(function(err,result){
		if(err){
			return res.send(err);
		}
		return res.send(result);
	})
	//return res.send('这个是要删除id为'+_id+'的api');
})

//添加单个会计
router.get('/add',function(req,res,next){
	AccoutControl.add(function(err,result){
		if(err){
			return res.send(err.message);
		}
		return res.send(result);
	});
});

//更新
router.get('/update',function(req,res,next){
	AccoutControl.update(req.session.user,function(err,result){
		//debug(3);
		if(err){
			return res.send(err.message);
		}
		//debug(result);
		return res.send(result);
	})
})




module.exports = router;
