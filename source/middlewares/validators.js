const User = require('../models/user.js');

const validateLoginInput = (username, password, id) => {
    try{
        if ((!username && !id) || !password) {
            return {
                isValid: false,
                message: "Username and password or ID and password are required",
            };        
        }        
        return { isValid: true };

    } catch (error) {
        return { isValid: false, message: error.message };

    }
};

const validateUserInDatabase = async (username, id) => {
    try{
        let user;
        if (id) {
            user = await User.findById(id);
        } else {
            user = await User.findOne({ username });
        }

        if (!user) {
            return {
                isValid: false,
                message: "User not found",
            };        
        }
        return { isValid: true, user };

    } catch (error) {
        return { isValid: false, message: error.message };
    }
};

const validateUserNOTInDatabase = async (username, id) => {
    try{
        let user;
        if (id) {
            user = await User.findById(id);
        } else {
            user = await User.findOne({ username });
        }

        if (user) {
            return {
                isValid: false,
                message: "User already exists",
            };        
        }
        return { isValid: true };

    } catch (error) {
        return { isValid: false, message: error.message };
    }
};

const validateUserCreationInput = (body) => {
    try{
        if (!body.username || !body.password) {
            throw new Error("Username and password are required");
        } else if (body.username.length < 3) {
            throw new Error("Username must be at least 3 characters long");
        } else if (body.username.length > 20) {
            throw new Error("Username must be less than 20 characters long");
        } else if (body.email && !body.email.includes('@')) {
            throw new Error("Invalid email address");
        } else if (body.role && !['admin', 'user', 'tester'].includes(body.role)) {
            throw new Error("Invalid role");
        } else if (body.status && !['active', 'inactive'].includes(body.status)) {
            throw new Error("Invalid status");
        } else if (body.password && body.password !== body.confirmPassword) {
            throw new Error("Passwords do not match");
        } else if (body.password.length > 20) {
            throw new Error("Password must be less than 20 characters long");
        } else if (body.password && body.password.length < 8) {
            throw new Error("Password must be at least 8 characters long");
        } else if (body.password && !/[0-9]/.test(body.password)) {
            throw new Error("Password must contain a number");
        } else if (body.password && !/[A-Z]/.test(body.password)) {
            throw new Error("Password must contain an uppercase letter");
        } else if (body.password && !/[a-z]/.test(body.password)) {
            throw new Error("Password must contain a lowercase letter");
        } else if (body.password && !/[!@#$%^&*]/.test(body.password)) {
            throw new Error("Password must contain a special character");
        }

        const userValidation = validateUserNOTInDatabase(body.username);
        if (!userValidation.isValid) {
            return { isValid: false, message: userValidation.message };
        }
        return { isValid: true };

    } catch (error) {
        return { isValid: false, message: error.message };
    }
};

// const validateUserUpdateInput = (body) => {
//     try{

//     } catch (error) {
//         return { isValid: false, message: error.message };
//     }
// };

// const validateUserDeletionInput = (body) => {
//     try{

//     } catch (error) {
//         return { isValid: false, message: error.message };
//     }
// };

const validatePassword = (user, password) => {
    try{
        if (user.password !== password) {
            throw new Error("Invalid password");
        }
        return { isValid: true };

    } catch (error) {
        return { isValid: false, message: error.message };
    }
};

module.exports = {
    validateLoginInput,
    validateUserInDatabase,
    validateUserCreationInput,
    validatePassword
};