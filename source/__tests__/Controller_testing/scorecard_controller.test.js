// Functions under test:
const {
    getAllScorecards,
    getScorecard,
    getUsersScorecards,
    createScorecard,
    updateScorecard,
    deleteScorecard 
} = require('../../controllers/scorecardController.js');

// Test data:
const {
    reqUserID, 
    reqScorecardID,
    reqCreateBody_c_1,
    reqUpdateBody_c_1
} = require('../../utils/data/scorecard.test.data.js');

const {
    mockSocrecardResponse01
} = require('../../utils/data/scorecard.mock.data.js');

// Mocks:
const Scorecard = require('../../models/scorecard.js');
jest.mock('../../models/scorecard.js', () => ({
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn()
}));

// Mocking the validators
const {
    validateScorecardInDatabase,
    validateScorecardNotInDatabase,
    validateScorecardCreator,
    validateScorecardHoleSelection,
    validateScorecardCourse,
    validateScorecardDate,
    validateScorecardPlayers,
    validateScorecardScoresCreate,
    validateScorecardScoresUpdate
} = require('../../middlewares/validators/libraries/scorecard.js');

jest.mock('../../middlewares/validators/libraries/scorecard.js', () => ({
    validateScorecardInDatabase: jest.fn(),
    validateScorecardNotInDatabase: jest.fn(),
    validateScorecardCreator: jest.fn(),
    validateScorecardHoleSelection: jest.fn(),
    validateScorecardCourse: jest.fn(),
    validateScorecardDate: jest.fn(),
    validateScorecardPlayers: jest.fn(),
    validateScorecardScoresCreate: jest.fn(),
    validateScorecardScoresUpdate: jest.fn()
}));

const { validateUserInDatabase } = require('../../middlewares/validators/userValidators.js');

jest.mock('../../middlewares/validators/userValidators.js', () => ({
    validateUserInDatabase: jest.fn()
}));

// Test suite for Scorecard Controller
describe('Scorecard Controller Testing', () => {
    // 1. getAllScorecards
    describe('getAllScorecards', () => {
        test('should return all scorecards', async () => {
            Scorecard.find.mockResolvedValue(mockSocrecardResponse01);
            const req = {};
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await getAllScorecards(req, res);

            expect(Scorecard.find).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockSocrecardResponse01);
        });

        test('should handle errors', async () => {
            const errorMessage = 'Database error';
            Scorecard.find.mockRejectedValue(new Error(errorMessage));
            const req = {};
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await getAllScorecards(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
        }
        );
    });

    // 2. getScorecard
    describe('getScorecard', () => {
        test('should return a specific scorecard by ID', async () => {
            validateScorecardInDatabase.mockResolvedValue({ isValid: true, scorecard: mockSocrecardResponse01 });
            const req = { params: { id: reqScorecardID } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await getScorecard(req, res);
            expect(validateScorecardInDatabase).toHaveBeenCalledWith(reqScorecardID);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockSocrecardResponse01);
        });

        test('should return 404 if scorecard not found', async () => {
            validateScorecardInDatabase.mockResolvedValue({ isValid: false, message: 'Not found' });
            const req = { params: { id: reqScorecardID } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await getScorecard(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Not found' });
        });
    });

    // 3. getUsersScorecards
    describe('getUsersScorecards', () => {
        test('should return all scorecards for a user', async () => {
            validateUserInDatabase.mockResolvedValue({ isValid: true, user: reqUserID });
            Scorecard.find.mockResolvedValue([mockSocrecardResponse01]);
            const req = { params: { id: reqUserID } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await getUsersScorecards(req, res);
            expect(validateUserInDatabase).toHaveBeenCalledWith(reqUserID);
            expect(Scorecard.find).toHaveBeenCalledWith({ creator: reqUserID });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ Scorecards: [mockSocrecardResponse01], User: reqUserID });
        }
        );
        test('should return 404 if user not found', async () => {
            validateUserInDatabase.mockResolvedValue({ isValid: false, message: 'User not found' });
            const req = { params: { id: reqUserID } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await getUsersScorecards(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
        });
    }
    );

});