if (process.env.NODE_ENV !== 'production') {
require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
//import routes
const indexRouter = require('./routes/index')
//folders
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', error => console.error(error))//print error 
db.once('open', () => console.log('Connected to Mongoose'))//print first status 
//indexRouter handels '/'-route
app.use('/', indexRouter)
//listen
app.listen(process.env.PORT || 3000)