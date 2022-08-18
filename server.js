//npm install express mongoose ejs dotenv
//npm install --save-dev nodemon
//"start": nodemone server.js
//declared variables
const express = require("express")
const app = express()
const PORT = 1100
const mongoose = require("mongoose")
const connectDB = require("./config/database")
// const ToDoTask = require("./models/todotask")
const homeRoutes = require('./routes/home')
const editRoutes = require('./routes/edit')
require("dotenv").config({path: './config/.env'})

connectDB()


//set middleware
app.set("view engine", "ejs")
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

//Set Routes
app.use('/', homeRoutes)
app.use('/edit', editRoutes)

app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`))
