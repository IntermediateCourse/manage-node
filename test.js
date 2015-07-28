var mongoose = require('mongoose'),
	db = mongoose.connection,
	//User = require('./Schema/user.js').User,
	userSchema = require('./Schema/user.js').userSchema;

/*db.once('open',function(err){
	if(err){
		console.log(err);
	}
	console.log('connect success');
	var user = mongoose.model('user',User);
	var a = user.findOne({name:'A'},function(err,result){
		if(err){
			console.log(err);
		}
		console.log('a:\n',result);
	});
	//console.log(a.get('name'));
	var _a = new user({name:'test',password:'12345'});
	//console.log(_a);
	_a.save(function(err,result){
		if(err){
			console.log(err);
		}
		console.log('result:\n');
		console.log(result);
	});
});


mongoose.connect('mongodb://localhost/accountingMange');

module.exports = db;*/
var mongooseDB = 'mongodb://localhost/accountingMange';
function connection(){
  var config = {server:{socketOptions:{keepAlive:1}}}
  mongoose.connect(mongooseDB,config);
}
connection();
mongoose.connection.on('error',function(er){console.log(err)});
mongoose.connection.on('disconnection',connection);
mongoose.model('user',userSchema);

mongoose.connection.once('open',function(){
	console.log('connection');
})

var User = mongoose.model('user')

//console.log(User.findOne.toString());

User.
	findOne({name:'A'}).
	exec(function(er,result){
		console.log(1);
	});