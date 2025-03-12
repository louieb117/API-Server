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
    validatePassword,
};