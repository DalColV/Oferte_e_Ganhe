const TokenService = require("../../services/authServices/tokenServices");
const { userConsultByRegistration } = require("../../services/userServices");
const { isEqualPassword } = require("../../utils/password");

const tokenServices = new TokenService();

const signIn = async (req, res) => {
    const { registration, password } = req.body;

    try {
        const user = await userConsultByRegistration(registration);

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
            profile_id: user.profile_id,
            profile_name: user.profile_name, 
        };

        const token = tokenServices.generate(payload);

         res.cookie('auth_token', token, {
             httpOnly: true,
             secure: false,
             sameSite: 'strict',
             maxAge: 24 * 60 * 60 * 1000, 
         });
    

         return res.json({
            message: "You're in!",
            token,
            user: {
                registration: user.registration,
                username: user.username,
                profile_id: user.profile_id,
                profile_name: user.profile_name,
                store_id: user.store_id, 
            },
        });

    } catch (error) {
        console.error('Error during sign in process:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const logout = (req, res) => {

    res.clearCookie('auth_token', {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    });

    return res.json({ message: "Logged out successfully!" });
};

module.exports = { signIn, logout };
