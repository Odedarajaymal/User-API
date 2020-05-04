const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const mongoose = require('mongoose')

const app = express()
const routes = require('./routes/router')

const port = process.env.PORT

app.use(express.static(path.join(__dirname,'public')))

app.use(express.json())

mongoose.connect('mongodb+srv://app:jkodedara@cluster0-utdze.mongodb.net/app?retryWrites=true&w=majority', { useNewUrlParser: true } ,(e)=>{
    if(!e){
        console.log('connection success')
    } else{
        console.log('error',e)
    }
})

app.engine('.hbs', exphbs({defaultLayout:'layout', extname:'.hbs'}))
app.set('view engine', '.hbs')


app.use(routes)
app.listen(port,()=>{
    console.log('port listen 5050')
})