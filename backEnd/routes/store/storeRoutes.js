const express = require('express');
const path = require('path');
const { insertStore, editStore, deleteStore, consultStoreById, consultStores} = require('../../services/storeServices');
const router = express.Router();



//POST

//ROUTE TO CREATE A NEW STORE


router.post('/store-register', async (req, res) => {
    const { store_id, store_name, street, cep, number } = req.body;

    try {
      
        const store = await insertStore(store_id, store_name, street, cep, number);

        res.status(201).json({
            message: 'Store Created Successfully!',
            store: store
        });

    } catch (error) {
        console.error('Error! Something Went Wrong', error);
        res.status(500).json({ message: 'Error! Something Went Wrong!', error: error.message });
    }
});

module.exports = router;


//GET

// ROUTE TO CONSULT STORE

router.get('/stores', async (req, res) => {
  try {
      const stores = await consultStores();
      res.status(200).json(stores);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching stores', error: error.message });
  }
});

module.exports = router;


router.get('/stores/:store_id', async (req, res) => {
  const { store_id } = req.params;

  try {
      const store = await consultStoreById(store_id);

      if (store) {
          res.status(200).json(store);
      } else {
          res.status(404).json({ message: 'Store not found' });
      }
  } catch (error) {
      res.status(500).json({ message: 'Error fetching store by ID', error: error.message });
  }
});

module.exports = router;


//PUT 

// ROUTE TO EDIT A STORE

router.put('/store-edit/:store_id', async (req, res) => {
  const {store_id} = req.params;
  const {store_name,address_id} = req.body;

  try{ const updateStore = await editStore(store_id, store_name, address_id);
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



