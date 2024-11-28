const  Profile  = require('../models/profileModel');

// Function to create a new profile
async function insertProfile(
    profile_name,
    has_profile_management = false,
    has_user_management = false,
    has_inventory_management = false,
    has_maintenance = false,
    has_store_management = false,
    has_shipping = false,
    has_receiving = false
) {
    try {
        const newProfile = await Profile.create({
            profile_name,
            has_profile_management,
            has_user_management,
            has_inventory_management,
            has_maintenance,
            has_store_management,
            has_shipping,
            has_receiving
        });
        return newProfile;
    } catch (error) {
        console.error('Error! Something Went Wrong', error);
        throw error;
    }
}

// Function to consult all profiles
async function consultProfileAll() {
    try {
        const profiles = await Profile.findAll();
        return profiles;
    } catch (error) {
        console.error('Something Went Wrong!', error);
        throw error;
    }
}

// Function to consult a profile by ID
async function consultProfileById(profile_id) {
    try {
        const profile = await Profile.findOne({ where: { profile_id } });
        return profile;
    } catch (error) {
        console.error('Something went wrong while fetching profile by ID:', error);
        throw error;
    }
}

// Function to edit a profile
async function editProfile(
    profile_id,
    profile_name,
    has_profile_management,
    has_user_management,
    has_inventory_management,
    has_maintenance,
    has_store_management,
    has_shipping,
    has_receiving
) {
    try {
        const profile = await Profile.findByPk(profile_id);
        if (profile) {
            profile.profile_name = profile_name;
            profile.has_profile_management = has_profile_management;
            profile.has_user_management = has_user_management;
            profile.has_inventory_management = has_inventory_management;
            profile.has_maintenance = has_maintenance;
            profile.has_store_management = has_store_management;
            profile.has_shipping = has_shipping;
            profile.has_receiving = has_receiving;

            await profile.save();
            return profile;
        }
        throw new Error('Profile not found');
    } catch (error) {
        console.error('Something Went Wrong!', error);
        throw error;
    }
}

// Function to delete a profile
async function deleteProfile(profile_id) {
    try {
        const profile = await Profile.findByPk(profile_id);
        if (profile) {
            await profile.destroy();
            return profile;
        }
        throw new Error('Profile not found');
    } catch (error) {
        console.error('Something Went Wrong!', error);
        throw error;
    }
}

module.exports = { insertProfile, consultProfileAll, consultProfileById, editProfile, deleteProfile };
