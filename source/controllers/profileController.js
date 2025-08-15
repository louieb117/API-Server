const User = require('../models/user');
const Profile = require('../models/profile');

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
        const profile = await Profile.findOne({ id: req.params.id });
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json({ data: profile });
    } catch (error) {
        console.error('Error fetching profile:', error); // Log the error
        res.status(500).json({ message: error.message });
    }
};

const createProfile = async (req, res) => {
    try {
        const profile = new Profile({ user_id: req.params.user_id, ...req.body });
        await profile.save();
        res.status(201).json({ data: profile });
    } catch (error) {
        console.error('Error creating profile:', error); // Log the error
        res.status(500).json({ message: error.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        const profile = await Profile.findOneAndUpdate({ profile_id: req.params.id }, req.body, { new: true });
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json({ data: profile });
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
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting profile:', error); // Log the error
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllProfiles,
    getProfile,
    createProfile,
    updateProfile,
    deleteProfile
};
