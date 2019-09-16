var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var expressValidator = require('express-validator');
var logger = require('morgan');

var indexRouter = require('./routes/index');
// Connect to database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kupci',
    { useNewUrlParser: true , useCreateIndex: true })
    .then(()=> { console.log("Connected to database!"); }) //notify if success
    .catch(err => {
      console.log(`Unable to connect to MongoDB!\nError: ${err}`); //notify of error that occurs
      process.exit(1); //terminate program
    });
mongoose.Promise = global.Promise; //config mongoose promise to use global promise
// Instantiate express
var app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    let namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root;
    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
