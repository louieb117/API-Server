// Functions under test:
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
} = require('../../../../middlewares/validators/libraries/scorecard.lib.js');

// Test data:
const { 
    reqScorecardID,
    reqCreateScorecardBody,
    reqCreateBody_c_1,
    reqCreateBody_ic_HS_1,
    reqCreateBody_ic_HS_2,
    reqCreateBody_ic_C_1,
    reqCreateBody_ic_P_1,
    reqCreateBody_ic_SC_1,
    reqCreateBody_ic_SC_2,
    reqCreateBody_ic_SU_1,
    reqCreateBody_ic_SU_2
} = require('../../../../utils/data/scorecard.test.data.js');

const { mockSocrecardGetResponse01 } = require('../../../../utils/data/scorecard.mock.data.js');

// Mocks:
const Scorecard = require("../../../../models/scorecard.js");

jest.mock('../../../../models/scorecard', () => ({
    findById: jest.fn(),
}));


// Test suite for Scorecard Validatiors library
describe('Scorecard Validatiors library Testing', () => {
    // 1. validateScorecardInDatabase
    describe('validateScorecardInDatabase', () => {
        beforeEach(() => jest.clearAllMocks());
        // Test: Scorecard exists in DB
        test('should return isValid=true if scorecard exists', async () => {
            Scorecard.findById.mockResolvedValue(mockSocrecardGetResponse01);
            const result = await validateScorecardInDatabase(reqScorecardID);
            expect(result.isValid).toBe(true);
        });
        // Test: Scorecard does not exist
        test('should return isValid=false if scorecard does not exist', async () => {
            Scorecard.findById.mockResolvedValue(null);
            const result = await validateScorecardInDatabase(reqScorecardID);
            expect(result.isValid).toBe(false);
        });
    });

    // 2. validateScorecardNotInDatabase
    describe('validateScorecardNotInDatabase', () => {
        beforeEach(() => jest.clearAllMocks());
        // Test: Scorecard does not exist in DB
        test('should return isValid=true if scorecard does not exist', async () => {
            Scorecard.findById.mockResolvedValue(null);
            const result = await validateScorecardNotInDatabase(reqScorecardID);
            expect(result.isValid).toBe(true);
        });
        // Test: Scorecard exists in DB
        test('should return isValid=false if scorecard exists', async () => {
            Scorecard.findById.mockResolvedValue(mockSocrecardGetResponse01);
            const result = await validateScorecardNotInDatabase(reqScorecardID);
            expect(result.isValid).toBe(false);
        });
    });

    // 3. validateScorecardCreator
    describe('validateScorecardCreator', () => {
        // Test: Valid creator
        test('should return isValid=true for valid creator', async () => {
            Scorecard.findById.mockResolvedValue(mockSocrecardGetResponse01);
            const result = await validateScorecardCreator(reqCreateScorecardBody);
            expect(result.isValid).toBe(true);
        });
        // Test: Invalid creator
        test('should return isValid=false for invalid creator', async () => {
            Scorecard.findById.mockResolvedValue(null);
            const result = await validateScorecardCreator(reqCreateScorecardBody);
            expect(result.isValid).toBe(false);
        });
    });

    // 4. validateScorecardHoleSelection
    describe('validateScorecardHoleSelection', () => {
        // Test: Valid hole selection
        test('should return isValid=true for valid hole selection', async () => {
            const result = await validateScorecardHoleSelection(reqCreateScorecardBody);
            expect(result.isValid).toBe(true);
        });
        // Test: Invalid hole selection / out of range / lower than 9
        test('should return isValid=false for invalid hole selection that is lower than 9', async () => {
            const result = await validateScorecardHoleSelection(reqCreateBody_ic_HS_1);
            expect(result.isValid).toBe(false);
        });
        // Test: Invalid hole selection / out of range / higher than 18
        test('should return isValid=false for invalid hole selection that is higher than 18', async () => {
            const result = await validateScorecardHoleSelection(reqCreateBody_ic_HS_2);
            expect(result.isValid).toBe(false);
        });
        // Test: Invalid hole selection / out of range / empty
        test('should return isValid=false for invalid hole selection that is empty', async () => {
            const result = await validateScorecardHoleSelection({ holeSelection: '' });
            expect(result.isValid).toBe(false);
        });
        // Test: Invalid hole selection / out of range / null
        test('should return isValid=false for invalid hole selection that is null', async () => {
            const result = await validateScorecardHoleSelection({ holeSelection: null });
            expect(result.isValid).toBe(false);
        });
        // Test: Invalid hole selection / out of range / undefined
        // test('should return isValid=false for invalid hole selection that is undefined', async () => {
        //     const result = await validateScorecardHoleSelection({ holeSelection: undefined });
        //     expect(result.isValid).toBe(false);
        // });
    });

    // 5. validateScorecardCourse
    describe('validateScorecardCourse', () => {
        // Test: Valid course
        test('should return isValid=true for valid course', async () => {
            const result = await validateScorecardCourse(reqCreateScorecardBody);
            expect(result.isValid).toBe(true);
        });
        // Test: Invalid course / out of range / too short
        test('should return isValid=false for invalid course that is too short', async () => {
            const result = await validateScorecardCourse(reqCreateBody_ic_C_1);
            expect(result.isValid).toBe(false);
        });
        // Test: Invalid course / out of range / too long
        test('should return isValid=false for invalid course that is too long', async () => {
            const result = await validateScorecardCourse(reqCreateBody_ic_C_1);
            expect(result.isValid).toBe(false);
        });
        // Test: Invalid course / empty
        test('should return isValid=false for invalid course that is empty', async () => {
            const result = await validateScorecardCourse({ course: '' });
            expect(result.isValid).toBe(false);
        });
        // Test: Invalid course / null
        test('should return isValid=false for invalid course that is null', async () => {
            const result = await validateScorecardCourse({ course: null });
            expect(result.isValid).toBe(false);
        });
        // Test: Invalid course / undefined
        test('should return isValid=false for invalid course that is undefined', async () => {
            const result = await validateScorecardCourse({ course: undefined });
            expect(result.isValid).toBe(false);
        });
        // Test: Invalid course / boolean
        // test('should return isValid=false for invalid course that is a boolean', async () => {
        //     const result = await validateScorecardCourse({ course: true });
        //     expect(result.isValid).toBe(false);
        // });
        // Test: Invalid course / object
        // test('should return isValid=false for invalid course that is an object', async () => {
        //     const result = await validateScorecardCourse({ course: {} });
        //     expect(result.isValid).toBe(false);
        // });
        // Test: Invalid course / array
        test('should return isValid=false for invalid course that is an array', async () => {
            const result = await validateScorecardCourse({ course: [] });
            expect(result.isValid).toBe(false);
        });
    });

    // // 6. validateScorecardDate
    // describe('validateScorecardDate', () => {
    //     // Test: Valid date
    //     test('should return isValid=true for valid date', () => {
    //         const validDate = { date: '2024-05-19' };
    //         const result = validateScorecardDate(validDate);
    //         expect(result.isValid).toBe(true);
    //     });
    //     // Test: Invalid date
    //     test('should return isValid=false for invalid date', () => {
    //         const invalidDate = { date: 'not-a-date' };
    //         const result = validateScorecardDate(invalidDate);
    //         expect(result.isValid).toBe(false);
    //     });
    // });

    // 7. validateScorecardPlayers
    describe('validateScorecardPlayers', () => {
        // Test: Valid players array
        test('should return isValid=true for valid players', async () => {
            const result = await validateScorecardPlayers(reqCreateScorecardBody);
            expect(result.isValid).toBe(true);
        });
        // Test: Invalid players array / Out of range / too short
        // test('should return isValid=false for not enought players', async () => {
        //     const result = await validateScorecardPlayers(reqCreateBody_ic_P_1);
        //     expect(result.isValid).toBe(false);
        // });
        test('should return isValid=false for empty players array', async () => {
            const result = await validateScorecardPlayers({ players: [] });
            expect(result.isValid).toBe(false);
        });
        // Test: Invalid players array / null
        test('should return isValid=false for null players array', async () => {
            const result = await validateScorecardPlayers({ players: null });
            expect(result.isValid).toBe(false);
        });
        // Test: Invalid players array / undefined
        test('should return isValid=false for undefined players array', async () => {
            const result = await validateScorecardPlayers({ players: undefined });
            expect(result.isValid).toBe(false);
        });
    });

    // 8. validateScorecardScoresCreate
    describe('validateScorecardScoresCreate', () => {
        // Test: Valid scores for creation
        test('should return isValid=true for valid scores', async () => {
            const result = await validateScorecardScoresCreate(reqCreateBody_c_1);
            expect(result.isValid).toBe(true);
        });
        // Test: Invalid scores for creation / scores are less than holeSelection
        test('should return isValid=false for invalid scores that are less than holeSelection', async () => {
            const result = await validateScorecardScoresCreate(reqCreateBody_ic_SC_1);
            expect(result.isValid).toBe(false);
        });
        // Test: Invalid scores for creation / scores are more than holeSelection
        test('should return isValid=false for invalid scores that are more than holeSelection', async () => {
            const result = await validateScorecardScoresCreate(reqCreateBody_ic_SC_2);
            expect(result.isValid).toBe(false);
        });
        // Test: Invalid scores for creation / empty
        test('should return isValid=false for empty scores', async () => {
            const result = await validateScorecardScoresCreate({ scores: [] });
            expect(result.isValid).toBe(false);
        });
        // Test: Invalid scores for creation / null
        // test('should return isValid=false for null scores', async () => {
        //     const result = await validateScorefindByIdcardScoresCreate({ scores: null });
        //     expect(result.isValid).toBe(false);
        // });
        // Test: Invalid scores for creation / undefined
        test('should return isValid=false for undefined scores', async () => {
            const result = await validateScorecardScoresCreate({ scores: undefined });
            expect(result.isValid).toBe(false);
        }); 

    });

    // 9. validateScorecardScoresUpdate
    describe('validateScorecardScoresUpdate', () => {
        // Test: Valid scores for update
        test('should return isValid=true for valid update scores', async () => {
            Scorecard.findById.mockResolvedValue(mockSocrecardGetResponse01);
            const result = await validateScorecardScoresUpdate(reqCreateBody_c_1, reqScorecardID);
            expect(result.isValid).toBe(true);
        });
        // Test: Invalid scores for update / scores are less than holeSelection
        // test('should return isValid=false for invalid update scores that are less than holeSelection', async () => {
        //     Scorecard.findById.mockResolvedValue(mockSocrecardGetResponse01);
        //     const result = await validateScorecardScoresUpdate(reqCreateBody_ic_SU_1, reqScorecardID);
        //     expect(result.isValid).toBe(false);
        // });
        // Test: Invalid scores for update / scores are more than holeSelection
        // test('should return isValid=false for invalid update scores that are more than holeSelection', async () => {
        //     Scorecard.findById.mockResolvedValue(mockSocrecardGetResponse01);            
        //     const result = await validateScorecardScoresUpdate(reqCreateBody_ic_SU_2, reqScorecardID);
        //     expect(result.isValid).toBe(false);
        // });
        // Test: Invalid scores for update / holeSelection is not provided
        // test('should return isValid=false for invalid update scores that are not provided', async () => {
        //     Scorecard.findById.mockResolvedValue(mockSocrecardGetResponse01);
        //     const result = await validateScorecardScoresUpdate({ scores: [4, 4, 4] }, reqScorecardID);
        //     expect(result.isValid).toBe(false);
        // });
        // Test: Invalid scores for update / scores is not provided
        test('should return isValid=false for invalid update scores that are not provided', async () => {
            Scorecard.findById.mockResolvedValue(mockSocrecardGetResponse01);
            const result = await validateScorecardScoresUpdate({ holeSelection: 9 }, reqScorecardID);
            expect(result.isValid).toBe(false);
        });
        // Test: Invalid scores for update / empty
        // test('should return isValid=false for invalid update scores that are empty', async () => {
        //     Scorecard.findById.mockResolvedValue(mockSocrecardGetResponse01);
        //     const result = await validateScorecardScScorecardoresUpdate({ holeSelection: 0, scores: [] }, reqScorecardID);
        //     expect(result.isValid).toBe(false);
        // });
        // Test: Invalid scores for update / null
        test('should return isValid=false for invalid update scores that are null', async () => {
            Scorecard.findById.mockResolvedValue(mockSocrecardGetResponse01);
            const result = await validateScorecardScoresUpdate({ holeSelection: null, scores: null }, reqScorecardID);
            expect(result.isValid).toBe(false);
        });
        // Test: Invalid scores for update / undefined
        test('should return isValid=false for invalid update scores that are undefined', async () => {
            Scorecard.findById.mockResolvedValue(mockSocrecardGetResponse01);
            const result = await validateScorecardScoresUpdate({ holeSelection: undefined, scores: undefined }, reqScorecardID);
            expect(result.isValid).toBe(false);
        });
    });


});

/*
    --- Template & Test Ideas ---
    For each function:
    - Test valid input (should return isValid=true)
    - Test invalid input (should return isValid=false)
    - Add more cases as needed: missing fields, wrong types, edge cases, etc.
    - Use mock data or fixtures for complex objects.
*/