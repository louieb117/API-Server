// Validators under test
const { 
    validateTheme,
    validateNotifications, 
    validateLanguage,
    validatePrivacy,  
} = require('../../../../middlewares/validators/libraries/settings.lib.js'); 

// Mocks
const Settings = require('../../../../models/settings.js');
jest.mock('../../../../models/settings.js', () => {
    return {
        findById: jest.fn(), 
    };
}); 

afterEach(() => {
    jest.clearAllMocks();
});

// Test suite for settings validators
describe("\nSettings Lib Tests\n", () => {

    // Test validateTheme
    describe("1. validateTheme", () => {
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
    describe("2. validateNotifications", () => {
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
    describe("3. validateLanguage", () => {
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
    describe("4. validatePrivacy", () => {
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
});