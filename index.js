const express = require('express');
const cors = require('cors');
const pool = require('./db');
const uuidV4 = require('uuid').v4;

const app = express();
const PORT =  process.env.PORT || 3003;

// middleware for connect 
app.use(cors());
// middlewares for parsing json
app.use(express.json()); // access req.body
// app.use(express.urlencoded({extended: false}));

// ROUTES

// create a todo
app.post('/todos', async(req, res) => {
    try {
        const {description} = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES ($1) RETURNING *", 
            [description]
        );

        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

// get all todos

app.get('/todos', async(req,res) => {
    try {
        const allTodos = await pool.query(
            "SELECT * FROM todo"
        );
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
})

// get a todo

app.get('/todos/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const todo = await pool.query(
            "SELECT * FROM todo WHERE todo_uid = ($1)",
            [id]
        );

        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

// update a todo

app.put('/todos/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query(
            'UPDATE todo SET description = ($1) WHERE todo_uid = ($2) RETURNING *',
            [description, id]
        );

        res.json("Todo was updated");
    } catch (err) {
        console.error(err.message);
    }
})

// delete a todo

app.delete('/todos/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const deletedTodo = await pool.query(
            'DELETE FROM todo WHERE todo_uid = ($1) RETURNING *',
            [id]
        );

        res.json("Todo was deleted");
    } catch (err) {
        console.error(err.message);
    }
})

app.get('/', (req, res) => {
    res.send('Hi, this is todo app built with PERN stack!');
});

app.listen(PORT, console.log(`Server running on port ${PORT}`));