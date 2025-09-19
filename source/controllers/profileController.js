const User = require('../models/user');
const Profile = require('../models/profile');
const { validateUsernameInDatabase } = require('../middlewares/validators/userValidators.js');
const { 
    validateProfileInDatabase
} = require('../middlewares/validators/libraries/profile.lib.js');
const { 
    validateProfileCreationInput,
    validateProfileUpdateInput
} = require('../middlewares/validators/profileValidators.js');

const getAllProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find();
        res.status(200).json({ data: profiles });
    } catch (error) {
        console.error('Error fetching profiles:', error); // Log the error
        res.status(500).json({ message: error.message });
    }
};

const getProfile = async (req, res) => {
    try {

        const profileValidation = await validateProfileInDatabase(req.params.id);
        if (!profileValidation.isValid) {
            return res.status(404).json({ error: profileValidation.message });
        }
        console.log('getProfile info: profileValidation:', profileValidation);
        res.status(200).json(profileValidation.profile);

        // const profile = await Profile.findOne({ id: req.params.id });
        // if (!profile) {
        //     return res.status(404).json({ message: 'Profile not found' });
        // }
        // res.status(200).json({ data: profile });
    } catch (error) {
        console.error('Error fetching profile:', error); // Log the error
        res.status(500).json({ message: error.message });
    }
};

const getUsersProfile = async (req, res) => {
    try {
        // Database Validation: Check if user exists
        const userValidation = await validateUsernameInDatabase(req.params.id);
        if (!userValidation.isValid) {
            return res.status(404).json({ error: userValidation.message });
        }

        console.log('getUsersProfile info: input for findOne()', { user_id: req.params.id });
        const userProfile = await Profile.findOne({ user_id: req.params.id });

        if (!userProfile) {
            return res.status(404).json({ message: 'Profile not found for this user' });
        }

        res.status(200).json({ Profile: userProfile, User: req.params.id });
    } catch (error) {
        console.error('Error fetching user profile:', error); // Log the error
        res.status(500).json({ message: error.message });
    }
};

const createProfile = async (req, res) => {
    try {
        // Database Validation: Check if user exists
        const userValidation = await validateUsernameInDatabase(req.params.user_id);
        if (!userValidation.isValid) {
            return res.status(404).json({ error: userValidation.message });
        }

        const user = userValidation.user;
        console.log('createScorecard info: user', user);

        // Request Body Validation
        const profileCreationValidation = await validateProfileCreationInput(req.body);
        console.log('createProfile info: profileCreationValidation:', profileCreationValidation);
        if (!profileCreationValidation.isValid) {
            return res.status(400).json({ error: profileCreationValidation.message });
        }
        const profile = await Profile.create({ user_id: req.params.user_id, ...req.body });
        console.log('createProfile info: new profile created', profile);
        res.status(201).json({ message: "New Profile Created!", data: profile });
    } catch (error) {
        console.error('Error creating profile:', error); // Log the error
        res.status(500).json({ message: error.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        // Database Validation: Check if profile exists
        const profileValidation = await validateProfileInDatabase(req.params.id);
        if (!profileValidation.isValid) {
            return res.status(404).json({ error: profileValidation.message });
        }

        const refProfile = profileValidation.profile;
        console.log('updateProfile info: refProfile:', refProfile);

        // Update Feature: Only allow the owner of the profile to update it
        // Update Feature: Merge existing profile data with new data
        // const updatedData = { ...refProfile.scores };

        // for (const key in req.body) {

        // Request body Validation
        const profileUpdateValidation = await validateProfileUpdateInput(req.body);
        console.log('updateProfile info: profileUpdateValidation:', profileUpdateValidation);
        if (!profileUpdateValidation.isValid) {
            return res.status(400).json({ error: profileUpdateValidation.message });
        }


        // Update Function: Update the profile with the validated request body
        const profile = await Profile.findOneAndUpdate({ profile_id: req.params.id }, req.body, { new: true });
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        // Log the updated profile
        console.log('updateProfile info: profile updated', profile);
        res.status(200).json({ message: "Profile Updated!", data: profile });
    } catch (error) {
        console.error('Error updating profile:', error); // Log the error
        res.status(500).json({ message: error.message });
    }
};

const deleteProfile = async (req, res) => {
    try {
        const profile = await Profile.findOneAndDelete({ profile_id: req.params.id });
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(204).json({ data: profile });
    } catch (error) {
        console.error('Error deleting profile:', error); // Log the error
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllProfiles,
    getProfile,
    getUsersProfile,
    createProfile,
    updateProfile,
    deleteProfile
};
