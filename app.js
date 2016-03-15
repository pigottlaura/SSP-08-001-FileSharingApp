var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var multer = require('multer');
var fs = require('fs');
var session = require('express-session');

var directoryPath = require("./additional/directory-path");

var storage = multer.diskStorage({
    destination: directoryPath,
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    }
});

var routes = require('./routes/index');
var files = require('./routes/files');

var app = express();

var upload = multer({
    storage: storage
});
app.use("/", upload.any());

app.use("/", session({
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: false
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/files', function(req, res, next){
   if(req.session.username != null){
       console.log("User is already logged in");
       next();
   } else {
       console.log("This user is not logged in yet");
       res.redirect("/");
   }
});

console.log("about to enter file route");
app.use('/files', files);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
