const Profile = require('../../../models/profile.js');

const validateProfileInDatabase = async (profile_id) => {
    try {
        console.log('validateProfileInDatabase id', profile_id);
        if (!profile_id) {
            throw new Error('Profile ID is required for validation.');
        }
        if (profile_id.length !== 24) {
            throw new Error('Invalid Profile ID format.');
        }

        const profile = profile_id ? await Profile.findById(profile_id) : null;
        if (!profile) {
            throw new Error('Profile not found in the database.');
        }
        return { isValid: true, profile: profile, message: 'Profile exists in the database.' };
    } catch (error) {
        console.log('validateProfileInDatabase error:', error.message);
        return { isValid: false, profile: null, message: error.message };
    }
};

const validateProfileNOTInDatabase = async (profile_id) => {
    try {
        console.log('validateProfileNOTInDatabase > Input profile_id', profile_id);
        const profile = await Profile.findById(profile_id);
        console.log('validateProfileNOTInDatabase > profile found: ', profile);
        if (profile) {
            return {
                isValid: false,
                message: "Profile already exists"
            };        
        }
        return { isValid: true };
    } catch (error) {
        console.log('validateProfileNOTInDatabase error:', error.message);
        return { isValid: false, message: error.message };
    }
};

const validateProfileUserID = async (body) => {
    try {
        console.log('validateProfileUserID username', body.user_id);
        if (typeof body.user_id !== 'string') {
            throw new Error('Username must be a string.');
        }
        if (body.user_id.length !== 24) {
            throw new Error('Username must be a valid length.');
        }

        return { isValid: true };
    } catch (error) {
        console.log('validateProfileUserID error:', error.message);
        return { isValid: false, user: null, message: error.message };
    }
};

const validateProfileSettingsID = async (body) => {
    try {
        console.log('validateProfileSettingsID settings_id', body.settings_id);
        if (typeof body.settings_id !== 'string') {
            throw new Error('settings_id must be a string.');
        }
        if (body.settings_id.length !== 24) {
            throw new Error('settings_id must be a valid length.');
        }
        return { isValid: true };
    } catch (error) {
        console.log('validateProfileSettingsID error:', error.message);
        return { isValid: false, message: error.message };
    }
};

const validateProfileOnlineStatus = async (body) => {
    try {
        console.log('validateProfileOnlineStatus onlineStatus', body.onlineStatus);
        if (typeof body.onlineStatus !== 'boolean') {
            throw new Error('onlineStatus must be a boolean.');
        }
        return { isValid: true };
    } catch (error) {
        console.log('validateProfileOnlineStatus error:', error.message);
        return { isValid: false, message: error.message };
    }
};

const validateProfilePicture = async (body) => {
    try {
        console.log('validateProfilePicture profilePicture', body.profilePicture);
        if (typeof body.profilePicture !== 'string') {
            throw new Error('profilePicture must be a string URL.');
        }
        if (!body.profilePicture.startsWith('http://') && !body.profilePicture.startsWith('https://')) {
            throw new Error('profilePicture must be a valid URL starting with http:// or https://');
        }
        return { isValid: true };
    } catch (error) {
        console.log('validateProfilePicture error:', error.message);
        return { isValid: false, message: error.message };
    }
};

const validateProfileBio = async (body) => {
    try {
        console.log('validateProfileBio bio', body.bio);
        if (typeof body.bio !== 'string') {
            throw new Error('bio must be a string.');
        }
        if (body.bio.length < 10 || body.bio.length > 150) {
            throw new Error('bio must be between 10 and 150 characters.');
        }
        return { isValid: true };
    } catch (error) {
        console.log('validateProfileBio error:', error.message);
        return { isValid: false, message: error.message };
    }
};

const validateProfileLocation = async (body) => {
    try {
        console.log('validateProfileLocation location', body.location);
        if (typeof body.location !== 'string') {
            throw new Error('location must be a string.');
        }
        return { isValid: true };
    } catch (error) {
        console.log('validateProfileLocation error:', error.message);
        return { isValid: false, message: error.message };
    }
};

const validateProfileFullName = async (body) => {
    try {
        console.log('validateProfileFullName fullName', body.fullName);
        if (typeof body.fullName !== 'string') {
            throw new Error('fullName must be a string.');
        }
        return { isValid: true };
    } catch (error) {
        console.log('validateProfileFullName error:', error.message);
        return { isValid: false, message: error.message };
    }
};

const validateProfileMyScorecards = async (body) => {
    try {
        console.log('validateProfileMyScorecards myScorecards', body.myScorecards);
        if (!Array.isArray(body.myScorecards)) {
            throw new Error('myScorecards must be an array.');
        }
        return { isValid: true };
    } catch (error) {
        console.log('validateProfileMyScorecards error:', error.message);
        return { isValid: false, message: error.message };
    }
};

const validateProfileOtherScorecards = async (body) => {
    try {
        console.log('validateProfileOtherScorecards otherScorecards', body.otherScorecards);
        if (!Array.isArray(body.otherScorecards)) {
            throw new Error('otherScorecards must be an array.');
        }
        return { isValid: true };
    } catch (error) {
        console.log('validateProfileOtherScorecards error:', error.message);
        return { isValid: false, message: error.message };
    }
};

const validateProfileGroups = async (body) => {
    try {
        console.log('validateProfileGroups groups', body.groups);
        if (!Array.isArray(body.groups)) {
            throw new Error('groups must be an array.');
        }
        return { isValid: true };
    } catch (error) {
        console.log('validateProfileGroups error:', error.message);
        return { isValid: false, message: error.message };
    }
};

const validateProfileFriends = async (body) => {
    try {
        console.log('validateProfileFriends friends', body.friends);
        if (!Array.isArray(body.friends)) {
            throw new Error('friends must be an array.');
        }
        return { isValid: true };
    } catch (error) {
        console.log('validateProfileFriends error:', error.message);
        return { isValid: false, message: error.message };
    }
};



module.exports = {
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
};