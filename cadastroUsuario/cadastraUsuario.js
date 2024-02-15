const express = require('express');
const router = express.Router();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('rafaell_9122', 'rafaell_9122', '17Uh0Ky2aV', {
    host: '198.50.187.244',
    dialect: 'mysql'
});

router.post('/', async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        // Criptografa a senha
        const senhaCriptografada = await bcrypt.hash(senha, 10);

        // Salva o usuário no banco de dados
        await sequelize.query('INSERT INTO Pessoas (nome, email, senha) VALUES (?, ?, ?)', {
            replacements: [nome, email, senhaCriptografada]
        });

        res.status(201).send('Usuário criado com sucesso');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;