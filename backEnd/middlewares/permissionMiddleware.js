const Profile = require("../models/profileModel"); 

const permissionMiddleware = (requiredPermission) => {
    return async (req, res, next) => {
        try {
            const { profile_id } = req.user;

            if (!profile_id) {
                return res.status(403).json({ error: "Access denied. Profile ID is missing." });
            }

            const profile = await Profile.findByPk(profile_id);

            if (!profile) {
                return res.status(403).json({ error: "Access denied. Profile not found." });
            }

            // Verifica se o perfil possui a permissão necessária
            if (!profile[requiredPermission]) {
                return res.status(403).json({ error: `Access denied. Permission '${requiredPermission}' is required.` });
            }

            next();
        } catch (error) {
            console.error("Error in Permission Middleware:", error);
            return res.status(500).json({ error: "Internal server error. Please try again later." });
        }
    };
};

module.exports = { permissionMiddleware };
