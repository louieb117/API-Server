// const request = require('supertest');
// let app; // Use `let` instead of `const`
// let request; // Use `let` for `request` as well

const app = require('../../index.js'); // Import the main app
// const db = require('../config/database.js'); // Import the database connection
const request = require('supertest'); // Import supertest

// const agent = request.agent(app); // Create a supertest agent with the app instance

require('dotenv').config();
const Scorecard = require("../../models/scorecard");
const { reqScorecardID } = require('../../utils/data/scorecard.test.data.js');
const { mockSocrecardResponse01 } = require('../../utils/data/scorecard.mock.data.js'); 
const {
    validateScorecardCreationInput,
    validateScorecardInDatabase,
    validateScorecardNotInDatabase,
    validateScorecardUpdateInput,
    validateScorecardDataInput,
    validateScorecardHoleSelection,
    validateScorecardCourse,
    validateScorecardDate,
    validateScorecardPlayers,
    validateScorecardScoresCreate,
    validateScorecardScoresUpdate,
    validateScorecardCreator
} =  require('../../middlewares/validators/scorecardValidators.js');

// beforeAll(async () => {
//     await db.connect(); // Connect to the in-memory database
// }
// );
// afterAll(async () => {
//     await db.closeDatabase(); // Close the in-memory database
// }
// );
// afterEach(async () => {
//     await db.clearDatabase(); // Clear the database after each test
// }
// );

// Mock the Scorecard module
jest.mock('../../models/scorecard', () => ({
    findById: jest.fn(),
}));

describe('Scorecard Validation Logic', () => {
    // describe('Server and Database Setup', () => {

    //     test('Server is running', async () => {
    //         const response = await agent.get('/api');
    //         expect(response.status).toBe(200);
    //     });

    //     test('Database connection', async () => {
    //         expect(db.readyState).toBe(1); // 1 means connected
    //     });
    // });

    test('Validate Scorecard Not In Database', async () => {
        const id = reqScorecardID;
        Scorecard.findById.mockResolvedValue(null); // Mocking the database call to return null
        const result = await validateScorecardNotInDatabase(id);
        console.log('Validation message:', result.message);
        expect(result.isValid).toBe(true);
    });

    test('Validate Scorecard In Database', async () => {
        const id = reqScorecardID;
        Scorecard.findById.mockResolvedValue(mockSocrecardResponse01); // Mocking the database call to return a scorecard
        const result = await validateScorecardInDatabase(id);
        expect(result.isValid).toBe(true);
    });
    
});
