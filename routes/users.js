var express = require('express');
var router = express.Router();
var debug = require('debug')('query');

var userController = require('../controller/user.js')

var isLogin = function(req,res,next){
  if(!req.session.isLogin){
    return res.send('Not login');
  } 
  next();
}


/* GET users listing. */
router.get('/',isLogin,function(req,res){
  res.send('this is the user index');
})


router.post('/login', function(req, res, next) {
  var userName = req.body.name;
  var password = req.body.password;
  if(userName&&password){
  	 userController.login(userName,password,function(err,result){
  	 	if(err){
        return res.error(err.message);
  	 	}
      req.session.isLogin = true;
      req.session.user = result;
      return res.success();
  	 });
  }else{
  	return res.error('用户名和密码不足');
  }
});

router.post('/register',function(req,res){
  var userName = req.query.name;
  var password = req.query.password;
  if(userName&&password){
    userController.register(userName,password,function(err,result){
      if(err){
        return res.send(err.message);
      }
      return res.json(result)
    })
  }else{
    return res.send('用户名和密码不足');
  }
})

router.get('/modify',isLogin,function(req,res){
  var userName = req.query.name;
  var password = req.query.password;
  if(userName&&password){
    userController.modify(userName,password,function(err,result){
      if(err){
        return res.json(err.message);
      }
      return res.json(result);
    })
  }else{
    return res.json({success:false,msg:'用户名和密码不足'});
  }
})

router.get('/logout',function(req,res,next){
  req.session.destroy(function(err){
    if(err){
      return res.send(err);
    }
    //delete app.locals.user
    return res.redirect('/');
  });
})


module.exports = router;
