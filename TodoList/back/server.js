const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const jsonParser = bodyParser.json();

var data = {
    "value": [
        {
            "position": 0,
            "status": "Open",
            "title": "Finnish todo list",
            "description": "I have to finish my TodoList before tuesday"
        }, {
            "position": 1,
            "status": "Open",
            "title": "Get the bred this evening",
            "description": "Get the bred before 8 o'clock"
        }, {
            "position": 2,
            "status": "Closed",
            "title": "Validate the meeting",
            "description": "Validate the meeting with manager"
        },
    ]
}

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/**
 * Return the todo list.
 */
app.get('/todoList', (req, res) => {
    res.send({
        value: data.value.map((todo) => {
            return {
                position: todo.position,
                status: todo.status,
                title: todo.title
            }
        })
    });
});


/*
 * Send the list of todo with the todo that has been checked or unchecked.
 */
app.get('/checkTodoList', (req, res) => {
    const todo = { position: req.query.todoValue, status: req.query.checkValue };
    let todoToModify = data.value[todo.position];
    if (todo.status === "true") {
        todoToModify.status = "Closed";
        data.value.splice(todo.position, 1);
        data.value.push(todoToModify);
    } else {
        todoToModify.status = "Open";
        data.value.splice(todo.position, 1);
        const inserIndex = data.value.findIndex((elem) => elem.status === "Closed");
        data.value.splice(inserIndex, 0, todoToModify);
    }
    let pos = 0;
    data.value.forEach((todo) => todo.position = pos++);
    res.send(data);
});

/**
 * Return the description of Todo.
 */
app.get('/getDescription', (req, res) => {
    res.send({ value: data.value[req.query.todoValue].description });
});

/**
 * Return the list with the added Todo.
 */
app.post('/addTodo', jsonParser, (req, res) => {
    const todo = { title: req.body.title, description: req.body.description };
    data.value.forEach(element => {
        element.position++;
    });
    data.value.unshift({ position: 0, status: "Open", title: todo.title, description: todo.description });
    res.send(JSON.stringify(data));
});

/**
 * Return the list with the deleted Todo.
 */
app.get('/deleteTodo', (req, res) => {
    const position = parseInt(req.query.position);
    data.value.splice(position, 1);
    data.value.forEach((element, index) => element.position = index);
    res.send(JSON.stringify(data));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});