const User = require('../../../models/user.js');

const validateUsernameInDatabase = async (username) => {
    try{  
        if (!username) {
            throw new Error("id must be provided");
        }
        if (username.length > 20 ) {
            throw new Error("Invalid id format, it should be a valid MongoDB ObjectId");
        }
        const user = username ? await User.findOne(username) : null; 
        if (!user) {
            throw new Error("User not found");
        }
        return { isValid: true, user: user, message: "User exists" };
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
        if (!(user === null)) {
            return {
                isValid: false,
                message: "User already exists",
            };        
        }
        return { isValid: true, message: "User does not exist" };
    } catch (error) {
        return { isValid: false, message: error.message };
    }
};  

const validateUserUsername = async (body) => {
    try{
        if (body.username.length < 3) {
            throw new Error("Username must be at least 3 characters long");
        } 
        if (body.username.length > 20) {
            throw new Error("Username must be less than 20 characters long");
        }
        const userValidation = await validateUserNOTInDatabase(body.username, null);
        if (!userValidation.isValid) {
            throw new Error("Username already exists");
        }
        return { isValid: true };
    } catch (error) {
        return { isValid: false, message: error.message };
    }
};

const validateUserPassword = (body) => {
    try{
        if (!body.password) {
            throw new Error("Password is required");
        }
        if (body.confirmPassword && (body.password !== body.confirmPassword)) {
            throw new Error("Passwords do not match");
        }
        if (body.password.length > 20) {
            throw new Error("Password must be less than 20 characters long");
        } 
        if (body.password.length < 8) {
            throw new Error("Password must be at least 8 characters long");
        } 
        if (!/[0-9]/.test(body.password)) {
            throw new Error("Password must contain a number");
        } 
        if (!/[A-Z]/.test(body.password)) {
            throw new Error("Password must contain an uppercase letter");
        } 
        if (!/[a-z]/.test(body.password)) {
            throw new Error("Password must contain a lowercase letter");
        } 
        if (!/[!@#$%^&*]/.test(body.password)) {
            throw new Error("Password must contain a special character");
        }
        return { isValid: true };
    } catch (error) {
        return { isValid: false, message: error.message };
    }
};

const validateUserRole = (body) => {
    try{
        if (body.role && !['admin', 'user', 'tester'].includes(body.role)) {
            throw new Error("Invalid role");
        }
        return { isValid: true };
    } catch (error) {
        return { isValid: false, message: error.message };
    }
};

const validateUserStatus = (body) => {
    try{
        if (body.status && !['active', 'inactive', 'locked', 'banned'].includes(body.status)) {
            throw new Error("Invalid status");
        }
        return { isValid: true };
    } catch (error) {
        return { isValid: false, message: error.message };
    }
};

const validateUserPhoneNumber = (body) => { 
    try{
        if (body.phoneNumber && body.phoneNumber.length !== 10) {
            throw new Error("Phone number must be 10 digits long");
        }
        return { isValid: true };
    } catch (error) {
        return { isValid: false, message: error.message };
    }
};

const validateUserEmail = (body) => {
    try{
        if (body.email && !body.email.includes('@')) {
            throw new Error("Invalid email address");
        }
        return { isValid: true };
    } catch (error) {
        return { isValid: false, message: error.message };
    }
}; 

const validateUserDelete = async (id) => {
    try {
        if (!id) {
            throw new Error("User id must be provided");
        }
        if (id.length > 20 ) {
            throw new Error("Invalid id format, it should be a valid MongoDB ObjectId");
        }
        const user = await User.findById(id);
        if (!user) {
            throw new Error("User not found");
        }
        return { isValid: true, message: "User exists" };
    } catch (error) {
        return { isValid: false, message: error.message };
    }
}

module.exports = {
    validateUsernameInDatabase,
    validateUserNOTInDatabase,  
    validateUserUsername,
    validateUserPassword,
    validateUserRole,
    validateUserStatus,
    validateUserEmail,
    validateUserPhoneNumber, 
    validateUserDelete
};