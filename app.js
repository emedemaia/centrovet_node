var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();
var session = require('express-session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var quienessomosRouter = require('./routes/quienessomos');
var novedadesRouter = require('./routes/novedades');
var galeriaRouter = require('./routes/galeria');
var loginRouter = require('./routes/admin/login');
var adminRouter = require('./routes/admin/novedades');
var imagenesuploadsRoutes = require('./routes/admin/novedades');
var contactosRouter = require('./routes/admin/contactos')

var app = express();


// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'galactoMANANOS97531',
  cookie: { maxAge: null },
  resave: false,
  saveUninitialized: true
}));

secured = async(req,res,next) =>{
  try{
    console.log(req.session.id_usuario); 
    if(req.session.id_usuario){
      next();
    }else{
      res.redirect('/admin/login')
    }//cierro else
  }catch(error){
    console.log(error)
  }//cierro catch error
}//cierro secured


app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/quienessomos', quienessomosRouter);
app.use('/novedades', novedadesRouter);
app.use('/galeria', galeriaRouter);
app.use('/admin/login', loginRouter);
app.use('/admin/novedades', secured, adminRouter);
app.use('/admin/imagenesuploads', secured, imagenesuploadsRoutes);
app.use('/admin/contactos', secured, contactosRouter);


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




app.listen(3000, () => console.log('Server running on port 3000!'))

module.exports = app;
