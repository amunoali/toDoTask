//npm install express mongoose ejs dotenv
//npm install --save-dev nodemon
//"start": nodemone server.js
//declared variables
const express = require("express")
const req = require("express/lib/request")
const res = require("express/lib/response")
const app = express()
const PORT = 8500
const mongoose = require("mongoose")
const toDoTask = require("./models/toDoTask")
require("dotenv").config()


//set middleware
app.set("view engine", "ejs")
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

mongoose.connect(process.env.DB_CONNECTION,
    {useNewUrlParser: true},
    () => {console.log('Connected to Db@')})


app.get('/', async (req,res) => {
    try{
        toDoTask.find({}, (err, task) =>{
            res.render('index.ejs', {todoTask:task})
        })
    }catch(err){
        if(err) return res.status(500).send(err)
    }

})

app.post('/', async (req, res) =>{
    const todoTask = new toDoTask(
        {
        title: req.body.title,
        content: req.body.content
    }
    )
    try{
        await todoTask.save()
            console.log(todoTask)
            res.redirect('/')
    } catch(err) {
        if (err) return res.status(500).send(err)
        res.redirect('/')
    }
})

//EDIT OR UPDATE Method
app
    .route("/edit/:id")
    .get((req, res) =>{
        const id = req.params.id
        toDoTask.find({}, (err, task) =>{
            res.render('edit.ejs', { toDoTask: task, idTask: id})
        })
    })
    .post((req, res) => {
        const id = req.params.id;
        toDoTask.findByIdAndUpdate(
            id,
            {
                title: req.body.title,
                content: req.body.content
            },

            err => {
                if (err) return res.status(500).send(err);
                res.redirect("/");
            });
    });

//DELETE
app
    .route("/remove/:id")
    .get((req, res) => {
        const id = req.params.id;
        toDoTask.findByIdAndRemove(id, err => {
            if (err) return res.send(500, err);
            res.redirect("/");
        });
    });

app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`))
