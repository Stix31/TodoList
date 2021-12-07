const express = require('express')
const app = express()
const port = 3000;

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

app.get('/todoList', (req, res) => {
    let sendData = { value : data.value.map((todo) => {
        return { 
            position: todo.position,
            status: todo.status,
            title: todo.title
        }
    })};
    res.send(sendData);
});


/*
 * Send the list of todo with the todo that has been checked or unchecked.
 * 
 */
app.get('/checkTodoList', (req, res) => {
    const params = req.query
    let todoPosition = params.todoValue;
    let todoToModify = data.value[todoPosition];
    let status = params.checkValue;
    if (status === "true") {
        todoToModify.status = "Closed";
        data.value.splice(todoPosition, 1);
        data.value.push(todoToModify);
    } else {
        let unCheckTodo = data.value[todoPosition];
        unCheckTodo.status = "Open";
        data.value.splice(todoPosition, 1);
        let inserIndex = data.value.findIndex((elem) => elem.status === "Closed");
        data.value.splice(inserIndex, 0, unCheckTodo);
    }
    let pos = 0;
    data.value.forEach((todo) => todo.position = pos++);
    res.send(data);
});

app.get('/getDescription', (req, res) => {
    const params = req.query;
    let selectedTodo = params;
    let sendData = { value: data.value[selectedTodo.todoValue].description};
    console.log(sendData);
    res.send(JSON.stringify(sendData));
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});