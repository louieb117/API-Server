// Validators under test
const {
    validateProfileInDatabase,
    validateProfileNOTInDatabase,
    validateProfileUserID,
    validateProfileSettingsID,
    validateProfileOnlineStatus,
    validateProfilePicture,
    validateProfileBio,
    validateProfileLocation,
    validateProfileFullName,
    validateProfileMyScorecards,
    validateProfileOtherScorecards,
    validateProfileGroups,
    validateProfileFriends,
} = require('../../../../middlewares/validators/libraries/profile.lib.js');

// Test data
const { 
    mockProfileId,
    mockProfileResponse,
    reqCreateProfile
} = require("../../../../utils/data/profile.test.data.js");

// Mocks
const Profile = require('../../../../models/profile.js');
jest.mock('../../../../models/profile.js', () => ({
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
}));

// Test suite for profile validators
describe('Profile Creation Validators', () => {

    describe('1. validateProfileInDatabase', () => {
        beforeEach(() => jest.clearAllMocks());

        test('should return isValid=true if profile exists', async() => {
            Profile.findById.mockResolvedValue(mockProfileResponse);
            const result = await validateProfileInDatabase(mockProfileId);
            expect(result.isValid).toBe(true);
        });
        
        test('should return error for invalid profile ID format', async() => {
            const result = await validateProfileInDatabase(null);
            expect(result.isValid).toBe(false);
            expect(result.message).toBe('Profile ID is required for validation.');
        });

        test('should return error for invalid profile ID length', async() => {
            const result = await validateProfileInDatabase('68101f14af912a');
            expect(result.isValid).toBe(false);
            expect(result.message).toBe('Invalid Profile ID format.');
        });

        test('should return error if profile not found in database', async() => {
            Profile.findById.mockResolvedValue(null);
            const result = await validateProfileInDatabase(mockProfileId);
            expect(result.isValid).toBe(false);
            expect(result.message).toBe('Profile not found in the database.');
        });
    });

    describe('2. validateProfileNOTInDatabase', () => {
        beforeEach(() => jest.clearAllMocks());

        test('should return isValid=true if profile does not exist', async() => {
            Profile.findById.mockResolvedValue(null);
            const result = await validateProfileNOTInDatabase(mockProfileId);
            expect(result.isValid).toBe(true);
        });
        
        test('should return error if profile already exists in database', async() => {
            Profile.findById.mockResolvedValue(mockProfileResponse);
            const result = await validateProfileNOTInDatabase(mockProfileId);
            expect(result.isValid).toBe(false);
            expect(result.message).toBe('Profile already exists');
        });
    });


    describe('3. validateProfileUserID', () => {
        beforeEach(() => jest.clearAllMocks());

        test('should return isValid=true for valid user_id', async() => {
            const result = await validateProfileUserID(reqCreateProfile);
            expect(result.isValid).toBe(true);
        });

        test('should return error for invalid user_id type', async() => {
            const body = { user_id: 1 };
            const result = await validateProfileUserID(body);
            expect(result.isValid).toBe(false);
            expect(result.message).toBe('Username must be a string.');
        });

        test('should return error for invalid user_id length', async() => {
            const body = { user_id: '68101f14af912a' };
            const result = await validateProfileUserID(body);
            expect(result.isValid).toBe(false);
            expect(result.message).toBe('Username must be a valid length.');
        });
    });

    describe('4. validateProfileSettingsID', () => {
        beforeEach(() => jest.clearAllMocks());

        test('should return isValid=true for valid settings_id', async() => {
            const body = { settings_id: '68101f14af912a4fc8d69dd5' };
            const result = await validateProfileSettingsID(body);
            expect(result.isValid).toBe(true);
        });

        test('should return error for invalid settings_id type', async() => {
            const body = { settings_id: 1 };
            const result = await validateProfileSettingsID(body);
            expect(result.isValid).toBe(false);
            expect(result.message).toBe('settings_id must be a string.');
        });

        test('should return error for invalid settings_id length', async() => {
            const body = { settings_id: '68101f14af912a' };
            const result = await validateProfileSettingsID(body);
            expect(result.isValid).toBe(false);
            expect(result.message).toBe('settings_id must be a valid length.');
        });
    });

    describe('5. validateProfileOnlineStatus', () => {
        beforeEach(() => jest.clearAllMocks());

        test('should return isValid=true for valid onlineStatus', async() => {
            const body = { onlineStatus: true };
            const result = await validateProfileOnlineStatus(body);
            expect(result.isValid).toBe(true);
        });
        
        test('should return error for non-boolean onlineStatus', async() => {
            const body = { onlineStatus: 'yes' };
            const result = await validateProfileOnlineStatus(body);
            expect(result.isValid).toBe(false);
            expect(result.message).toBe('onlineStatus must be a boolean.');
        });
    });

    describe('6. validateProfilePicture', () => {
        beforeEach(() => jest.clearAllMocks());

        test('should return isValid=true for valid profilePicture', async() => {
            const body = { profilePicture: 'http://example.com/profile.jpg' };
            const result = await validateProfilePicture(body);
            expect(result.isValid).toBe(true);
        });

        test('should return error for non-string profilePicture', async() => {
            const body = { profilePicture: 12345 };
            const result = await validateProfilePicture(body);
            expect(result.isValid).toBe(false);
            expect(result.message).toBe('profilePicture must be a string URL.');
        });

        test('should return error for invalid profilePicture URL format', async() => {
            const body = { profilePicture: 'ftp://example.com/profile.jpg' };
            const result = await validateProfilePicture(body);
            expect(result.isValid).toBe(false);
            expect(result.message).toBe('profilePicture must be a valid URL starting with http:// or https://');
        });
    });

    describe('7. validateProfileBio', () => {
        beforeEach(() => jest.clearAllMocks());

        test('should return isValid=true for valid bio', async() => {
            const body = { bio: 'This is a test bio' };
            const result = await validateProfileBio(body);
            expect(result.isValid).toBe(true);
        });

        test('should return error for non-string bio', async() => {
            const body = { bio: 12345 };
            const result = await validateProfileBio(body);
            expect(result.isValid).toBe(false);
            expect(result.message).toBe('bio must be a string.');
        });

        test('should return error for bio length less than 10 characters', async() => {
            const body = { bio: 'Too short' };
            const result = await validateProfileBio(body);
            expect(result.isValid).toBe(false);
            expect(result.message).toBe('bio must be between 10 and 150 characters.');
        });

        test('should return error for bio length greater than 150 characters', async() => {
            const body = { bio: 'A'.repeat(151) };
            const result = await validateProfileBio(body);
            expect(result.isValid).toBe(false);
            expect(result.message).toBe('bio must be between 10 and 150 characters.');
        });
    });

    describe('8. validateProfileLocation', () => {
        beforeEach(() => jest.clearAllMocks());

        test('should return isValid=true for valid location', async() => {
            const body = { location: 'New York, NY' };
            const result = await validateProfileLocation(body);
            expect(result.isValid).toBe(true);
        });

        test('should return error for non-string location', async() => {
            const body = { location: 12345 };
            const result = await validateProfileLocation(body);
            expect(result.isValid).toBe(false);
            expect(result.message).toBe('location must be a string.');
        });
    });

    describe('9. validateProfileFullName', () => {
        beforeEach(() => jest.clearAllMocks());

        test('should return isValid=true for valid fullName', async() => {
            const body = { fullName: 'John Doe' };
            const result = await validateProfileFullName(body);
            expect(result.isValid).toBe(true);
        });

        test('should return error for non-string fullName', async() => {
            const body = { fullName: 12345 };
            const result = await validateProfileFullName(body);
            expect(result.isValid).toBe(false);
            expect(result.message).toBe('fullName must be a string.');
        });
    });

    describe('10. validateProfileMyScorecards', () => {
        beforeEach(() => jest.clearAllMocks());

        test('should return isValid=true for valid myScorecards', async() => {
            const body = { myScorecards: ['scorecardID1', 'scorecardID2'] };
            const result = await validateProfileMyScorecards(body);
            expect(result.isValid).toBe(true);
        });

        test('should return error for non-array myScorecards', async() => {
            const body = { myScorecards: 'not-an-array' };
            const result = await validateProfileMyScorecards(body);
            expect(result.isValid).toBe(false);
            expect(result.message).toBe('myScorecards must be an array.');
        });
    });

    describe('11. validateProfileOtherScorecards', () => {
        beforeEach(() => jest.clearAllMocks());

        test('should return isValid=true for valid otherScorecards', async() => {
            const body = { otherScorecards: ['scorecardID1', 'scorecardID2'] };
            const result = await validateProfileOtherScorecards(body);
            expect(result.isValid).toBe(true);
        });

        test('should return error for non-array otherScorecards', async() => {
            const body = { otherScorecards: 'not-an-array' };
            const result = await validateProfileOtherScorecards(body);
            expect(result.isValid).toBe(false);
            expect(result.message).toBe('otherScorecards must be an array.');
        });
    });

    describe('12. validateProfileGroups', () => {
        beforeEach(() => jest.clearAllMocks());

        test('should return isValid=true for valid groups', async() => {
            const body = { groups: ['groupID1', 'groupID2'] };
            const result = await validateProfileGroups(body);
            expect(result.isValid).toBe(true);
        });

        test('should return error for non-array groups', async() => {
            const body = { groups: 'not-an-array' };
            const result = await validateProfileGroups(body);
            expect(result.isValid).toBe(false);
            expect(result.message).toBe('groups must be an array.');
        });
    });

    describe('13. validateProfileFriends', () => {
        beforeEach(() => jest.clearAllMocks());

        test('should return isValid=true for valid friends', async() => {
            const body = { friends: ['friendID1', 'friendID2'] };
            const result = await validateProfileFriends(body);
            expect(result.isValid).toBe(true);
        });

        test('should return error for non-array friends', async() => {
            const body = { friends: 'not-an-array' };
            const result = await validateProfileFriends(body);
            expect(result.isValid).toBe(false);
            expect(result.message).toBe('friends must be an array.');
        });
    });
});