console.log('🟢 Servidor iniciou com a versão correta do app.js');

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let tasks = []; // Array que armazena tarefas na memória
console.log('Array tasks inicial:', tasks);


// Rota inicial
app.get('/', (req, res) => {
  res.send('Olá, Taskzenio está rodando!');
});


// Listar todas as tarefas
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
