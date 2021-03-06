require("reflect-metadata")
var cors = require("cors")
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var orderRouter = require('./routes/orderRouter');
var authorizationRouter = require('./routes/authorizationRouter');
var restaurantRouter = require('./routes/restaurantRouter')
var menuRouter = require('./routes/menuRouter');
var categoryRouter = require('./routes/categoryRouter')


var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use("/authorization", authorizationRouter )
app.use("/restaurants", restaurantRouter)
app.use("/categories", categoryRouter )
app.use("/menus", menuRouter)
app.use("/orders", orderRouter)

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
