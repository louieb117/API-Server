const User = require('../../models/user.js');

const validateUserInDatabase = async (username, id) => {
    try{
        let user;
        if (id) {
            if (id.length > 20 ) {
                user = await User.findById(id);
            } else {
                user = await User.findOne({ username: id });
            }
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
        } else if (body.status && !['active', 'inactive'].includes(body.status)) {
            throw new Error("Invalid status");
        // } else if (body.password && body.password !== body.confirmPassword) {
        //     throw new Error("Passwords do not match");
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

const validateUserUsername = (body) => {
    try{
        if (body.username.length < 3) {
            throw new Error("Username must be at least 3 characters long");
        } 
        if (body.username.length > 20) {
            throw new Error("Username must be less than 20 characters long");
        }
        const userValidation = validateUserNOTInDatabase(body.username, null);
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

const validateUniqueFriends = async (user, friends, newFriend) => {
    try {
        if ( user.id === newFriend ) {
            return { isValid: false, message: "User cannot be friends with themselves" };
        }
        for (const friend of friends ) {
            if ( friend === newFriend ) {
                return { isValid: false, message: "User cannot be friends with the same person twice" };
            }
        }
        return { isValid: true };
    } catch (error) {
        return { isValid: false, message: error.message };
    }
};

const validateUserFriends = async (body) => {
    try {
        if (!Array.isArray(body.friends)) {
            throw new Error("Friends must be an array");
        }
        if (body.friends.length > 200) {
            throw new Error("Friends list must be less than 200 characters long");
        }
        for (const friendId of body.friends) {
            const userValidation = await validateUserInDatabase(null, friendId);
            if (!userValidation.isValid) {
                throw new Error(`Invalid friend ID: ${friendId}, ${userValidation.message}`);
            }
            const uniqueFriendsValidation = await validateUniqueFriends(userValidation.user, body.friends, friendId);
            if (!uniqueFriendsValidation.isValid) {
                throw new Error(`Invalid friend ID: ${friendId}, ${uniqueFriendsValidation.message}`);
            }
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
                    case 'fullName':
                        const userFullNameValidation = validateUserFullName(body);
                        if (userFullNameValidation.isValid) {
                            updateData.fullName = body.fullName;
                        } else {
                            return { isValid: false, message: userFullNameValidation.message };
                        }
                        break;
                    case 'username':
                        const userUsernameValidation = validateUserUsername(body);
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
                    case 'role':
                        const userRoleValidation = validateUserRole(body);
                        if (userRoleValidation.isValid) {
                            updateData.role = body.role;
                        } else {
                            return { isValid: false, message: userRoleValidation.message };
                        }
                        break;
                    case 'activated':
                        updateData.activated = body.activated;
                        break;
                    case 'currentLocation':
                        updateData.currentLocation = body.currentLocation;
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
                    case 'bio':
                        const userBioValidation = validateUserBio(body);
                        if (userBioValidation.isValid) {
                            updateData.bio = body.bio;
                        } else {
                            return { isValid: false, message: userBioValidation.message };
                        }
                        break;
                    case 'picture':
                        const userPictureValidation = validateUserPicture(body);
                        if (userPictureValidation.isValid) {
                            updateData.picture = body.picture;
                        } else {
                            return { isValid: false, message: userPictureValidation.message };
                        }
                        break;
                    case 'friends':
                        const userFriendsValidation = await validateUserFriends(body);
                        if (userFriendsValidation.isValid) {
                            updateData.friends = body.friends;
                        } else {
                            return { isValid: false, message: userFriendsValidation.message };
                        }
                        break;
                    default:
                        break;
                }
            }
        }
        return { isValid: true, updateData };
    } catch (error) {
        return { isValid: false, message: error.message };
    }
};
// const validateUserDeletionInput = (body) => {
//     try{

//     } catch (error) {
//         return { isValid: false, message: error.message };
//     }
// };

module.exports = {
    validateUserInDatabase,
    validateUserNOTInDatabase,
    validateUserCreationInput,
    validateUserFullName,
    validateUserUsername,
    validateUserPassword,
    validateUserRole,
    validateUserEmail,
    validateUserPhoneNumber,
    validateUserBio,
    validateUserPicture,
    validateUserFriends,
    validateUserUpdateInput,
    // validateUserDeletionInput
};