const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});


const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('rafaell_9122', 'rafaell_9122', '17Uh0Ky2aV', {
  host: '198.50.187.244',
  dialect: 'mysql'
});

app.get('/time', async (req, res) => {
  try {
    const result = await sequelize.query('SELECT NOW() AS time');
    res.json({ time: result[0][0].time });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get('/tables', async (req, res) => {
  try {
    const [tables] = await sequelize.query('SHOW TABLES');
    res.json(tables);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/pessoas', async (req, res) => {
  try {
    const [pessoas] = await sequelize.query('SELECT * FROM Pessoas');
    res.json(pessoas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get('/pessoas/:pessoa', async (req, res) => {
  try {
    const pessoa = req.params.pessoa;
    const [pessoas] = await sequelize.query(`SELECT * FROM Pessoas WHERE nome = :pessoa`, 
    { 
      replacements: { pessoa: pessoa }, 
      type: sequelize.QueryTypes.SELECT 
    });
    res.json(pessoas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('Server started'));