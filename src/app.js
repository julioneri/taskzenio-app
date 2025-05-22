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


// Criar nova tarefa
app.post('/tasks', (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Título da tarefa é obrigatório' });
  }

  const newTask = {
    id: tasks.length + 1,
    title,
    done: false,
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});


// Atualizar status da tarefa (ex: marcar como concluída)
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const updatedTask = req.body;

  const index = tasks.findIndex(t => t.id === parseInt(id));
  if (index === -1) return res.status(404).json({ error: 'Tarefa não encontrada' });

  // sobrescreve completamente a tarefa
  tasks[index] = { id: parseInt(id), ...updatedTask };

  res.json(tasks[index]);
});


// Atualizar parcialmente a tarefa
app.patch('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const task = tasks.find(t => t.id === parseInt(id));
  if (!task) {
    return res.status(404).json({ error: 'Tarefa não encontrada' });
  }

  Object.assign(task, updates); // Atualiza só os campos enviados
  res.json(task);
});


// Deletar uma tarefa pelo id
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(t => t.id === parseInt(id));

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Tarefa não encontrada' });
  }

  tasks.splice(taskIndex, 1); // Remove do array

  res.status(204).send(); // 204 No Content: sucesso, sem corpo na resposta
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
