const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const express = require('express');
const expressHBS = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const flash = require('connect-flash');
const Handlebars = require('handlebars');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const methodOverRide = require('method-override');
const translate = require('translate');
//const fileUpload = require('express-fileupload'); // I uninstalled this module

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin');
const { extname } = require('path');
const { helpers } = require('handlebars');
require('dotenv').config();
const app = express();

// connected to Data Base
mongoose.connect(process.env.MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('[nodemon] connected to DB...');
  }
});

require('./config/passport');

// view engine setup
app.engine('.hbs', expressHBS({
  defaultLayout: null,
  extname: '.hbs',
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  helpers: {
    checkQty: function (value) {
      if (value <= 1) {
        return true;
      } else {
        return false;
      }
    },
    totalCost: (total) => {
      return total + 20;
    },
    add: (value) => {
      return value + 1
    },
    suffix: (type) => {
      if (type === "Percentage") {
        return "%";
      } else if (type === "Fixed amount") {
        return "EGP";
      }
    },
    jsonStringify: (obj) => {
      return JSON.stringify(obj)
    },
    linkStatus: (status) => {
      if (status === "button") {
        return true;
      } else {
        return false;
      }
    }
  }
}));
//156.208.97.167 IP Address//

//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(fileUpload({
//   useTempFiles: true
// }));
app.use(session({
  secret: 'tarkeba-perfume_?@!',
  saveUninitialized: false,
  resave: true,
  cookie: {
    secure: false,
    maxAge: 60 * 60 * 1000 * 24 * 365,
  }
}));
app.use(flash());
app.use(methodOverRide('_method'));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

// npm install 
// npm install express-validator
// npm install express-handlebars
// npm install handlebars
// npm install @handlebars/allow-prototype-access
// npm install mongoose
// npm install bcrypt
// npm install session
// npm install connect-flash
// npm install passport
// npm install passport-google-oauth2
// npm install node-localstorage
// npm install translate
// npm install dotenv
// npm install cors
// npm install cookie-parser
// npm install jsonwebtoken
// npm install express-fiuoleupload
// npm install googleapis
// npm install node-fetch
// npm install nodemailer
// npm install axios
// npm install react-dom
// npm install react-redux
// npm install react-router-dom
// npm install moment