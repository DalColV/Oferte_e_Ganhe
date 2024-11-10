const express = require('express');
const path = require('path');
const router = express.Router();
const { setInventory, editInventory, deleteInventory} = require('../../services/inventory-services');

router.get('/view-inventory', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontEnd/public/inventory/view-inventory-management.html'));

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
       res.status(500).json({message: 'Error! Something went wrong, try again!', error: error.message});
   
   }
   })



   
module.exports = router;

//PUT

//ROUTE TO EDIT THE INVENTORY

router.put('/inventory-edit/:inventory_id', async(req, res) => {
    const inventory_id = parseInt(req.params.inventory_id);
    const {store_id, min_quantity, recommended_quantity, current_quantity} = req.body;

    try{const updateInventory = await editInventory(inventory_id, store_id, min_quantity, recommended_quantity, current_quantity);
        if(updateInventory){
            res.status(200).json({message: 'Inventory Updated Successfully', inventory: updateInventory});
            
        }else{ res.status(404).json({message: 'Inventory Not Found'})
    }
    }catch(error) {res.status(500).json({message: 'Something Went Wrong!', error: error.message});

    }
});

module.exports = router;

// DELETE

//ROUTE TO DELETE AN INVENTORY
router.delete('/inventory-delete/:inventory_id', async (req, res) => {
    const { inventory_id } = req.params;

    try {
        const deletedInventory = await deleteInventory(inventory_id);
        if (deletedInventory) {
            res.status(200).json({ message: 'Inventory Has Been Deleted', inventory: deletedInventory});
        } else {
            res.status(404).json({ message: 'Inventory Not Found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Something Went Wrong!', error: error.message });
    }
});

module.exports = router;


