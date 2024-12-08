const userService = require('../services/userServices');
const { hasharPass } = require('../utils/password');
const TokenService = require('../services/authServices/tokenServices');
const { AppError, handleError } = require('../utils/errors');
const { sendSuccess } = require('../utils/responses');
const reportService = require('../services/reportUserServices');


class UserController {
    //Pegar Perfil Do usuário 
    static async getUserProfile(req, res) {
        try {
            const token = req.cookies['auth_token'];

            const profile = await userService.getProfileFromToken(token);

            sendSuccess(res, 200, "Profile retrieved successfully", profile);
        } catch (error) {
            handleError(res, error);
        }
    }

    // Pegar E-mail do Usuário pelo ID
    static async getUserEmail(req, res) {
        try {
            const { userId } = req.params;

            const email = await userService.getUserEmail(userId);

            if (!email) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }

            sendSuccess(res, 200, "E-mail recuperado com sucesso", { email });

        } catch (error) {
            handleError(res, error);
        }
    }

    // Registrar usuário
    static async registerUser(req, res) {
        const { registration, username, store_id, profile_id, email, password } = req.body;
        try {
            if (!registration || !username || !password || !email) {
                throw new AppError("All fields are required!", 400);
            }

            const finalProfileId = profile_id || 3; 

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

    // Consultar usuario por email
    static async getUserByEmail(req, res) {
        const { email } = req.body;
    
        if (!email) {
            return res.status(400).json({ message: 'Email é obrigatório.' });
        }
    
        try {
            const user = await userService.getUserEmailByEmail(email);
    
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }
    
            return res.status(200).json({
                message: 'Usuário encontrado.',
                user,
            });
        } catch (error) {
            console.error('Erro ao buscar o usuário:', error);
            return res.status(500).json({
                message: 'Erro ao buscar o usuário.',
                error: error.message,
            });
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
   
    static async exportUserCSV(req, res){
        try{
            const csvFilePath = await reportService.exportUsersReport();
            res.download(csvFilePath, 'usuarios.csv');
        }catch(error){
            console.error("Erro ao exportar CSV:", error);
            res.status(500).json({ message: 'Error exporting CSV', error: error.message });
        }
    }

}

module.exports = UserController;
