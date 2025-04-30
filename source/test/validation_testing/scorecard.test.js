import supertest from 'supertest';

import {
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
} from '../middlewares/validators/scorecardValidators.js';

describe('Scorecard Validation', () => {
    let request;
    let app;

    beforeAll(() => {
        app = require('../../index.js'); // Adjust the path as necessary
        request = supertest(app);
    });



    test('Validate Scorecard Not In Database', async () => {
        const body = {
            creator: '12345',
            holeSelection: 'front9',
            course: 'Pebble Beach',
            date: '2023-10-01',
            players: ['Player1', 'Player2'],
            scores: [70, 72]
        };

        const result = await validateScorecardNotInDatabase(body);
        expect(result.isValid).toBe(true);
    });

    test('Validate Scorecard In Database', async () => {
        const id = '12345';
        const result = await validateScorecardInDatabase(id);
        expect(result.isValid).toBe(true);
    });

    test('Validate Scorecard Update Input', async () => {
        const body = {
            holeSelection: 'back9',
            course: 'Pebble Beach',
            date: '2023-10-01',
            players: ['Player1', 'Player2'],
            scores: [70, 72]
        };

        const id = '12345';
        const result = await validateScorecardUpdateInput(body, id);
        expect(result.isValid).toBe(true);
    });

    test('Validate Scorecard Creation Input', async () => {
        const body = {
            holeSelection: 9,
            course: "Test Course 009",
            date: "{{$Timestamp}}",
            players: ["Fin.tester", "jesus.tester", "Roboto.tester", "john.tester"],
            scores: 
            {
              "Roboto.tester": [4, 4, 4, 4, 4, 4, 4, 4, 4],
              "jesus.tester": [4, 4, 4, 4, 4, 4, 4, 4, 4],
              "peter.tester": [4, 4, 4, 4, 4, 4, 4, 4, 4],
              "john.tester": [4, 4, 4, 4, 4, 4, 4, 4, 4]
            }
        };

        const result = await validateScorecardCreationInput(body);
        expect(result.isValid).toBe(true);
    });
    
});
