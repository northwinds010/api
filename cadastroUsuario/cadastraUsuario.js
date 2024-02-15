const express = require('express');
const router = express.Router();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('rafaell_9122', 'rafaell_9122', '17Uh0Ky2aV', {
  host: '198.50.187.244',
  dialect: 'mysql'
});

app.get('/pessoas', async (req, res) => {
    try {
      const [pessoas] = await sequelize.query('SELECT * FROM Pessoas');
      res.json(pessoas);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router;