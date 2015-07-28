var mongoose = require('mongoose');

var Accout = require('../Schema/accout.js').Accout;

var User = require('../Schema/user.js').User;

var debug = require('debug')('query');


module.exports = {

	getList:function(cb){
		Accout.find().exec(cb);
	},
	add:function(cb){
		var _a = {name:'A',tel:'1234',}
		Accout.findOne({name:_a.name},function(err,result){
			if(err){
				return cb(err);
			}
			if(result){
				return cb(new Error('该会计已存在'));
			}

			Accout.create(_a,cb);
		})
	},
	update:function(user,cb){
		var _a = {name:'A',poster:user};
		Accout.findOne({name:_a.name},function(err,result){
			//debug(1);
			if(err){
				return cb(err);
			}
			if(!result){
				return cb(new Error('该会计不存在'));
			}
			result.poster = _a.poster;
			//debug(2);
			return result.save(cb);
		})
	},
	del:function(cb){
		Accout.remove({name:'A'},cb);
	}
}