const db = require('../db');

exports.listarUsuarios = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM usuarios');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar usuários' });
  }
};

exports.criarUsuario = async (req, res) => {
  const { nome, email } = req.body;
  try {
    await db.query('INSERT INTO usuarios (nome, email) VALUES (?, ?)', [nome, email]);
    res.status(201).json({ mensagem: 'Usuário criado com sucesso' });
  } catch (err) {
    console.error(err); // 👈 isso aqui é essencial pra debug
    res.status(500).json({ erro: 'Erro ao criar usuário' });
  }
};