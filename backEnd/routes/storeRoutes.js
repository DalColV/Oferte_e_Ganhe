const express = require('express');
const path = require('path');
const { insertStore } = require('../services/store-services');
const router = express.Router();

// Rota para registrar a loja
router.get('/store/view-store-register', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/public/store/view-store-register.html'));
});

// Rota para listar lojas
router.get('/store/view-store-list', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/public/store/view-store-list.html'));
});

module.exports = router;

//POST

//Rota para Cadastro de nova loja no banco

router.post('/store-register', async (req, res) => {
  const {id_loja, nome_loja} = req.body;

  try{ const newStore = await insertStore(id_loja, nome_loja); 
    res.status(201).json({message: 'Store Successfully Registered!', loja: newStore});
  }catch (err){
    res.status(500).json({message: 'Error! Something Went Wrong!', err: err.message});
  }
});

module.exports = router;


