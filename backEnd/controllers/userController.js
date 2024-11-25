const userService = require('../services/userServices');
const { hasharPass } = require('../utils/password');
const TokenService = require('../services/authServices/tokenServices');
const { AppError, handleError } = require('../utils/errors');
const { sendSuccess } = require('../utils/responses');

class UserController {
    static async registerUser(req, res) {
        const { registration, username, store_id, profile_id, email, password } = req.body;
        try {
            if (!registration || !username || !password || !email) {
                throw new AppError("All fields are required!", 400);
            }
            const existingUser = await userService.userConsultByRegistration(registration);
            if (existingUser) {
                throw new AppError("User already exists!", 409);
            }
            const hashedPassword = await hasharPass(password);
            const newUser = await userService.insertUser(
                registration, username, store_id, profile_id, email, hashedPassword
            );
            const token = new TokenService().generate({ registration: newUser.registration, username: newUser.username });
            sendSuccess(res, 201, "User Successfully Registered!", { user: newUser, token });
        } catch (error) {
            handleError(res, error);
        }
    }

    static async consultAllUsers(req, res) {
        try {
            const users = await userService.userConsultAll();
            sendSuccess(res, 200, "Users fetched successfully", users);
        } catch (error) {
            handleError(res, error);
        }
    }

    static async consultUserByRegistration(req, res) {
        const { registration } = req.params;
        try {
            const user = await userService.userConsultByRegistration(registration);
            if (user) {
                sendSuccess(res, 200, "User found", user);
            } else {
                throw new AppError("User not found", 404);
            }
        } catch (error) {
            handleError(res, error);
        }
    }

    static async updateUser(req, res) {
        const { registration } = req.params;
        const { username, store_id, profile_id, email, password } = req.body;
        try {
            const hashedPassword = password ? await hasharPass(password) : undefined;
            const updatedUser = await userService.editUser(
                registration, username, store_id, profile_id, email, hashedPassword
            );
            if (updatedUser) {
                sendSuccess(res, 200, "User updated successfully", updatedUser);
            } else {
                throw new AppError("User not found", 404);
            }
        } catch (error) {
            handleError(res, error);
        }
    }

    static async deleteUser(req, res) {
        const { registration } = req.params;
        try {
            const deletedUser = await userService.deleteUser(registration);
            if (deletedUser) {
                sendSuccess(res, 200, "User deleted successfully", deletedUser);
            } else {
                throw new AppError("User not found", 404);
            }
        } catch (error) {
            handleError(res, error);
        }
    }
}

module.exports = UserController;
