const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Importa as rotas de tarefas
const tasksRouter = require('./routes/tasks');

// Rota raiz (pode ficar aqui mesmo)
app.get('/', (req, res) => {
  res.send('Olá, Taskzenio está rodando!');
});

// Usa as rotas /tasks
app.use('/tasks', tasksRouter);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
