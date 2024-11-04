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

//ROUTE TO CREATE A NEW TALON

router.post('/talon/new-talon', async (req, res) => {
 const {id_talao, remessa, id_estoque, qtde_taloes, status_talao} = req.body;

 try{
    const newTalon = await talonServices.createNewTalon(id_talao, remessa, id_estoque, qtde_taloes, status_talao);
    res.status(201).json({message: 'Talon Successfully Created!', talao: newTalon});
 }catch (error){
    res.status(500).json({message: 'Error! Something went wrong, try again!', err: error.message});

}
})


//ROUTE TO SEND TALON

router.post('/talon/send-talon', async (req, res) => {
    const {id_envio_talao, id_talao, id_loja, qtde_enviada, data_envio, data_evento} = req.body;
   
    try{
       const sendTalon = await talonServices.sendTalon(id_envio_talao, id_talao, id_loja, qtde_enviada, data_envio, data_evento);
       res.status(201).json({message: 'Talon Successfully Created!', envio: sendTalon});
    }catch (error){
       res.status(500).json({message: 'Error! Something went wrong, try again!', err: error.message});
   
   }
   })

   //ROUTE TO RECEIPT TALON

   router.post('/talon/receipt-talon', async (req, res) => {
    const {id_recebimento_talao, id_talao, id_loja, qtde_recebida, data_recebimento} = req.body;
   
    try{
       const receiptTalon = await talonServices.receiptTalon(id_recebimento_talao, id_talao, id_loja, qtde_recebida, data_recebimento);
       res.status(201).json({message: 'Talon Successfully Created!', recebimento: receiptTalon});
    }catch (error){
       res.status(500).json({message: 'Error! Something went wrong, try again!', err: error.message});
   
   }
   })


   
   
module.exports = router;




