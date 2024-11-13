const profileService = require('../services/profileServices');

class ProfileController {

    // POST - Criar um novo perfil

    static async createProfile(req, res) {
        const {
            profile_name,
            has_profile_management = false,
            has_user_management = false,
            has_inventory_management = false,
            has_maintenance = false,
            has_store_management = false,
            has_shipping = false,
            has_receiving = false
        } = req.body;

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
            res.status(201).json({ message: 'Profile Successfully Registered!', PROFILE: newProfile });
        } catch (error) {
            res.status(500).json({ message: 'Error! Something Went Wrong!', error: error.message });
        }
    }

    // GET - Consultar todos os perfis

    static async getAllProfiles(req, res) {
        try {
            const profiles = await profileService.consultProfileAll();
            res.status(200).json(profiles);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching profiles', error: error.message });
        }
    }

    // GET - Consultar um perfil específico por ID

    static async getProfileById(req, res) {
        const { profile_id } = req.params;

        try {
            const profile = await profileService.consultProfileById(profile_id);
            if (profile) {
                res.status(200).json(profile);
            } else {
                res.status(404).json({ message: 'Profile not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error fetching profile by ID', error: error.message });
        }
    }

    // PUT - Atualizar um perfil

    static async updateProfile(req, res) {
        const { profile_id } = req.params;
        const {
            profile_name,
            has_profile_management,
            has_user_management,
            has_inventory_management,
            has_maintenance,
            has_store_management,
            has_shipping,
            has_receiving
        } = req.body;

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
                res.status(200).json({ message: 'Profile Updated Successfully!', profile: updatedProfile });
            } else {
                res.status(404).json({ message: 'Profile Not Found!' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Something Went Wrong!', error: error.message });
        }
    }

    // DELETE - Deletar um perfil
    
    static async deleteProfile(req, res) {
        const { profile_id } = req.params;

        try {
            const deletedProfile = await profileService.deleteProfile(profile_id);
            if (deletedProfile) {
                res.status(200).json({ message: 'Profile Has Been Deleted!', profile: deletedProfile });
            } else {
                res.status(404).json({ message: 'Profile Not Found!' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Something Went Wrong!', error: error.message });
        }
    }
}

module.exports = ProfileController;
