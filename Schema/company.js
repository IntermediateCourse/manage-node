var mongoose = require('mongoose');
var debug = require('debug')('query');

var companySchema = mongoose.Schema({
	name:String,
	taxId:String,
	address:String,
	poster:{type:mongoose.Schema.ObjectId,ref:'user'},
	accountNum:{type:Number,default:0},
	meta:{
		create_time:{
			type:Date,
			default:new Date
		},
		update_time:{
			type:Date,
			default:new Date
		}
	}
});


mongoose.model('company',companySchema);


module.exports = {
	Company:mongoose.model('company')
}








