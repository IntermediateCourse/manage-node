var express = require('express');
var session = require('express-session');
//var mongoStore = require('connect-mongostore')(session);
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var mongooseDB = 'mongodb://localhost/accountingMange';

var routes = require('./routes/index');
var users = require('./routes/users');
var accout = require('./routes/account.js');
var company = require('./routes/company.js');

var app = express();

function connection(){
  var config = {server:{socketOptions:{keepAlive:1}}}
  mongoose.connect(mongooseDB,config);
}
connection();
mongoose.connection.on('error',function(er){console.log(err)});
mongoose.connection.on('disconnection',connection);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(session({
  secret:'hello world',
  resave:false,
  saveUninitialized:true
  /*store:new mongoStore({
    url:mongooseDB,
    collections:'sessions'
  })*/
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
  res.success = function(data){
    res.status(200).json({success:true,data:data});
  };
  res.error = function(msg) {
    res.status(200).json({success:false,msg:msg});
  }
  next();
})

app.use(function(req,res,next){
  if(req.session.user){
    app.locals.user = req.session.user;
  }else{
    delete app.locals.user
  }
  next();
})


app.use('/', routes);
app.use('/users', users);
app.use('/accout',accout);
app.use('/company',company);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


//检查是否登录了


mongoose.set('debug',true);



module.exports = app;