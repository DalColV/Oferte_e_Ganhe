import { hasharPass } from '../../utils/passwordUtil'; 
import { TokenService } from '../../services/authServices/tokenServices'; 
import { getUserByRegistration, createUser } from '../../model/userModel'; 

const tokenServices = new TokenService();

export const signUp = async (req, res) => {
    try {
        const { registration, username, password, email } = req.body;

        if (!registration || !username || !password || !email) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const existingUser = await getUserByRegistration(registration);
        if (existingUser) {
            return res.status(409).json({ message: "User already exists!" }); 
        }

        const hashedPassword = await hasharPass(password);

        const newUser = await createUser({
            registration,
            username,
            password: hashedPassword,
            email
        });

        const payload = { registration: newUser.registration, username: newUser.username };
        const token = tokenServices.generate(payload);

        return res.status(201).json({
            message: "User registered successfully!",
            token, 
        });
    } catch (error) {
        console.error("Error in signUp:", error);
        return res.status(500).json({ message: "Internal server error" }); // ver aqui pra usar o middleware de erro
    }
};
