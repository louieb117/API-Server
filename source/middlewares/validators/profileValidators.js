const {
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
} = require('./libraries/profile.lib');

const validateProfileDataInput = async (body) => {
    try {
        const data = {};
        if (!body || Object.keys(body).length === 0 ) {
            return { isValid: false, message: "Input body is required" };
        }

        console.log('validateProfileDataInput info: body:', body);
        for (const key in body) {
            if (body.hasOwnProperty(key)) {
                switch (key) {
                    case "user_id":
                        const userIDValidation = await validateProfileUserID(body);
                        if (!userIDValidation.isValid) {
                            data.user_id = body.user_id;
                        }
                        break;
                    case "settings_id":
                        const settingsIDValidation = await validateProfileSettingsID(body);
                        if (!settingsIDValidation.isValid) {
                            data.settings_id = body.settings_id;
                        }
                        break;
                    case "onlineStatus":
                        const onlineStatusValidation = await validateProfileOnlineStatus(body);
                        if (!onlineStatusValidation.isValid) {
                            data.onlineStatus = body.onlineStatus;
                        }
                        break;
                    case "picture":
                        const pictureValidation = await validateProfilePicture(body);
                        if (!pictureValidation.isValid) {
                            data.picture = body.picture;
                        }
                        break;
                    case "bio":
                        const bioValidation = await validateProfileBio(body);
                        if (!bioValidation.isValid) {
                            data.bio = body.bio;
                        }
                        break;
                    case "location":
                        const locationValidation = await validateProfileLocation(body);
                        if (!locationValidation.isValid) {
                            data.location = body.location;
                        }
                        break;
                    case "fullName":
                        const fullNameValidation = await validateProfileFullName(body);
                        if (!fullNameValidation.isValid) {
                            data.fullName = body.fullName;
                        }
                        break;
                    case "myScorecards":
                        const myScorecardsValidation = await validateProfileMyScorecards(body);
                        if (!myScorecardsValidation.isValid) {
                            data.myScorecards = body.myScorecards;
                        }
                        break;
                    case "otherScorecards":
                        const otherScorecardsValidation = await validateProfileOtherScorecards(body);
                        if (!otherScorecardsValidation.isValid) {
                            data.otherScorecards = body.otherScorecards;
                        }
                        break;
                    case "groups":
                        const groupsValidation = await validateProfileGroups(body);
                        if (!groupsValidation.isValid) {
                            data.groups = body.groups;
                        }
                        break;
                    case "friends":
                        const friendsValidation = await validateProfileFriends(body);
                        if (!friendsValidation.isValid) {
                            data.friends = body.friends;
                        }
                        break;
                    default:
                        break;
                }
            }
        }
        return { isValid: true};
    } catch (error) {
        console.log('validateProfileDataInput error:', error.message);
        return { isValid: false, message: error.message};
    }
};

const validateProfileCreationInput = async (body) => {
    try {
        console.log('validateProfileCreationInput info: body:', body);
        if (!body.user_id) {
            throw new Error("user_id is required");
        }
        const v_body = await validateProfileDataInput(body);
        console.log('validateProfileCreationInput info: v_body:', v_body);
        if (!v_body.isValid) {
            return { isValid: false, message: v_body.message };
        }

        return { isValid: true , profile: v_body.profile };
    }  catch (error) {
        console.log('validateProfileCreationInput error:', error.message);
        return { isValid: false, message: error.message, profile: body };
    }
};

const validateProfileUpdateInput = async (body) => {
    try {
        console.log('validateProfileUpdateInput info: body:', body);
        if (!body || Object.keys(body).length === 0 ) {
            return { isValid: false, message: "Input body is required" };
        }
        const v_body = await validateProfileDataInput(body);
        console.log('validateProfileUpdateInput info: v_body:', v_body);
        if (!v_body.isValid) {
            return { isValid: false, message: v_body.message };
        }

        return { isValid: true , profile: v_body.profile };
    }  catch (error) {
        console.log('validateProfileUpdateInput error:', error.message);
        return { isValid: false, message: error.message, profile: body };
    }
};

module.exports = {
    validateProfileDataInput,
    validateProfileCreationInput,
    validateProfileUpdateInput,
};