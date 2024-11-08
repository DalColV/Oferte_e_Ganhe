const express = require('express');
const path = require('path');
const { insertStore, editStore, deleteStore} = require('../services/store-services');
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

//ROUTE TO CREATE A NEW STORE

router.post('/store-register', async (req, res) => {
  const {store_id, store_name} = req.body;

  try{ const newStore = await insertStore(store_id, store_name); 
    res.status(201).json({message: 'Store Successfully Registered!', store: newStore});
  }catch (error){
    res.status(500).json({message: 'Error! Something Went Wrong!', error: error.message});
  }
});

module.exports = router;

//PUT 

// ROUTE TO EDIT A STORE

router.put('/store-edit/:store_id', async (req, res) => {
  const {store_id} = req.params;
  const {store_name} = req.body;

  try{ const updateStore = await editStore(store_id, store_name);
    if(updateStore){
      res.status(200).json({message: 'Store Updated Successfully!', store: updateStore});

    } else{
      res.status(404).json({message: 'Store Not Found!'});

    }
  }catch(error){
    res.status(500).json({message: 'Something Went Wrong', error: error.message});
  }
});

module.exports = router;

//DELETE

// ROUTE TO DELETE A STORE


router.delete('/store-delete/:store_id', async (req, res) => {
  const { store_id } = req.params;

  try {
      const deletedStore = await deleteStore(store_id);
      if (deletedStore) {
          res.status(200).json({ message: 'Store Has Been Deleted!', store: deletedStore });
      } else {
          res.status(404).json({ message: 'Store Not Found!.' });
      }
  } catch (error) {
      res.status(500).json({ message: 'Somenthing Went Wrong', error: error.message });
  }
});

module.exports = router;



