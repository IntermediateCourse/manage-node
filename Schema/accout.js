var mongoose = require('mongoose');
var debug = require('debug')('query');
var accoutSchema = new mongoose.Schema({
	name:String,
	tel:String,
	company:[],
	poster:{type:mongoose.Schema.ObjectId,ref:'user'},
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

mongoose.model('accout',accoutSchema);


module.exports = {
	AccoutSchema:accoutSchema,
	Accout:mongoose.model('accout')
}

