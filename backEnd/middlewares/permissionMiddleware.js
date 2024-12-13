const Profile = require("../models/profileModel");

const permissionMiddleware = (requiredPermissions) => {
    return async (req, res, next) => {
        try {
            const { profile_id } = req.user;

            if (!profile_id) {
                if (req.accepts('html')) {
                    return res.redirect('/403');
                }
                return res.status(403).json({ error: "Access denied. Profile ID is missing." });
            }

            const profile = await Profile.findByPk(profile_id);

            if (!profile) {
                if (req.accepts('html')) {
                    return res.redirect('/403');
                }
                return res.status(403).json({ error: "Access denied. Profile not found." });
            }

            const permissions = Array.isArray(requiredPermissions)
                ? requiredPermissions
                : [requiredPermissions];

            // Verifica se o perfil possui todas as permissões necessárias
            const hasAllPermissions = permissions.some(permission => profile[permission]);

            if (!hasAllPermissions) {
                if (req.accepts('html')) {
                    return res.redirect('/403');
                }
                return res.status(403).json({ 
                    error: `Access denied. At least one of the following permissions is required: ${permissions.join(", ")}.`  
                });
            }
            req.user.permissions = profile.get();
            next();
        } catch (error) {
            console.error("Error in Permission Middleware:", error);
            if (req.accepts('html')) {
                return res.redirect('/500'); 
            }
            return res.status(500).json({ error: "Internal server error. Please try again later." });
        }
    };
};

module.exports = { permissionMiddleware };
