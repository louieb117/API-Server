const jwt = require("jsonwebtoken");
const User = require('../models/user.js')
const userController = require('./userController.js')

const login = async (req, res) => {
    const {password} = req.body;
    const user = await User.findById(req.params.id);

    if (user.password !== password) {
        return res.status(403).json({
            error: "invalid login",
        });
    }

    delete user.password
}

module.exports = {
   login
};