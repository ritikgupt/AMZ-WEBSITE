var compression = require('compression');
var createError = require('http-errors');
var a = require('express');
var morgan = require('morgan');
var port = process.env.PORT || 5000;
var app = a();
app.use(a.urlencoded({extended: true}));
app.use(a.json());
app.set('view engine', 'ejs');
app.use(a.static('public'));
app.use('/uploads', a.static('uploads'));
app.use(compression());
var winston = require('./config/winston');
app.use(morgan('combined', { stream: winston.stream }));
var g = require('express-sanitizer');
var cors = require('cors');
app.use(a.static('uploads'));
app.use(g());
app.use(cors({
  credentials: true,
}));
var HomeRoutes=require('./routes/home')
app.use(HomeRoutes)
var SliderRoutes=require('./routes/slider')
app.use(SliderRoutes)

app.use(function(req, res, next) {
  next(createError(404));
});
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // add this line to include winston logging
  winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  // render the error page
  res.status(err.status || 500);
  res.render('error', {err: err});
});



app.listen(port, () => {
  console.log('Server has started.');
});
