// Função para validar os dados
module.exports = function validateTask(req, res, next) {
    const { title, done } = req.body;
  
    // Se o método for POST, title é obrigatório
    if (req.method === 'POST') {
      if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ error: 'O título é obrigatório e deve ser uma string válida.' });
      }
    }
  
    // Se title estiver presente, ele deve ser uma string válida
    if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
      return res.status(400).json({ error: 'O título deve ser uma string válida.' });
    }
  
    // Se done estiver presente, deve ser um booleano
    if (done !== undefined && typeof done !== 'boolean') {
      return res.status(400).json({ error: 'O campo "done" deve ser verdadeiro ou falso (booleano).' });
    }
  
    next();
  };
  