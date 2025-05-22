const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const dbPath = path.join(__dirname, '..', 'db.json'); // caminho relativo para o arquivo

let tasks = [];

// Função para carregar as tarefas do arquivo
function loadTasks() {
  try {
    const data = fs.readFileSync(dbPath, 'utf-8');
    tasks = JSON.parse(data);
  } catch (error) {
    tasks = [];
  }
}

// Função para salvar as tarefas no arquivo
function saveTasks() {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(tasks, null, 2));
  } catch (error) {
    console.error('Erro ao salvar tarefas:', error);
  }
}

// Carregar tarefas uma vez quando o arquivo for carregado
loadTasks();

// Função para validar os dados
function validateTaskData(data, isPartial = false) {
    const errors = [];
  
    // Validar title
    if (!isPartial || (isPartial && data.title !== undefined)) {
      if (typeof data.title !== 'string' || data.title.trim() === '') {
        errors.push('Título da tarefa é obrigatório e deve ser uma string não vazia.');
      }
    }
  
    // Validar done
    if (!isPartial || (isPartial && data.done !== undefined)) {
      if (typeof data.done !== 'boolean') {
        errors.push('Done deve ser um valor booleano.');
      }
    }
  
    return errors;
}
  

// Rotas de tarefas:


// Listar todas as tarefas
router.get('/', (req, res) => {
  res.json(tasks);
});


// Criar nova tarefa
router.post('/', (req, res) => {
    const { title, done = false } = req.body;
  
    const errors = validateTaskData({ title, done }, false);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
  
    const maxId = tasks.reduce((max, task) => Math.max(max, task.id), 0);
    const newTask = {
      id: maxId + 1,
      title: title.trim(),
      done,
    };
  
    tasks.push(newTask);
    saveTasks();
  
    res.status(201).json(newTask);
});
  
  


// Atualizar tarefa (reescrever totalmente)
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, done } = req.body;
  
    const index = tasks.findIndex(t => t.id === parseInt(id));
    if (index === -1) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
  
    const errors = validateTaskData({ title, done }, false);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
  
    tasks[index] = {
      id: parseInt(id),
      title: title.trim(),
      done,
    };
  
    saveTasks();
  
    res.json(tasks[index]);
});
  
  

// Atualizar parcialmente
router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const updates = req.body;
  
    const task = tasks.find(t => t.id === parseInt(id));
    if (!task) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
  
    const errors = validateTaskData(updates, true);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
  
    Object.assign(task, updates);
    saveTasks();
  
    res.json(task);
});
  
  

// Deletar tarefa
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(t => t.id === parseInt(id));

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Tarefa não encontrada' });
  }

  tasks.splice(taskIndex, 1);
  saveTasks();

  res.status(204).send();
});

module.exports = router;