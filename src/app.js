'use strict'

const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const db = require('./config/db')
const subscriber = require('./subscriber')

const authRouter = require('./routers/auth')
const userRouter = require('./routers/user')
const verificationRouter = require('./routers/verification')

const errorHandler = require('./middleware/error-handler')
const auth = require('./middleware/auth')
const res = require('express/lib/response')
const req = require('express/lib/request')

db.connect()
const app = express()

subscriber.subscribeEvents()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());


app.use('/', authRouter)

app.use(auth.authHandler)

app.use('/user/verify', verificationRouter)
app.use('/user', userRouter)

app.use(errorHandler)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(err)
  // render the error page
  res.sendStatus(err.status || 500)
})

module.exports = app;
