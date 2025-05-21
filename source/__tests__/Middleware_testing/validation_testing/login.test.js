// const {
//     validateLoginInput,
//     validatePassword,
// } = require('../../../middlewares/validators/loginValidators.js');

// describe('Login Validator Logic', () => {
//     // 1. validateLoginInput
//     describe('validateLoginInput', () => {
//         test('should return isValid=true for valid username and password', () => {
//             const result = validateLoginInput('testuser', 'StrongPass1!');
//             expect(result.isValid).toBe(true);
//         });
//         test('should return isValid=true for valid id and password', () => {
//             const result = validateLoginInput(undefined, 'StrongPass1!', 'someUserId');
//             expect(result.isValid).toBe(true);
//         });
//         test('should return isValid=false if missing both username/id or password', () => {
//             const result = validateLoginInput('', '');
//             expect(result.isValid).toBe(false);
//             expect(result.message).toMatch(/required/);
//         });
//         test('should return isValid=false if missing password', () => {
//             const result = validateLoginInput('testuser', '');
//             expect(result.isValid).toBe(false);
//         });
//     });

//     // 2. validatePassword
//     describe('validatePassword', () => {
//         test('should return isValid=true for correct password', () => {
//             const user = { password: 'StrongPass1!' };
//             const result = validatePassword(user, 'StrongPass1!');
//             expect(result.isValid).toBe(true);
//         });
//         test('should return isValid=false for incorrect password', () => {
//             const user = { password: 'StrongPass1!' };
//             const result = validatePassword(user, 'WrongPass');
//             expect(result.isValid).toBe(false);
//             expect(result.message).toMatch(/Invalid password/);
//         });
//     });
// });

// /*
//     --- Template & Test Ideas ---
//     For each function:
//     - Test valid input (should return isValid=true)
//     - Test invalid input (should return isValid=false)
//     - Add more cases as needed: missing fields, wrong types, edge cases, etc.
// */