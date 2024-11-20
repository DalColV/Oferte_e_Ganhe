const userService = require('../services/userServices');
const { hasharPass } = require('../utils/password');
const TokenService = require('../services/authServices/tokenServices');
const bcrypt = require('bcryptjs');

class UserController {

    // POST - Register a new user

    static async registerUser(req, res) {
        const { registration, username, store_id, profile_id, email, password } = req.body;
    
        try {
            if (!registration || !username || !password || !email) {
                return res.status(400).json({ message: "All fields are required!" });
            }
    
            const existingUser = await userService.userConsultByRegistration(registration);
            if (existingUser) {
                return res.status(409).json({ message: "User already exists!" });
            }
    
            const hashedPassword = await hasharPass(password);
    
            const newUser = await userService.insertUser(
                registration, 
                username, 
                store_id, 
                profile_id, 
                email, 
                hashedPassword
            );
    
            const payload = { registration: newUser.registration, username: newUser.username };
            const token = new TokenService().generate(payload);
    
            return res.status(201).json({
                message: 'User Successfully Registered!',
                user: newUser,
                token,
            });
        } catch (error) {
            console.error("Error registering user:", error);
            res.status(500).json({ message: 'Error! Something went wrong, try again!', error: error.message });
        }
    }
    

    // GET - Consult all users

    static async consultAllUsers(req, res) {
        try {
            const users = await userService.userConsultAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching users', error: error.message });
        }
    }

    // GET - Consult a specific user by registration

    static async consultUserByRegistration(req, res) {
        const { registration } = req.params;

        try {
            const user = await userService.userConsultByRegistration(registration);

            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error fetching user by registration', error: error.message });
        }
    }

    // PUT - Update a user

    static async updateUser(req, res) {
        const { registration } = req.params;
        const { username, store_id, profile_id, email, password } = req.body;

        try {
            let hashedPassword = password;
            if (password) {
                const salt = await bcrypt.genSalt(10);
                hashedPassword = await bcrypt.hash(password, salt);
            }

            const updatedUser = await userService.editUser(registration, username, store_id, profile_id, email, hashedPassword);

            if (updatedUser) {
                res.status(200).json({ message: 'User Updated Successfully!', user: updatedUser });
            } else {
                res.status(404).json({ message: 'User Not Found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Something Went Wrong!', error: error.message });
        }
    }

    // DELETE - Delete a user
    
    static async deleteUser(req, res) {
        const { registration } = req.params;
    
        try {
            const deletedUser = await userService.deleteUser(registration);
            
            if (deletedUser) {
                res.status(200).json({ message: 'User Deleted Successfully!', user: deletedUser });
            } else {
                res.status(404).json({ message: 'User Not Found!' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Something Went Wrong!', error: error.message });
        }
    }
    
}

module.exports = UserController;
