# TaskZenio App

TaskZenio é uma aplicação web leve para gerenciamento de tarefas, com foco em simplicidade e eficiência. Desenvolvido em Node.js com Express, este projeto é ideal para quem está aprendendo a criar APIs REST básicas.

---

## Funcionalidades

- Listar todas as tarefas
- Criar nova tarefa
- Atualizar status da tarefa (marcar como concluída ou não)
- Deletar tarefa pelo ID

---

## Tecnologias utilizadas

- Node.js
- Express.js
- Módulo nativo do Node.js fs para persistência simples em arquivo JSON

---

## Como rodar o projeto localmente

1. Clone o repositório:
   ```bash
   git clone <https://github.com/julioneri/taskzenio-app>
   ```

2. Acesse a pasta do projeto:
   ```bash
   cd taskzenio-app
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Inicie o servidor:
   ```bash
   node src/app.js
   ```

5. O servidor estará rodando em [http://localhost:3000](http://localhost:3000)


## Estrutura do projeto

```
taskzenio-app/
├── public/
│   └── css/
│   └── js/
│   └── index.html
├── src/
│   └── app.js         # Arquivo principal com as rotas e lógica da API
│   └── db.json        # Arquivo JSON que armazena as tarefas
├── test.http          # Arquivo para testar os endpoints no VSCode
├── package.json
├── .gitignore
└── README.md
```

---

## Rotas disponíveis

- `GET /`  
  Retorna uma mensagem de boas-vindas para verificar se o servidor está rodando.

- `GET /tasks`  
  Retorna a lista de todas as tarefas.

- `POST /tasks`  
  Cria uma nova tarefa.  
  Exemplo de corpo JSON:  
  ```json
  {
    "title": "Minha nova tarefa"
  }
  ```

- `PUT /tasks/:id`  
  Atualiza o status (feito ou não) da tarefa pelo ID.  
  Exemplo de corpo JSON:  
  ```json
  {
    "done": true
  }
  ```

- `DELETE /tasks/:id`  
  Deleta a tarefa pelo ID.

---

## Observações

- Este projeto armazena as tarefas em um arquivo JSON (db.json), garantindo persistência dos dados mesmo após reiniciar o servidor.
- Próximos passos incluem a integração com banco de dados apropriado.

---

## Autor

Julio César (julioneri)

---

## Licença

MIT
