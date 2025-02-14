const {MY_JWT_SECRET} = require('../configs/config.js');// Load environment variables;

const jwt = require('jsonwebtoken');
const { validateLoginInput, validateUserInDatabase, validatePassword } = require('../middlewares/validators.js');


const login = async (req, res) => {
    try { 
        const {username, password} = req.body;
        const {id} = req.params;
        
        // Input Validation
        const inputValidation = validateLoginInput(username, password, id);
        if (!inputValidation.isValid) {
            return res.status(400).json({ error: inputValidation.message });
        }

        // Database Validation: Check if user exists
        const userValidation = await validateUserInDatabase(username, id);
        if (!userValidation.isValid) {
            return res.status(404).json({ error: userValidation.message });
        }

        const user = userValidation.user;

        // Password Validation
        const passwordValidation = validatePassword(user, password);
        if (!passwordValidation.isValid) {
            return res.status(403).json({ error: passwordValidation.message });
        }
        
        // Remove the password from the user object before generating the JWT token
        const userObject = user.toObject();
        delete userObject.password

        // Generate a JWT token with a 1-hour expiration
        const token = jwt.sign(userObject, MY_JWT_SECRET, { expiresIn: "1h"});

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