

const express= require('express')
const mongoose = require('mongoose')
const route= require('./route/route')

const app=express()

app.use(express.json())


mongoose.connect('mongodb+srv://Lucifer:lucifer123@blogging.swrk52y.mongodb.net/test', {useNewUrlParser: true})
.then(()=> console.log("MongoDB connected"))
.catch((error)=> console.log(error))

app.listen(process.env.PORT || 3000,function (){
   console.log("Port connected to 3000")
})  

app.use('/',route)

