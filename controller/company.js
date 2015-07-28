var Company = require('../Schema/company.js').Company;

var debug = require('debug')('query');

module.exports = {
	getList:function(cb){
		Company.find().populate('poster').exec(cb);//.
	},
	add:function(session,cb){
		var _company = {name:'测试',taxId:'XW124555',address:'北京市'};
		debug(Company);
		Company.findOne({name:_company.name},function(err,result){
			if(err){
				return cb(err);
			}
			if(result){
				return cb(new Error('该公司已经存在'));
			}
			_company.poster = session.id;
			var _a = new Company(_company);
			_a.save(function(err,result){
				return cb(err,result);
			})
		})
	}
}



