const toDoTask = require('../models/todotask')

module.exports = {
    getIndex : async (req, res) => {
        try {
            const tasks = await
            toDoTask.find()
            res.render("index.ejs", { todoTasks: tasks });
        } catch (err) {
            if (err) return res.status(500).send(err);
        }
    },
    createTask: async (req, res) => {
        const todoTask = new toDoTask(
            {
                title: req.body.title,
                content: req.body.content
            });
        try {
            await todoTask.save();
            console.log(todoTask)
            res.redirect("/");
        } catch (err) {
            if (err) return res.status(500).send(err);
            res.redirect("/");
        }
    }
}