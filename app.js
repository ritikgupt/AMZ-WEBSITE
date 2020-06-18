const compression = require('compression');
const createError = require('http-errors');
const a = require('express');
const morgan = require('morgan');
const port = process.env.PORT || 5000;
const app = a();
app.use(a.urlencoded({extended: true}));
app.use(a.json());
app.set('view engine', 'ejs');
app.use(a.static('public'));
app.use('/uploads', a.static('uploads'));
app.use(compression());
const winston = require('./config/winston');
app.use(morgan('combined', { stream: winston.stream }));
const g = require('express-sanitizer');
const cors = require('cors');
app.use(a.static('uploads'));
app.use(g());
app.use(cors({
  credentials: true,
}));
const HomeRoutes=require('./routes/home')
app.use(HomeRoutes)
const SliderRoutes=require('./routes/slider')
app.use(SliderRoutes)
const AuthenticationRoutes=require('./routes/authentication')
app.use(AuthenticationRoutes)
const NewsRoutes=require('./routes/news')
app.use(NewsRoutes)
const PartnerRoutes=require('./routes/partner')
app.use(PartnerRoutes)
const TrustedRoutes=require('./routes/trusted');
app.use(TrustedRoutes)
const AdvisoryRoutes=require('./routes/advisory')
app.use(AdvisoryRoutes)
const VideoRoutes=require('./routes/video')
app.use(VideoRoutes)
const ForgotRoutes=require('./routes/forgot-password')
app.use(ForgotRoutes)
app.use(function(req, res, next) {
  next(createError(404));
})

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
