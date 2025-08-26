const User = require('../../models/user.js');

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

const validateUserCreationInput = async (body) => {
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
        } else if (body.status && !['active', 'inactive', 'locked', 'banned'].includes(body.status)) {
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
        } else {
            return { isValid: true };
        }
    } catch (error) {
        return { isValid: false, message: error.message };
    }
};

const validateUserFullName = (body) => {
    try{
        if (!body.fullName) {
            throw new Error("Full name is required");
        }
        if (body.fullName.length < 3) {
            throw new Error("Full name must be at least 3 characters long");
        } 
        if (body.fullName.length > 50) {
            throw new Error("Full name must be less than 50 characters long");
        } 
        return { isValid: true };
    } catch (error) {
        return { isValid: false, message: error.message , body};
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

const validateUserBio = (body) => {
    try{
        if (body.bio.length > 200) {
            throw new Error("Bio must be less than 200 characters long");
        }
        return { isValid: true };
    } catch (error) {
        return { isValid: false, message: error.message };
    }
};

const validateUserPicture = (body) => {
    try{
        if (body.picture.length > 200) {
            throw new Error("Picture URL must be less than 200 characters long");
        }
        return { isValid: true };
    } catch (error) {
        return { isValid: false, message: error.message };
    }
};

const validateUniqueFriends = async (user, newFriend) => {
    try {
        if ( user._id.toString() === newFriend ) { 
            return { isValid: false, message: "User cannot be friends with themselves" };
        }
        const count = user.friends.filter(friend => friend === newFriend).length;
        if (count > 0) { 
            return { isValid: false, message: "User cannot be friends with the same person twice" };
        }
        const userValidation = await validateUsernameInDatabase(newFriend);
        if (!userValidation.isValid) { 
            return { isValid: false, message: "Not an existing user" };
        }
        return { isValid: true };
    } catch (error) {
        return { isValid: false, message: error.message };
    }
}; 

const validateUserUpdateInput = async (body) => {
    try {
        const updateData = {};
        for (const key in body) {
            if (body.hasOwnProperty(key)) {
                switch (key) { 
                    case 'username':
                        const userUsernameValidation = await validateUserUsername(body);
                        if (userUsernameValidation.isValid) {
                            updateData.username = body.username;
                        } else {
                            return { isValid: false, message: userUsernameValidation.message };  
                        }
                        break;
                    case 'password':
                        const userPasswordValidation = validateUserPassword(body);
                        if (userPasswordValidation.isValid) {
                            updateData.password = body.password;
                        } else {
                            return { isValid: false, message: userPasswordValidation.message };
                        }
                        break; 
                    case 'status': 
                        const userStatusValidation = validateUserStatus(body);
                        if (userStatusValidation.isValid) {
                            updateData.status = body.status;
                        } else {
                            return { isValid: false, message: userStatusValidation.message };
                        }
                        break;
                    case 'phoneNumber':
                        const userPhoneNumberValidation = validateUserPhoneNumber(body);
                        if (userPhoneNumberValidation.isValid) {
                            updateData.phoneNumber = body.phoneNumber;
                        } else {
                            return { isValid: false, message: userPhoneNumberValidation.message };
                        }
                        break;
                    case 'email':
                        const userEmailValidation = validateUserEmail(body);
                        if (userEmailValidation.isValid) {
                            updateData.email = body.email;
                        } else {
                            return { isValid: false, message: userEmailValidation.message };
                        }
                        break; 
                    default:
                        break;
                }
            }
        }
        return { isValid: true, body };
    } catch (error) {
        return { isValid: false, message: error.message }; 
    }
}; 

module.exports = {
    validateUsernameInDatabase,
    validateUserNOTInDatabase,
    validateUserCreationInput,
    validateUserFullName,
    validateUserUsername,
    validateUserPassword,
    validateUserRole,
    validateUserStatus,
    validateUserEmail,
    validateUserPhoneNumber,
    validateUserBio,
    validateUserPicture,
    validateUniqueFriends,
    validateUserUpdateInput, 
};