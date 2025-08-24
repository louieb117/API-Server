const reqUserID = 'mockUserId';
const reqUserName = 'testUser';
const reqProfileID = 'testUser';

// Mock data for testing
const mockUserId = '68101f14af912a4fc8d69fe7';
const mockUserName = 'peter.tester';
const mockProfileId = '68101f14af912a4fc8d6ds00';


const reqCreateProfile = {
    user_id: mockUserId,
    onlineStatus: true,
    profilePicture: 'http://example.com/profile.jpg',
    bio: 'This is a test bio',
    location: 'Test City',
    fullName: 'Test User',
    myScorecards: [],
    otherScorecards: [],
    groups: [],
    friends: [],
    preferences: {
        theme: 'light',
        notifications: true,
        language: 'en',
        privacy: {
            profileVisibility: 'public',
            dataSharing: true
        }
    },
};

const reqUpdateProfile = {
    bio: 'This is an updated test bio',
};


const mockProfileResponse = {
    _id: mockProfileId,
    user_id: mockUserId,
    onlineStatus: true,
    profilePicture: 'http://example.com/profile.jpg',
    bio: 'This is a test bio',
    location: 'Test City',
    fullName: 'Test User',
    myScorecards: [],
    otherScorecards: [],
    groups: [],
    friends: [],
    preferences: {
        theme: 'light',
        notifications: true,
        language: 'en',
        privacy: {
            profileVisibility: 'public',
            dataSharing: true
        }
    },
};

module.exports = {
    reqCreateProfile,
    reqUpdateProfile,
    reqProfileID,
    reqUserID,
    reqUserName,
    mockUserId,
    mockUserName,
    mockProfileId,
    mockProfileResponse
};