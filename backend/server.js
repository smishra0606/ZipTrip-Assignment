const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(express.json());

const DATA_FILE = './todos.json';

// Read data
const readData = () => JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
// Write data
const writeData = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

// 1. Get all Todos
app.get('/api/todos', (req, res) => {
    res.json(readData());
});

// 2. Get single Todo by ID
app.get('/api/todos/:id', (req, res) => {
    const todos = readData();
    const todo = todos.find(t => t.id === req.params.id);
    todo ? res.json(todo) : res.status(404).json({ error: "Not found" });
});

// 3. Create Todo
app.post('/api/todos', (req, res) => {
    const todos = readData();
    const newTodo = { id: Date.now().toString(), title: req.body.title, completed: false, description: "Added from UI" };
    todos.push(newTodo);
    writeData(todos);
    res.status(201).json(newTodo);
});

// 4. Update Todo
app.put('/api/todos/:id', (req, res) => {
    let todos = readData();
    todos = todos.map(t => t.id === req.params.id ? { ...t, ...req.body } : t);
    writeData(todos);
    res.json({ success: true });
});

// 5. Delete Todo
app.delete('/api/todos/:id', (req, res) => {
    let todos = readData();
    todos = todos.filter(t => t.id !== req.params.id);
    writeData(todos);
    res.json({ success: true });
});

app.listen(5000, () => console.log('Backend running on http://localhost:5000'));