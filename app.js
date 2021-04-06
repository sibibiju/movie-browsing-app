const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const passport = require('passport');

const app = express();
const indexRouter = require('./routes/index');
const githubAuth = require('./services/githubStrategy');

app.use(helmet({
    "contentSecurityPolicy": false
}));
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//morgan used for logging HTTP requests & errors
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-session')({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    let message = (req.app.get('env') === 'development') && err.message ? err.message : "something went wrong";
    res.status(500).json({ error: true, message: message })
});

module.exports = app;