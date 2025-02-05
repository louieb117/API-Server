// require('dotenv').config(); // Load environment variables;

const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

const login = async (req, res) => {
    try { 
        const {password} = req.body;
        const user = await User.findById(req.params.id);

        if (user.password !== password) {
            return res.status(403).json({
                error: "invalid login",
            });
        }

        // Remove the password from the user object before generating the JWT token
        const userObject = user.toObject();
        delete userObject.password

        // Generate a JWT token with a 1-hour expiration
        const token = jwt.sign(userObject, process.env.MY_JWT_SECRET, { expiresIn: "1h"});

        // Set the JWT token as a cookie in the response
        res.cookie("token", token);
        
        res.status(200).json({
            message: "Login successful",
            data: userObject,
            token
        });

        // return res.redirect("/welcome");
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {login};