const TokenService = require("../../services/authServices/tokenServices");
const { userConsultByRegistration } = require("../../services/userServices");
const { isEqualPassword } = require("../../utils/password");

const tokenServices = new TokenService();

const signIn = async (req, res) => {
    const { registration, password } = req.body;

    try {
        // Consultando o usuário pelo registro
        const user = await userConsultByRegistration(registration);

        // Se o usuário não for encontrado, retorna erro de credenciais inválidas
        if (!user) {
            return res.status(401).json({ message: "Invalid Credentials!" });
        }

        // Verifica se a senha está correta
        const isPasswordCorrect = await isEqualPassword(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid Credentials!" });
        }

        // Define o payload do token com as informações do usuário
        const payload = {
            registration: user.registration,
            username: user.username,
            profile_id: user.profile_id, // Agora, estamos pegando diretamente do usuário
        };

        // Gera o token de autenticação
        const token = tokenServices.generate(payload);

        // Define o token como um cookie HTTP Only
        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000, // 1 dia
        });

        // Retorna a resposta com o token
        return res.json({ message: "You're in!", token });
    } catch (error) {
        console.error('Error during sign in process:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const logout = (req, res) => {
    // Limpa o cookie de autenticação
    res.clearCookie('auth_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });

    return res.json({ message: "Logged out successfully!" });
};

module.exports = { signIn, logout };
