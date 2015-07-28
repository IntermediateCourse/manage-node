/**
 * @author 韩国梁
 * @describ 这个是实现用户注册和登录的controller
 *          在这里做用户登录的session持久化工作
 */
var mongoose = require('mongoose');

var User = require('../Schema/user.js').User;// mongoose.model('User',UserSchema);
var debug = require('debug')('query');


var userController = {
	//用户登陆
	login:function(userName,password,cb){
		User.findOne({name:userName},function(err,result){
			if(err){
				return cb(err)
			}
			if(!result){
				return cb(new Error('用户未注册'));
			}
			if(password == '123456'){
				return cb(null,result);
			}
			
			return cb(new Error('密码错误，请重新输入'));
		})
	},
	//用户注册
	register:function(userName,password,cb){
		User.findOne({name:userName},function(err,user){
			if(err){
				return cb(err);
			}
			if(user){
				return cb(new Error('用户名已存在'));
			}
			User.create({name:userName,password:password},function(err,result){
				if(err){
					return cb(err);
				}
				return cb(null,result);
			})
		})
	},
	//修改密码
	modify:function(userName,password,cb){
		User.findOne({name:userName},function(err,user){
			if(err){
				return cb(err)
			}	
			if(!user){
				return cb(new Error('该用户未注册'));
			}
			user.save(function(err,result){
				if(err){
					return cb(err);
				}
				return cb(null,result);
			})
		})
	}
}

module.exports = userController;