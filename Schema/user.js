var mongoose = require('mongoose');
var debug = require('debug')('query');
var User = mongoose.Schema({
	name:String,
	password:String,
	meta:{
		update_time:{
			type:Date,
			default:new Date()
		},
		create_time:{
			type:Date,
			default:new Date()
		}
	}
});

User.pre('save',function(next){
	if(this.isNew){
		//保存
		this.meta.update_time = this.meta.create_time = new Date();
	}else{
		//更新
		this.meta.update_time = new Date();
	}
	next();
});


mongoose.model('user',User);


module.exports = {
	User:mongoose.model('user')
}