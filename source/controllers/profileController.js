const User = require('../models/user');

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);  // Get the user from the request object
        res.status(200).json({ data: user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ data: user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getProfile,
    updateProfile
};
