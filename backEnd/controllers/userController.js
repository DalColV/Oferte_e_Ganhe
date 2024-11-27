const userService = require('../services/userServices');
const { hasharPass } = require('../utils/password');
const TokenService = require('../services/authServices/tokenServices');
const { AppError, handleError } = require('../utils/errors');
const { sendSuccess } = require('../utils/responses');

class UserController {
    // Registrar usuário
    static async registerUser(req, res) {
        const { registration, username, store_id, profile_id, email, password } = req.body;
        try {
            if (!registration || !username || !password || !email) {
                throw new AppError("All fields are required!", 400);
            }

            // Defina o profile_id como '1' (perfil restrito) caso não seja enviado
            const finalProfileId = profile_id || 1; // Supondo que 1 seja o ID do perfil restrito

            const hashedPassword = await hasharPass(password);

            const newUser = await userService.insertUser(
                registration, username, store_id, finalProfileId, email, hashedPassword
            );

            const token = new TokenService().generate({ registration: newUser.registration, username: newUser.username });

            sendSuccess(res, 201, "User Successfully Registered!", { user: newUser, token });
        } catch (error) {
            handleError(res, error);
        }
    }

    // Consultar todos os usuários
    static async consultAllUsers(req, res) {
        try {
            const users = await userService.userConsultAll();
            sendSuccess(res, 200, "Users fetched successfully", users);
        } catch (error) {
            handleError(res, error);
        }
    }

    // Consultar usuário por registro
    static async consultUserByRegistration(req, res) {
        const { registration } = req.params;
        try {
            const user = await userService.userConsultByRegistration(registration);
            if (!user) {
                throw new AppError("User not found", 404);
            }
            sendSuccess(res, 200, "User found", user);
        } catch (error) {
            handleError(res, error);
        }
    }

    // Atualizar usuário
    static async updateUser(req, res) {
        const { registration } = req.params;
        const { username, store_id, profile_id, email, password } = req.body;
        try {
            const hashedPassword = password ? await hasharPass(password) : undefined;
    
            const updatedUser = await userService.editUser(
                registration, username, store_id, profile_id, email, hashedPassword
            );
    
            if (!updatedUser) {
                throw new AppError("User not found", 404);
            }
    
            sendSuccess(res, 200, "User updated successfully", updatedUser);
        } catch (error) {
            handleError(res, error);
        }
    }

    // Deletar usuário
    static async deleteUser(req, res) {
        const { registration } = req.params;
        try {
            const deletedUser = await userService.deleteUser(registration);
            if (!deletedUser) {
                throw new AppError("User not found", 404);
            }
            sendSuccess(res, 200, "User deleted successfully", deletedUser);
        } catch (error) {
            handleError(res, error);
        }
    }
}

module.exports = UserController;
