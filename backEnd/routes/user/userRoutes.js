const express = require('express');
const path = require('path');
const router = express.Router();
const { insertUser, editUser, deleteUser, userConsultAll, userConsultByRegistration} = require('../../services/userServices');


//POST

// Rota para cadastro de um novo usuário no banco

router.post('/register', async (req, res) => {
    const {registration , username, store_id, profile_id, email, password} = req.body;

    try{
        const newUser = await insertUser(registration , username, store_id, profile_id, email, password);
        res.status(201).json({message: 'User Successfully registered!', users: newUser});

    }catch (error){
         res.status(500).json({message: 'Error! Something went wrong, try again!', error: error.message});

    }
});

module.exports = router;

// GET

// Route to consult all users

router.get('/users', async (req, res) => {
    try {
        const users = await userConsultAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
});

module.exports = router;

// Route to consult an especific users by registration

router.get('/users/:registration', async (req, res) => {
    const { registration } = req.params;

    try {
        const user = await userConsultByRegistration(registration);
        
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user by registration', error: error.message });
    }
});

module.exports = router;


//PUT 

// Rota para editar um usuário

router.put('/register-edit/:registration', async (req, res) => {
    const { registration } = req.params;
    const { username, store_id, profile_id, email, password } = req.body;

    try { 
        const updateUser = await editUser(registration, username, store_id, profile_id, email, password);
        
        console.log("updateUser:", updateUser); 

        if (updateUser) {
            res.status(200).json({ message: 'User Updated Successfully!', user: updateUser });
        } else { 
            res.status(404).json({ message: 'User Not Found' });
        }  
    } catch (error) { 
        res.status(500).json({ message: 'Something Went Wrong!', error: error.message });
    }
});

module.exports = router;


//DELETE

//Route to Delete an User

router.delete('/register-delete/:registration', async (req, res) => {
    const { registration } = req.params;

    try {
        const deletedUser = await deleteUser(registration);
        if (deletedUser) {
            res.status(200).json({ message: 'User Deleted Successfully!', users: deletedUser});
        } else {
            res.status(404).json({ message: 'User Not Found!.' });
        }
    } catch (erro) {
        res.status(500).json({ message: 'Something Went Wrong!', error: erro.message });
    }
});

module.exports = router;
