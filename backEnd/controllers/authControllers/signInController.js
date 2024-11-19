const TokenService = require("../../services/authServices/tokenServices");
const { getUserByRegistration } = require("../../model/userModel");
const { isEqualPassword } = require("../../utils/password");


const tokenServices = new TokenService();

    const signIn = async (req, res) => {
    const {registration, password} = req.body;

    const user = await getUserByRegistration(registration);

    if (!user){
        return res.status(401).json({message: "Invalid Credentials!"});
    }

    const isPasswordCorrect = await isEqualPassword(password, user.password);

    if (!isPasswordCorrect){
        return res.status(401).json({message: "Invalid Credentials!"});
    }

    const payload = {
        registration: user.registration,
        username: user.username,
    };

    const token = tokenServices.generate(payload);

    return res.json({message: "You're in!", token: token});

}
module.exports = { signIn };