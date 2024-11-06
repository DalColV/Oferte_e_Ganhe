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
    const {inventory_id, store_id, min_quantity, recommended_quantity, current_quantity} = req.body;
   
    try{
       const newInventory = await setInventory(inventory_id, store_id, min_quantity, recommended_quantity, current_quantity);
       res.status(201).json({message: 'Done!', INVENTORY: newInventory});
    }catch (error){
       res.status(500).json({message: 'Error! Something went wrong, try again!', err: error.message});
   
   }
   })



   
module.exports = router;

