const profileService = require('../services/profileServices');
const { AppError, handleError } = require('../utils/errors');
const { sendSuccess } = require('../utils/responses');

class ProfileController {
    static async createProfile(req, res) {
        const { profile_name, has_profile_management, has_user_management, has_inventory_management, has_maintenance, has_store_management, has_shipping, has_receiving } = req.body;
        try {
            const newProfile = await profileService.insertProfile(
                profile_name, 
                has_profile_management, 
                has_user_management, 
                has_inventory_management,
                has_maintenance, 
                has_store_management, 
                has_shipping, 
                has_receiving
            );
            sendSuccess(res, 201, "Profile Successfully Registered!", newProfile);
        } catch (error) {
            handleError(res, error);
        }
    }

    static async getAllProfiles(req, res) {
        try {
            const profiles = await profileService.consultProfileAll();
            sendSuccess(res, 200, "Profiles fetched successfully", profiles);
        } catch (error) {
            handleError(res, error);
        }
    }

    static async getProfileById(req, res) {
        const { profile_id } = req.params;
        try {
            const profile = await profileService.consultProfileById(profile_id);
            if (profile) {
                sendSuccess(res, 200, "Profile found", profile);
            } else {
                throw new AppError("Profile not found", 404);
            }
        } catch (error) {
            handleError(res, error);
        }
    }

    static async updateProfile(req, res) {
        const { profile_id } = req.params;
        const { profile_name, has_profile_management, has_user_management, has_inventory_management, has_maintenance, has_store_management, has_shipping, has_receiving } = req.body;
        try {
            const updatedProfile = await profileService.editProfile(
                profile_id, 
                profile_name, 
                has_profile_management, 
                has_user_management, 
                has_inventory_management,
                has_maintenance, 
                has_store_management, 
                has_shipping, 
                has_receiving
            );
            if (updatedProfile) {
                sendSuccess(res, 200, "Profile Updated Successfully!", updatedProfile);
            } else {
                throw new AppError("Profile not found", 404);
            }
        } catch (error) {
            handleError(res, error);
        }
    }

    static async deleteProfile(req, res) {
        const { profile_id } = req.params;
        try {
            const deletedProfile = await profileService.deleteProfile(profile_id);
            if (deletedProfile) {
                sendSuccess(res, 200, "Profile deleted successfully", deletedProfile);
            } else {
                throw new AppError("Profile not found", 404);
            }
        } catch (error) {
            handleError(res, error);
        }
    }
}

module.exports = ProfileController;
