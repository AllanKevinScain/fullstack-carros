# Projeto Full Stack 2 - Faculdade de Taquara (RS)

Este repositório foi desenvolvido como parte da disciplina **Full Stack 2** da Faculdade de Taquara, RS. O objetivo principal do projeto é construir uma **API em Node.js com SQLite** e um **front-end**, e integrá-los para formar uma aplicação completa.

---

## Estrutura do Projeto

- `back-end/` → contém o servidor Node.js, rotas, banco de dados SQLite (`bancoDeDadosTarefaUm.db`) e dependências (`node_modules`).
- `front-end/` → (opcional) pasta para a aplicação cliente, onde será implementada a interface para consumir a API.
- `.gitignore` → arquivo para ignorar arquivos desnecessários como `node_modules` e arquivos de banco de dados temporários.

---

## Funcionalidades

Atualmente, a API permite:

- **CRUD de Carros**

  - Listar, criar, atualizar e deletar carros.
  - Filtro de pesquisa por `name`, `trade` e `model`.
  - Campo `specifications` armazenado como array de strings via JSON.

- **CRUD de Usuários**

  - Listar, criar, atualizar e deletar usuários.
  - Validação de campos obrigatórios.

- **Persistência de dados**
  - Banco de dados SQLite integrado, com tabelas `carros` e `usuarios`.

---

## Tecnologias Utilizadas

- **Back-end**
  - Node.js
  - Express
  - SQLite3
- **Front-end**
  - Pode ser qualquer framework ou biblioteca (React, Vue, Angular, ou HTML/CSS/JS puro) para consumir a API via HTTP.

---

## Como rodar o projeto

1. Navegue até a pasta `back-end`:

```bash
cd back-end
```
