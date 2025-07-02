const {MY_JWT_SECRET} = require('../configs/config.js');// Load environment variables;

const jwt = require('jsonwebtoken');
const {validateUserInDatabase} = require('../middlewares/validators/userValidators.js');
const { 
    validateLoginInput,
    validatePassword } = require('../middlewares/validators/loginValidators.js');


const login = async (req, res) => {
    try { 
        const {username, password} = req.body;
        const {id} = req.params;
        console.log("Login info: ", {username, password, id});
        // Login Function: Validate data and authenticate user and generate JWT token
        
        // Input Validation: check if username and password or ID and password are provided
        const inputValidation = validateLoginInput(username, password, id);
        console.log("Login info: inputValidation", inputValidation);
        if (!inputValidation.isValid) {
            return res.status(400).json({ error: inputValidation.message });
        }

        // Database Validation: Check if user exists
        const userValidation = await validateUserInDatabase(id);
        console.log("Login info: userValidation", userValidation);
        if (!userValidation.isValid) {
            return res.status(404).json({ error: userValidation.message });
        }

        const user = userValidation.user;

        // Password Validation
        const passwordValidation = validatePassword(user, password);
        console.log("Login info: passwordValidation", passwordValidation);
        if (!passwordValidation.isValid) {
            return res.status(403).json({ error: passwordValidation.message });
        }
        
        // Remove the password from the user object before generating the JWT token
        const userObject = user.toObject();
        delete userObject.password

        // Login Feature: Generate a JWT token with a 1-hour expiration
        const token = jwt.sign(userObject, MY_JWT_SECRET, { expiresIn: "1h"});
        console.log("Login info: token", token);
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