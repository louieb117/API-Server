// Validators under test
const {
    validateProfileInDatabase,
    validateProfileNOTInDatabase,
    validateProfileCreationInput,
    validateProfileUpdateInput,
    validateProfileUserID,
    validateProfileOnlineStatus,
    validateProfilePicture,
    validateProfileBio,
    validateProfileLocation,
    validateProfileFullName,
    validateProfileMyScorecards,
    validateProfileOtherScorecards,
    validateProfileGroup,
    validateProfileFriends,
    validateProfilePreferences,

} = require('../../../Middleware/validators/profileValidator.js');

// Test data
const { } = require("../../../utils/data/profile.test.data.js");

// Mocks
const Profile = require('../../../models/profile.js');
jest.mock('../../../models/profile.js', () => ({
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
}));

jest.mock('../../../middlewares/validators/libraries/profile.js', () => {
    const original = jest.requireActual('../../../middlewares/validators/libraries/profile.js');
    return {
        ...original,
        validateProfileInDatabase: jest.fn(),
        validateProfileNOTInDatabase: jest.fn(),
        validateProfileCreationInput: jest.fn(),
        validateProfileUpdateInput: jest.fn(),
        validateProfileUserID: jest.fn(),
        validateProfileOnlineStatus: jest.fn(),
        validateProfilePicture: jest.fn(),
        validateProfileBio: jest.fn(),
        validateProfileLocation: jest.fn(),
        validateProfileFullName: jest.fn(),
        validateProfileMyScorecards: jest.fn(),
        validateProfileOtherScorecards: jest.fn(),
        validateProfileGroup: jest.fn(),
        validateProfileFriends: jest.fn(),
        validateProfilePreferences: jest.fn(),
    };
});

afterEach(() => {
    jest.restoreAllMocks();
});

// Test suite for profile validators
describe('Profile Creation Validators', () => {

    describe('1. validateProfileInDatabase', () => {
        test('should call the original function', () => {
            const profileData = { id: '123' };
            validateProfileInDatabase(profileData);
            expect(validateProfileInDatabase).toHaveBeenCalledWith(profileData);
        });
    });

    // test('validateProfileNOTInDatabase should call the original function', () => {
    //     const profileData = { id: '123' };
    //     validateProfileNOTInDatabase(profileData);
    //     expect(validateProfileNOTInDatabase).toHaveBeenCalledWith(profileData);
    // });

    // test('validateProfileCreationInput should call the original function', () => {
    //     const profileData = { id: '123' };
    //     validateProfileCreationInput(profileData);
    //     expect(validateProfileCreationInput).toHaveBeenCalledWith(profileData);
    // });

    // test('validateProfileUpdateInput should call the original function', () => {
    //     const profileData = { id: '123' };
    //     validateProfileUpdateInput(profileData);
    //     expect(validateProfileUpdateInput).toHaveBeenCalledWith(profileData);
    // });

    // test('validateProfileUserID should call the original function', () => {
    //     const profileData = { id: '123' };
    //     validateProfileUserID(profileData);
    //     expect(validateProfileUserID).toHaveBeenCalledWith(profileData);
    // });

    // test('validateProfileOnlineStatus should call the original function', () => {
    //     const profileData = { id: '123' };
    //     validateProfileOnlineStatus(profileData);
    //     expect(validateProfileOnlineStatus).toHaveBeenCalledWith(profileData);
    // });

    // test('validateProfilePicture should call the original function', () => {
    //     const profileData = { id: '123' };
    //     validateProfilePicture(profileData);
    //     expect(validateProfilePicture).toHaveBeenCalledWith(profileData);
    // });

    // test('validateProfileBio should call the original function', () => {
    //     const profileData = { id: '123' };
    //     validateProfileBio(profileData);
    //     expect(validateProfileBio).toHaveBeenCalledWith(profileData);
    // });

    // test('validateProfileLocation should call the original function', () => {
    //     const profileData = { id: '123' };
    //     validateProfileLocation(profileData);
    //     expect(validateProfileLocation).toHaveBeenCalledWith(profileData);
    // });

    // test('validateProfileFullName should call the original function', () => {
    //     const profileData = { id: '123' };
    //     validateProfileFullName(profileData);
    //     expect(validateProfileFullName).toHaveBeenCalledWith(profileData);
    // });

    // test('validateProfileMyScorecards should call the original function', () => {
    //     const profileData = { id: '123' };
    //     validateProfileMyScorecards(profileData);
    //     expect(validateProfileMyScorecards).toHaveBeenCalledWith(profileData);
    // });

    // test('validateProfileOtherScorecards should call the original function', () => {
    //     const profileData = { id: '123' };
    //     validateProfileOtherScorecards(profileData);
    //     expect(validateProfileOtherScorecards).toHaveBeenCalledWith(profileData);
    // });

    // test('validateProfileGroup should call the original function', () => {
    //     const profileData = { id: '123' };
    //     validateProfileGroup(profileData);
    //     expect(validateProfileGroup).toHaveBeenCalledWith(profileData);
    // });

    // test('validateProfileFriends should call the original function', () => {
    //     const profileData = { id: '123' };
    //     validateProfileFriends(profileData);
    //     expect(validateProfileFriends).toHaveBeenCalledWith(profileData);
    // });

    // test('validateProfilePreferences should call the original function', () => {
    //     const profileData = { id: '123' };
    //     validateProfilePreferences(profileData);
    //     expect(validateProfilePreferences).toHaveBeenCalledWith(profileData);
    // });
});