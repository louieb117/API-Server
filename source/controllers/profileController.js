const User = require('../models/user');

const getProfile = async (req, res) => {
    const user = await User.findById(req.params.id);  // Get the user from the request object
    res.status(200).json({ data: user });
};

const updateProfile = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ data: user });
};

module.exports = {
    getProfile,
    updateProfile
};
