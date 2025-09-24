// Validators under test
const {
    // validateSettingsDataInput,
    validateSettingsInDatabase,
    validateSettingsUpdate
} = require('../../../middlewares/validators/settingsValidators.js'); 

// Test data
const { mockSettingsID, mockSettingsResponse } = require('../../../utils/data/settings.mock.data.js');

// Mocks
jest.mock('../../../models/settings.js', () => ({ 
        findById: jest.fn(),  
})); 
const Settings = require('../../../models/settings.js');

afterEach(() => {
    jest.clearAllMocks();
});

// Test suite for settings validators
describe("\nSettings Validators\n", () => {

    // Test validateSettingsInDatabase
    describe("1. validateSettingsInDatabase", () => {
        test("should return isValid=false if settings_id is not provided", async () => {
            const result = await validateSettingsInDatabase();
            expect(result.isValid).toBe(false);
            expect(result.message).toBe("Settings ID is required");
        });

        test("should return isValid=false if settings_id format is incorrect", async () => {
            const result = await validateSettingsInDatabase("12345");
            expect(result.isValid).toBe(false);
            expect(result.message).toBe("Invalid Settings ID format");
        });

        test("should return isValid=false if settings not found in database", async () => {
            Settings.findById.mockResolvedValue(null);
            const result = await validateSettingsInDatabase(mockSettingsID);
            // expect(Settings.findById).toHaveBeenCalledWith(mockSettingsID);
            expect(result.isValid).toBe(false);
            expect(result.message).toBe("Settings not found in the database");
        }); 

        test("should return isValid=true if settings found in database", async () => {
            Settings.findById.mockResolvedValue( mockSettingsResponse );
            const result = await validateSettingsInDatabase( mockSettingsID );  
            expect(result.isValid).toBe(true); 
            expect(result.message).toBe("Settings found in the database"); 
        });
    }); 

    // Test validateSettingsUpdate
    describe("6. validateSettingsUpdate", () => {  
        test("should return isValid=false if any field is invalid", async () => {
            const result = await validateSettingsUpdate({ theme: "blue", notifications: true });
            expect(result.isValid).toBe(false);
            expect(result.message).toBe("Invalid theme. Valid options are: light, dark, system");
        });

        test("should return isValid=true if all provided fields are valid", async () => {
            const result = await validateSettingsUpdate({
                theme: "dark",
                notifications: false,
                language: "fr",
                privacy: { profileVisibility: "friends", dataSharing: true }
            });
            expect(result.isValid).toBe(true);
            expect(result.message).toBe("All settings successfully updated");
        });
    });
});