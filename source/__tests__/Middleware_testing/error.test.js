// const errorHandler = require('../../middlewares/error.js');

// describe('Error Middleware', () => {
//     test('should send 500 status and error message', () => {
//         // Mock req, res, next
//         const err = new Error('Test error');
//         const req = {};
//         const res = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn()
//         };
//         const next = jest.fn();

//         errorHandler(err, req, res, next);

//         expect(res.status).toHaveBeenCalledWith(500);
//         expect(res.json).toHaveBeenCalledWith({
//             status: 'error',
//             message: 'Test error'
//         });
//     });

//     test('should log the error stack', () => {
//         const err = new Error('Stack error');
//         const req = {};
//         const res = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn()
//         };
//         const next = jest.fn();

//         // Spy on console.error
//         const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

//         errorHandler(err, req, res, next);

//         expect(consoleSpy).toHaveBeenCalledWith(err.stack);

//         consoleSpy.mockRestore();
//     });
// });