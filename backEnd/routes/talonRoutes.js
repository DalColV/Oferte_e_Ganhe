const express = require('express');
const path = require('path');
const router = express.Router();
//const { createNewTalon, sendTalon } = require('../services/talon-services');
const talonServices = require('../services/talon-services'); // Importa o módulo completo



// Rotas para Servir Talões

// Envio

router.get('/talon/view-send', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/public/talon/view-send-talon.html'));

});

//Recebimento

router.get('/talon/view-receipt', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/public/talon/view-receipt-talon.html'));

});



// POST


//ROUTE TO SEND TALON

router.post('/talon/send-talon', async (req, res) => {
    const {inventory_id, talon_quantity, send_date, order_date, talon_status, receive_date, user_id} = req.body;
   
    try{
       const sendTalon = await talonServices.sendTalon(inventory_id, talon_quantity, send_date, order_date, talon_status, receive_date, user_id);
       res.status(201).json({message: 'Talon Successfully Sent!', TALON_LOGS: sendTalon});
    }catch (error){
       res.status(500).json({message: 'Error! Something went wrong, try again!', err: error.message});
   
   }
   })


module.exports = router;

// PUT

//Route to EDIT a Talon


router.put('/edit-talon/:talon_id', async (req, res) => {
   const {talon_id} = req.params;
   const {talon_quantity, send_date, order_date, talon_status, receive_date, user_id} = req.body;

   try{const updateTalon = await editTalon(inventory_id, talon_quantity, send_date, order_date, talon_status, receive_date, user_id, talon_id);
      if(updateTalon){
         res.status(200).json({message: "Talon Updated Successfully!", TALON_LOGS: updateTalon});
      }else{ res.status(404).json({message: 'Talon not founded!'});
   }
   } catch (error) {
   res.status(500).json({ message: 'Something Went Wrong!', error: error.message });
   }
});


