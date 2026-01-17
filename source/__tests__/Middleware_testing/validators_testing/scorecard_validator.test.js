// Functions under test:
const {
    validateScorecardDataInput,
    validateScorecardCreationInput,
    validateScorecardUpdateInput
} = require('../../../middlewares/validators/scorecardValidators.js');

// Test data:
const { 
    reqScorecardID,
    reqCreateBody_c_1
} = require('../../../utils/data/scorecard.test.data.js');

// Mocks:
const lib = require('../../../middlewares/validators/libraries/scorecard.lib.js');
jest.mock('../../../middlewares/validators/libraries/scorecard.lib.js', () => ({
    validateScorecardInDatabase: jest.fn(),
    validateScorecardNotInDatabase: jest.fn(),
    validateScorecardCreator: jest.fn(),
    validateScorecardHoleSelection: jest.fn(),
    validateScorecardCourse: jest.fn(),
    validateScorecardDate: jest.fn(),
    validateScorecardPlayers: jest.fn(),
    validateScorecardScoresCreate: jest.fn(),
    validateScorecardScoresUpdate: jest.fn(),
    validateScorecardDataInput: jest.fn(),
    validateScorecardCreationInput: jest.fn()
}));

// Test suite for Scorecard Validators 
describe('Scorecard Validators Testing', () => {
    // 1. validateScorecardDataInput
    describe('validateScorecardDataInput', () => {
        // Test: Valid data input
        test('should return isValid=true for valid data', async () => {
            lib.validateScorecardCreator.mockResolvedValue({ isValid: true });
            lib.validateScorecardHoleSelection.mockResolvedValue({ isValid: true });
            lib.validateScorecardCourse.mockResolvedValue({ isValid: true });
            lib.validateScorecardPlayers.mockResolvedValue({ isValid: true });
            lib.validateScorecardDate.mockResolvedValue({ isValid: true });
            lib.validateScorecardScoresCreate.mockResolvedValue({ isValid: true });
            lib.validateScorecardScoresUpdate.mockResolvedValue({ isValid: true });
            const result = await validateScorecardDataInput(reqCreateBody_c_1);
            expect(result.isValid).toBe(true);
        });
        // Test: Invalid data input
        test('should return isValid=false for invalid data', async () => {
            const result = await validateScorecardDataInput(null);
            expect(result.isValid).toBe(false);
        });
    });

    // 2. validateScorecardCreationInput
    describe('validateScorecardCreationInput', () => {
        // Test: Valid input should pass
        test('should return isValid=true for valid input', async () => {
            lib.validateScorecardCreator.mockResolvedValue({ isValid: true });
            lib.validateScorecardHoleSelection.mockResolvedValue({ isValid: true });
            lib.validateScorecardCourse.mockResolvedValue({ isValid: true });
            lib.validateScorecardPlayers.mockResolvedValue({ isValid: true });
            lib.validateScorecardDate.mockResolvedValue({ isValid: true });
            lib.validateScorecardScoresCreate.mockResolvedValue({ isValid: true });
            const result = await validateScorecardCreationInput(reqCreateBody_c_1);
            expect(result.isValid).toBe(true);
        });
        // Test: Missing required field should fail
        test('should return isValid=false for missing required fields', async () => {
            const result = await validateScorecardCreationInput(null);
            expect(result.isValid).toBe(false);
        });
        // Possible ideas: test invalid types, extra fields, etc.
    });

    // 3. validateScorecardUpdateInput
    describe('validateScorecardUpdateInput', () => {
        // Test: Valid update input
        test('should return isValid=true for valid update input', async () => {
            lib.validateScorecardCreator.mockResolvedValue({ isValid: true });
            lib.validateScorecardHoleSelection.mockResolvedValue({ isValid: true });
            lib.validateScorecardCourse.mockResolvedValue({ isValid: true });
            lib.validateScorecardPlayers.mockResolvedValue({ isValid: true });
            lib.validateScorecardDate.mockResolvedValue({ isValid: true });
            lib.validateScorecardScoresUpdate.mockResolvedValue({ isValid: true });
            const result = await validateScorecardUpdateInput(reqCreateBody_c_1, reqScorecardID);
            expect(result.isValid).toBe(true);
        });
        // Test: Invalid update input
        test('should return isValid=false for invalid update input', async () => {
            const result = await validateScorecardUpdateInput(null);
            expect(result.isValid).toBe(false);
        });
        // Possible ideas: test partial updates, forbidden fields, etc.
    });

});