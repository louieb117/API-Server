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
    reqUserName, 
    reqScorecardID,
    reqCreateBody_c_1,
    reqUpdateBody_c_1
} = require('../../utils/data/scorecard.test.data.js');

const {
    mockUser,
    mockSocrecardGetResponse01,
    mockSocrecardUpdateResponse01,
    mockScorecardDeleteResponse01
} = require('../../utils/data/scorecard.mock.data.js');

// Mocks:
// Mocking Scorecard model
const Scorecard = require('../../models/scorecard.js');
jest.mock('../../models/scorecard.js', () => ({
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn()
}));

// Mocking Scorecard validators
const { 
    validateScorecardDataInput,
    validateScorecardCreationInput,
    validateScorecardUpdateInput
 } = require('../../middlewares/validators/scorecardValidators.js');

jest.mock('../../middlewares/validators/scorecardValidators.js', () => ({
    validateScorecardDataInput: jest.fn(),
    validateScorecardCreationInput: jest.fn(),
    validateScorecardUpdateInput: jest.fn()
}));

// Mocking the scorecard library validators
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

// Mocking user validators
const { validateUsernameInDatabase } = require('../../middlewares/validators/userValidators.js');

jest.mock('../../middlewares/validators/userValidators.js', () => ({
    validateUsernameInDatabase: jest.fn()
}));

// Test suite for Scorecard Controller
describe('Scorecard Controller Testing', () => {

    // 1. getAllScorecards
    describe('getAllScorecards', () => {

        test('should return all scorecards', async () => {
            // Mockings
            Scorecard.find.mockResolvedValue(mockSocrecardGetResponse01);

            // Request and Response objects
            const req = {};
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await getAllScorecards(req, res);

            // Assertions
            expect(Scorecard.find).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockSocrecardGetResponse01);
        });

        test('should handle errors', async () => {
            // Mockings
            const errorMessage = 'Database error';
            Scorecard.find.mockRejectedValue(new Error(errorMessage));

            // Request and Response objects
            const req = {};
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await getAllScorecards(req, res);

            // Assertions
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
        });

    });

    // 2. getScorecard
    describe('getScorecard', () => {

        test('should return a specific scorecard by ID', async () => {
            // Mockings
            validateScorecardInDatabase.mockResolvedValue({ isValid: true, scorecard: mockSocrecardGetResponse01 });

            // Request and Response objects
            const req = { params: { id: reqScorecardID } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await getScorecard(req, res);

            // Assertions
            expect(validateScorecardInDatabase).toHaveBeenCalledWith(reqScorecardID);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockSocrecardGetResponse01);
        });

        test('should return 404 if scorecard not found', async () => {
            // Mockings
            validateScorecardInDatabase.mockResolvedValue({ isValid: false, message: 'Not found' });

            // Request and Response objects
            const req = { params: { id: reqScorecardID } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await getScorecard(req, res);

            // Assertions
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Not found' });
        });

    });

    // 3. getUsersScorecards
    describe('getUsersScorecards', () => {

        test('should return all scorecards for a user', async () => {
            // Mockings
            validateUsernameInDatabase.mockResolvedValue({ isValid: true, user: reqUserID });
            Scorecard.find.mockResolvedValue([mockSocrecardGetResponse01]);

            // Request and Response objects
            const req = { params: { id: reqUserID } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await getUsersScorecards(req, res);
            
            // Assertions
            expect(validateUsernameInDatabase).toHaveBeenCalledWith(reqUserID);
            expect(Scorecard.find).toHaveBeenCalledWith({ creator: reqUserID });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ Scorecards: [mockSocrecardGetResponse01], User: reqUserID });
        });

        test('should return 404 if user not found', async () => {
            // Mockings
            validateUsernameInDatabase.mockResolvedValue({ isValid: false, message: 'User not found' });

            // Request and Response objects
            const req = { params: { id: reqUserID } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await getUsersScorecards(req, res);

            // Assertions
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
        });

    });

    // 4. createScorecard
    describe('createScorecard', () => {

        test('should create a new scorecard', async () => {
            // Mockings
            validateUsernameInDatabase.mockResolvedValue({ isValid: true, user: mockUser });
            validateScorecardCreationInput.mockResolvedValue({ isValid: true });
            Scorecard.create.mockResolvedValue(mockSocrecardGetResponse01);

            // Request and Response objects
            const req = { params: { username: reqUserName }, body: reqCreateBody_c_1 };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await createScorecard(req, res);            

            // Assertions
            expect(validateUsernameInDatabase).toHaveBeenCalledWith(reqUserName);
            expect(validateScorecardCreationInput).toHaveBeenCalledWith(reqCreateBody_c_1);            
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: "New Scorecard Created!",
                data: mockSocrecardGetResponse01
            });
            expect(Scorecard.create).toHaveBeenCalledWith({
                ...reqCreateBody_c_1,
                creator: mockUser._id
            });

        });

        test('should return 400 if validation fails', async () => {
            // Mockings
            validateUsernameInDatabase.mockResolvedValue({ isValid: false, message: 'User not found' });

            // Request and Response objects
            const req = { params: { id: reqUserID }, body: reqCreateBody_c_1 };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await createScorecard(req, res);

            // Assertions
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
        });

    });

    // 5. updateScorecard
    describe('updateScorecard', () => {

        test('should update an existing scorecard', async () => {
            // Mockings
            validateScorecardInDatabase.mockResolvedValue({ isValid: true, scorecard: mockSocrecardGetResponse01 });
            validateScorecardUpdateInput.mockResolvedValue({ isValid: true });
            Scorecard.findByIdAndUpdate.mockResolvedValue(mockSocrecardUpdateResponse01);

            // Request and Response objects
            const req = { params: { id: reqScorecardID }, body: reqUpdateBody_c_1 };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await updateScorecard(req, res);

            // Assertions
            expect(validateScorecardInDatabase).toHaveBeenCalledWith(reqScorecardID);
            expect(validateScorecardUpdateInput).toHaveBeenCalledWith(reqUpdateBody_c_1, reqScorecardID);
            expect(Scorecard.findByIdAndUpdate).toHaveBeenCalledWith(reqScorecardID, reqUpdateBody_c_1, { new: true });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "Scorecard updated!",
                data: mockSocrecardUpdateResponse01
            });
        });

        test('should return 404 if scorecard not found', async () => {
            // Mockings
            validateScorecardInDatabase.mockResolvedValue({ isValid: false, message: 'Not found' });

            // Request and Response objects
            const req = { params: { id: reqScorecardID }, body: reqUpdateBody_c_1 };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await updateScorecard(req, res);

            // Assertions
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Not found' });
        });

    });

    // 6. deleteScorecard

});