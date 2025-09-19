// Functions under test:
const {
    validateProfileDataInput,
    validateProfileCreationInput,
    validateProfileUpdateInput
} = require('../../../middlewares/validators/profileValidators');

// Test data:
const { 
    reqProfileID,
    reqCreateProfile,
    reqUpdateProfile
} = require('../../../utils/data/profile.test.data.js');

// Mocks:
const lib = require('../../../middlewares/validators/libraries/profile.lib.js');
jest.mock('../../../middlewares/validators/libraries/profile.lib.js', () => ({
    validateProfileInDatabase: jest.fn(),
    validateProfileNotInDatabase: jest.fn(),
    validateProfileUserID: jest.fn(),
    validateProfileSettingsID: jest.fn(),
    validateProfileOnlineStatus: jest.fn(),
    validateProfilePicture: jest.fn(),
    validateProfileBio: jest.fn(),
    validateProfileLocation: jest.fn(),
    validateProfileFullName: jest.fn(),
    validateProfileMyScorecards: jest.fn(),
    validateProfileOtherScorecards: jest.fn(),
    validateProfileGroups: jest.fn(),
    validateProfileFriends: jest.fn(),
    validateProfileDataInput: jest.fn(),
    validateProfileCreationInput: jest.fn()
}));

// Test suite for Profile Validators 
describe('Profile Validators Testing', () => {
    // 1. validateProfileDataInput
    describe('validateProfileDataInput', () => {
        // Test: Valid data input
        test('should return isValid=true for valid data', async () => {
            lib.validateProfileUserID.mockResolvedValue({ isValid: true });
            lib.validateProfileSettingsID.mockResolvedValue({ isValid: true });
            lib.validateProfileOnlineStatus.mockResolvedValue({ isValid: true });
            lib.validateProfilePicture.mockResolvedValue({ isValid: true });
            lib.validateProfileBio.mockResolvedValue({ isValid: true });
            lib.validateProfileLocation.mockResolvedValue({ isValid: true });
            lib.validateProfileFullName.mockResolvedValue({ isValid: true });
            lib.validateProfileMyScorecards.mockResolvedValue({ isValid: true });
            lib.validateProfileOtherScorecards.mockResolvedValue({ isValid: true });
            lib.validateProfileGroups.mockResolvedValue({ isValid: true });
            lib.validateProfileFriends.mockResolvedValue({ isValid: true });
            const result = await validateProfileDataInput(reqCreateProfile);
            expect(result.isValid).toBe(true);
        });
        // Test: Invalid data input
        test('should return isValid=false for invalid data', async () => {
            const result = await validateProfileDataInput(null);
            expect(result.isValid).toBe(false);
        });
    });

    // 2. validateProfileCreationInput
    describe('validateProfileCreationInput', () => {
        // Test: Valid input should pass
        test('should return isValid=true for valid input', async () => {
            lib.validateProfileNotInDatabase.mockResolvedValue({ isValid: true });
            lib.validateProfileUserID.mockResolvedValue({ isValid: true });
            lib.validateProfileSettingsID.mockResolvedValue({ isValid: true });
            lib.validateProfileOnlineStatus.mockResolvedValue({ isValid: true });
            lib.validateProfilePicture.mockResolvedValue({ isValid: true });
            lib.validateProfileBio.mockResolvedValue({ isValid: true });
            lib.validateProfileLocation.mockResolvedValue({ isValid: true });
            lib.validateProfileFullName.mockResolvedValue({ isValid: true });
            lib.validateProfileMyScorecards.mockResolvedValue({ isValid: true });
            lib.validateProfileOtherScorecards.mockResolvedValue({ isValid: true });
            lib.validateProfileGroups.mockResolvedValue({ isValid: true });
            lib.validateProfileFriends.mockResolvedValue({ isValid: true });
            const result = await validateProfileCreationInput(reqCreateProfile);
            expect(result.isValid).toBe(true);
        });
        // Test: Invalid input should fail
        test('should return isValid=false for invalid input', async () => {
            const result = await validateProfileCreationInput(null);
            expect(result.isValid).toBe(false);
        });
        // Possible ideas: test invalid types, extra fields, etc.
    });

    // 3. validateProfileUpdateInput
    describe('validateProfileUpdateInput', () => {
        // Test: Valid update input
        test('should return isValid=true for valid update input', async () => {
            lib.validateProfileInDatabase.mockResolvedValue({ isValid: true });
            lib.validateProfileUserID.mockResolvedValue({ isValid: true });
            lib.validateProfileSettingsID.mockResolvedValue({ isValid: true });
            lib.validateProfileOnlineStatus.mockResolvedValue({ isValid: true });
            lib.validateProfilePicture.mockResolvedValue({ isValid: true });
            lib.validateProfileBio.mockResolvedValue({ isValid: true });
            lib.validateProfileLocation.mockResolvedValue({ isValid: true });
            lib.validateProfileFullName.mockResolvedValue({ isValid: true });
            lib.validateProfileMyScorecards.mockResolvedValue({ isValid: true });
            lib.validateProfileOtherScorecards.mockResolvedValue({ isValid: true });
            lib.validateProfileGroups.mockResolvedValue({ isValid: true });
            lib.validateProfileFriends.mockResolvedValue({ isValid: true });
            const result = await validateProfileUpdateInput(reqUpdateProfile, reqProfileID);
            expect(result.isValid).toBe(true);
        });
        // Test: Invalid update input
        test('should return isValid=false for invalid update input', async () => {
            const result = await validateProfileUpdateInput(null, null);
            expect(result.isValid).toBe(false);
        });
        // Possible ideas: test invalid types, extra fields, non-existent ID, etc.
    });
});