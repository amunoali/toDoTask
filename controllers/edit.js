const toDoTask = require('../models/todotask')

module.exports ={
    getEdit: (req, res) =>{
        const id = req.params.id
        toDoTask.find({}, (err, task) =>{
            res.render('edit.ejs', { toDoTask: task, idTask: id})
        })
    },
    deleteTask : (req, res) => {
        const id = req.params.id;
        toDoTask.findByIdAndRemove(id, err => {
            if (err) return res.send(500, err);
            res.redirect("/");
        });
    },
    updateTask : (req, res) => {
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
    }

}