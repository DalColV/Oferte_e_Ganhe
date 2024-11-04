const express = require('express');
const path = require('path');
const router = express.Router();
const { setInventory } = require('../services/inventory-services');

router.get('/view-inventory', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/public/inventory/view-inventory-management.html'));

});

module.exports = router;

// POST

// ROUTE TO INSERT THE QUANTITIES IN INVENTORY

router.post('/inventory', async (req, res) => {
    const {id_estoque, id_loja, qtde_minima_taloes, qtde_recomendada_taloes, qtde_atual_taloes} = req.body;
   
    try{
       const newInventory = await setInventory(id_estoque, id_loja, qtde_minima_taloes, qtde_recomendada_taloes, qtde_atual_taloes);
       res.status(201).json({message: 'Done!', inventory: newInventory});
    }catch (error){
       res.status(500).json({message: 'Error! Something went wrong, try again!', err: error.message});
   
   }
   })



   
module.exports = router;

