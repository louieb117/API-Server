// Validators under test
const {
    validateSettingsInDatabase,
    validateTheme,
    validateNotifications, 
    validateLanguage,
    validatePrivacy, 
    validateSettingsUpdate
} = require('../../../middlewares/validators/settingsValidators.js'); 

// Mocks
const Settings = require('../../../models/settings.js');
jest.mock('../../../models/settings.js', () => {
    return {
        findById: jest.fn(), 
    };
}); 

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
            const result = await validateSettingsInDatabase("64b7f0c8e4b0f5a1c2d3e4f5");
            expect(Settings.findById).toHaveBeenCalledWith("64b7f0c8e4b0f5a1c2d3e4f5");
            expect(result.isValid).toBe(false);
            expect(result.message).toBe("Settings not found in the database");
        }); 

        test("should return isValid=true if settings found in database", async () => {
            Settings.findById.mockResolvedValue('64b7f0c8e4b0f5a1c2d3e4f5');
            const result = await validateSettingsInDatabase('64b7f0c8e4b0f5a1c2d3e4f5'); 
            expect(result.isValid).toBe(true);
            expect(result.message).toBe("Settings found in the database");
            expect(result.settings).toEqual('64b7f0c8e4b0f5a1c2d3e4f5');
        });
    });

    // Test validateTheme
    describe("2. validateTheme", () => {
        test("should return isValid=false for invalid theme", () => {
            const result = validateTheme("blue");
            expect(result.isValid).toBe(false);
            expect(result.message).toBe("Invalid theme. Valid options are: light, dark, system");
        });

        test("should return isValid=true for valid theme", () => {
            const result = validateTheme("dark");
            expect(result.isValid).toBe(true);
            expect(result.message).toBe("Theme successfully validated");
        });
    });

    // Test validateNotifications
    describe("3. validateNotifications", () => {
        test("should return isValid=false for non-boolean notifications", () => {
            const result = validateNotifications("yes");
            expect(result.isValid).toBe(false);
            expect(result.message).toBe("Notifications must be a boolean value.");
        });

        test("should return isValid=true for boolean notifications", () => {
            const result = validateNotifications(true);
            expect(result.isValid).toBe(true);
            expect(result.message).toBe("Notifications setting successfully validated");
        });
    });

    // Test validateLanguage
    describe("4. validateLanguage", () => {
        test("should return isValid=false for invalid language", () => {
            const result = validateLanguage("it");
            expect(result.isValid).toBe(false);
            expect(result.message).toBe("Invalid language. Valid options are: en, es, fr, de, zh");
        });

        test("should return isValid=true for valid language", () => {
            const result = validateLanguage("fr");
            expect(result.isValid).toBe(true);
            expect(result.message).toBe("Language successfully validated");
        });
    });

    // Test validatePrivacy
    describe("5. validatePrivacy", () => {
        test("should return isValid=false for invalid profileVisibility", () => {
            const result = validatePrivacy({ profileVisibility: "everyone", dataSharing: true });
            expect(result.isValid).toBe(false);
            expect(result.message).toBe("Invalid profileVisibility. Valid options: public, friends, private");
        });

        test("should return isValid=false for non-boolean dataSharing", () => {
            const result = validatePrivacy({ profileVisibility: "public", dataSharing: "yes" });
            expect(result.isValid).toBe(false);
            expect(result.message).toBe("dataSharing must be a boolean (true/false)");
        });

        test("should return isValid=true for valid privacy settings", () => {
            const result = validatePrivacy({ profileVisibility: "friends", dataSharing: false });
            expect(result.isValid).toBe(true);
            expect(result.message).toBe("Privacy settings successfully validated");
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