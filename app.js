var config = require("./config");

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var session = require("express-session");
var express = require("express");

// import project initial apis
var api_v1 = require('./routes/api/v1');

// import test apis
var api_test = require('./routes/api/test');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// cors policy adaption
app.use(cors({
    // allow cors session
    origin: "http://127.0.0.1:444",
    credentials: true,
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// session config
app.use(session({
    name: "name",
    secret: config.secret,
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: config.max_age,
        secure: false
    }
}))

app.use(express.static(path.join(__dirname, 'public')));

// project initial apis
app.use("/api/v1", api_v1);

// test apis
app.use("/api/test", api_test);

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
