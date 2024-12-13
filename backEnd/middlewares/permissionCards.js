const Profile = require("../models/profileModel");

const addPermissionsToRequest = async (req, res, next) => {
    try {
        const { profile_id } = req.user;

        if (!profile_id) {
            return res.status(403).json({ error: "Access denied. Profile ID is missing." });
        }

        const profile = await Profile.findByPk(profile_id);

        if (!profile) {
            return res.status(403).json({ error: "Access denied. Profile not found." });
        }

        req.user.permissions = profile.get(); 
        next();
    } catch (error) {
        console.error("Error in addPermissionsToRequest middleware:", error);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};

module.exports = { addPermissionsToRequest };
