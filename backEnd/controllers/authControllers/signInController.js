const TokenService = require("../../services/authServices/tokenServices");
const { getUserByRegistration } = require("../../model/userModel");
const { isEqualPassword } = require("../../utils/password");

const tokenServices = new TokenService();

const signIn = async (req, res) => {
    const { registration, password } = req.body;

    const user = await getUserByRegistration(registration);

    if (!user) {
        return res.status(401).json({ message: "Invalid Credentials!" });
    }

    const isPasswordCorrect = await isEqualPassword(password, user.password);

    if (!isPasswordCorrect) {
        return res.status(401).json({ message: "Invalid Credentials!" });
    }

    const payload = {
        registration: user.registration,
        username: user.username,
        profile_id,
    };

    const token = tokenServices.generate(payload);

    res.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'strict', 
        maxAge: 24 * 60 * 60 * 1000, 
    });

    return res.json({ message: "You're in!", token: token });
};

const logout = (req, res) => {
    res.clearCookie('auth_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'strict', 
    });

    return res.json({ message: "Logged out successfully!" });
};

module.exports = {signIn, logout};