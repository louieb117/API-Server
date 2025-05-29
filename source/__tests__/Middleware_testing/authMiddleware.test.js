// const jwt = require('jsonwebtoken');
// const authMiddleware = require('../../middlewares/authMiddleware.js');

// jest.mock('jsonwebtoken');

// describe('authMiddleware', () => {
//     let req, res, next;

//     beforeEach(() => {
//         req = { headers: {} };
//         res = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn()
//         };
//         next = jest.fn();
//         jest.clearAllMocks();
//     });

//     test('should return 401 if no token is provided', () => {
//         authMiddleware(req, res, next);
//         expect(res.status).toHaveBeenCalledWith(401);
//         expect(res.json).toHaveBeenCalledWith({ message: 'No token provided' });
//         expect(next).not.toHaveBeenCalled();
//     });

//     test('should call next and set req.user if token is valid', () => {
//         req.headers.authorization = 'Bearer validtoken';
//         const decoded = { id: 'user123' };
//         jwt.verify.mockReturnValue(decoded);

//         authMiddleware(req, res, next);

//         expect(jwt.verify).toHaveBeenCalledWith('validtoken', process.env.JWT_SECRET);
//         expect(req.user).toEqual(decoded);
//         expect(next).toHaveBeenCalled();
//     });

//     test('should return 401 if token is invalid', () => {
//         req.headers.authorization = 'Bearer invalidtoken';
//         jwt.verify.mockImplementation(() => { throw new Error('Invalid token'); });

//         authMiddleware(req, res, next);

//         expect(res.status).toHaveBeenCalledWith(401);
//         expect(res.json).toHaveBeenCalledWith({ message: 'Invalid token' });
//         expect(next).not.toHaveBeenCalled();
//     });
// });