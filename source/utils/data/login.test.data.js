const username = 'Fin.tester';
const password = 'Fin3453333!';
const id = '685e20eeb401f750303a83a1';

const notAUsername = 'NotAUser';
const notAPassword = 'NotAPassword';

// 200 code: Successful login
const reqLoginBody_1 = {
    "username": username,
    "password": password
};

// 400 code: Invalid input
const reqLoginBody_3 = {
   "username": "",
    "password": ""
};

const reqLoginBody_4 = {
    "username": username
};

const reqLoginBody_5 = {
    "password": password
};

// 404 code: User not found
const reqLoginBody_6 = {
    "username": notAUsername,
    "password": password
};

// 403 code: Invalid password
const reqLoginBody_7 = {
    "username": username,
    "password": notAPassword
};

module.exports = {
    username,
    password,
    id,
    notAUsername,
    notAPassword,
    reqLoginBody_1,
    reqLoginBody_3,
    reqLoginBody_4,
    reqLoginBody_5,
    reqLoginBody_6,
    reqLoginBody_7
};