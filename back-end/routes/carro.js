const express = require('express');
const router = express.Router();
const db = require('../database/db');

// pesquisar
router.get('/pesquisar', (req, res) => {
    const searchParams = req._parsedUrl.search;
    const { name, trade, model } = req.query;

    if (searchParams === null) {
        res.status(400).json({ message: "Informe pelo menos um parâmetro" });
    } else {
        let sql = `SELECT * FROM carros WHERE 1=1`;
        let params = [];

        if (name) {
            sql += ` AND LOWER(name) LIKE ?`;
            params.push(`%${name.toLowerCase()}%`);
        }
        if (trade) {
            sql += ` AND LOWER(trade) LIKE ?`;
            params.push(`%${trade.toLowerCase()}%`);
        }
        if (model) {
            sql += ` AND LOWER(model) LIKE ?`;
            params.push(`%${model.toLowerCase()}%`);
        }

        db.all(sql, params, (err, rows) => {
            if (err) return res.status(500).json({ message: err.message });
            res.json(rows);
        });
    }
});


// listar
router.get('/', (_, res) => {
    db.all("SELECT * FROM carros", [], (err, rows) => {
        if (err) return res.status(500).json({ message: err.message });

        if (rows.length === 0) {
            res.status(201).json({ message: "Nenhum carro encontrado" })
        } else {
            res.json(rows);
        }
    });
});

// busca por id
router.get('/:id', (req, res) => {
    const id = req.params.id;
    db.get("SELECT * FROM carros WHERE id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ message: err.message });
        if (!row) return res.status(404).json({ message: "Carro não encontrado" });
        res.json(row);
    });
});

// criar
router.post('/', (req, res) => {
    const { name, trade, model, year, price, thumb, specifications } = req.body;
    db.run(
        `INSERT INTO carros (name, trade, model, year, price, thumb, specifications)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [name, trade, model, year, price, thumb, specifications],
        (err) => {
            if (err) return res.status(500).json({ message: err.message });
            res.status(201).json({
                id: this.lastID,
                name, trade, model, year, price, thumb, specifications
            });
        }
    );
});

// atualizar
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { name, trade, model, year, price, thumb, specifications } = req.body;

    db.get("SELECT * FROM carros WHERE id=?", [id], (err, carroAtual) => {
        if (err) return res.status(500).json({ message: err.message });
        if (!carroAtual) return res.status(404).json({ message: "Carro não encontrado" });

        const newName = name !== undefined ? name : carroAtual.name;
        const newTrade = trade !== undefined ? trade : carroAtual.trade;
        const newModel = model !== undefined ? model : carroAtual.model;
        const newYear = year !== undefined ? year : carroAtual.year;
        const newPrice = price !== undefined ? price : carroAtual.price;
        const newThumb = thumb !== undefined ? thumb : carroAtual.thumb;
        const newSpecs = specifications !== undefined ? specifications : carroAtual.specifications;

        db.run(
            `UPDATE carros 
             SET name=?, trade=?, model=?, year=?, price=?, thumb=?, specifications=? 
             WHERE id=?`,
            [newName, newTrade, newModel, newYear, newPrice, newThumb, newSpecs, id],
            function (err) {
                if (err) return res.status(500).json({ message: err.message });

                db.get("SELECT * FROM carros WHERE id=?", [id], (err, row) => {
                    if (err) return res.status(500).json({ message: err.message });
                    res.json(row);
                });
            }
        );
    });
});



// Deletar
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.run("DELETE FROM carros WHERE id = ?", [id], (err) => {
        if (err) return res.status(500).json({ message: err.message });
        if (this.changes === 0) return res.status(404).json({ message: "Carro não encontrado" });
        res.status(204).send();
    });
});

module.exports = router;
