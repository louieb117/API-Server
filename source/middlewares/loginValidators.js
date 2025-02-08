const validateLoginInput = (username, password, id) => {
    if ((!username && !id) || !password) {
        return {
            isValid: false,
            message: "Username and password or ID and password are required",
        };
    }
    return { isValid: true };
};

module.exports = {
    validateLoginInput,
};