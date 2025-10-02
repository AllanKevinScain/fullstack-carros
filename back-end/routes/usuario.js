const express = require('express');
const router = express.Router();
const db = require('../database/db');

// listar
router.get('/', (_, res) => {
    db.all("SELECT * FROM usuarios", [], (err, rows) => {
        if (err) return res.status(500).json({ erro: err.message });

        if (rows.length === 0) {
            res.status(201).json({ message: "Nenhum usuário encontrado" });
        } else {
            res.json(rows);
        }
    });
});

// Buscar por ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    db.get("SELECT * FROM usuarios WHERE id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ erro: err.message });
        if (!row) return res.status(404).json({ erro: "Usuário não encontrado" });
        res.json(row);
    });
});

// criar
router.post('/', (req, res) => {
    const { name, age } = req.body;
    db.run(
        "INSERT INTO usuarios (name, age) VALUES (?, ?)",
        [name, age],
        function (err) {
            if (err) return res.status(500).json({ erro: err.message });
            res.status(201).json({ id: this.lastID, name, age });
        }
    );
});

// atualizar
router.put('/:id', (req, res) => {
    const { name, age } = req.body;
    const id = req.params.id;
    db.run(
        `UPDATE usuarios SET name=?, age=? WHERE id=?`,
        [name, age, id],
        function (err) {
            if (err) return res.status(500).json({ erro: err.message });
            if (this.changes === 0) return res.status(404).json({ erro: "Usuário não encontrado" });
            res.json({ id, name, age });
        }
    );
});

// Deletar
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.run("DELETE FROM usuarios WHERE id = ?", [id], function (err) {
        if (err) return res.status(500).json({ erro: err.message });
        if (this.changes === 0) return res.status(404).json({ erro: "Usuário não encontrado" });
        res.status(204).send({ message: "Usuário deletado com sucesso" });
    });
});

module.exports = router;
