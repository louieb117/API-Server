const { 
    validateUserUsername,
    validateUserPassword, 
    validateUserStatus,
    validateUserEmail,
    validateUserPhoneNumber,  
} = require('./libraries/user.lib');

const validateUserDataInput = async (body) => {
    try {
        if (!body || Object.keys(body).length === 0) {
            throw new Error("Request body is empty");
        }
        const allowedFields = ['username', 'password', 'confirmPassword', 'role', 'status', 'phoneNumber', 'email', 'profile_id', 
                            'createdAt', 'updatedAt'];
        for (const key in body) {
            if (body.hasOwnProperty(key) && !allowedFields.includes(key)) {
                throw new Error(`Invalid field: ${key}`);
            }
        }
        return { isValid: true };
    } catch (error) {
        return { isValid: false, message: error.message };
    }
};
 
const validateUserCreationInput = async (body) => {
    try { 
        if (!body.username || !body.password || !body.confirmPassword|| !body.status || !body.phoneNumber || !body.email) {
            throw new Error("username, password, confirm password, status, phone number, and email are required");
        }
        const v_body = await validateUserUpdateInput(body); 
        if (!v_body.isValid) {
            return { isValid: false, message: v_body.message };
        }

        return { isValid: true };
    }   catch (error) { 
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
    validateUserDataInput,
    validateUserCreationInput, 
    validateUserUpdateInput,  
};