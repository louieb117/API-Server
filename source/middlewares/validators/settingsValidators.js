const { 
    validateTheme,
    validateNotifications, 
    validateLanguage,
    validatePrivacy
} = require('./libraries/settings.lib');

const Settings = require('../../models/settings.js');

const validateSettingsDataInput = async (settings) => {
    try {
        if (!settings || Object.keys(settings).length === 0) {
            throw new Error("Settings object is empty");
        }
        const allowedFields = ['theme', 'notifications', 'language', 'privacy'];
        for (const key in settings) {
            if (settings.hasOwnProperty(key) && !allowedFields.includes(key)) {
                throw new Error(`Invalid settings field: ${key}`);
            }
        }
        return { isValid: true };
    } catch (error) {
        return { isValid: false, message: error.message };
    }
};

const validateSettingsInDatabase = async (settings_id) => {
    try {
        if (!settings_id) { 
            return { isValid: false, message: "Settings ID is required" };
        }   
        if (settings_id.length !== 24) { 
            return { isValid: false, message: "Invalid Settings ID format" };
        }
        const existingSettings = settings_id ? await Settings.findById(settings_id) : null;
        if (!existingSettings) { 
            return { isValid: false, message: "Settings not found in the database" };
        } 
        return { isValid: true, message: "Settings found in the database", settings: existingSettings };    
    }
    catch (error) {
        return { isValid: false, message: error.message };
    }
};

const validateSettingsUpdate = async (settings) => {
    try {           
        const updateData = {}
        for (const key in settings) {
            if (settings.hasOwnProperty(key)) { 
                let validationResponse;
                switch (key) {
                    case "theme":
                        validationResponse = validateTheme(settings.theme);
                        if (!validationResponse.isValid) {
                        return { isValid: false, message: validationResponse.message };
                        }
                        updateData.theme = settings.theme;
                        break;

                    case "notifications":
                        validationResponse = validateNotifications(settings.notifications);
                        if (!validationResponse.isValid) {
                        return { isValid: false, message: validationResponse.message };
                        }
                        updateData.notifications = settings.notifications;
                        break;

                    case "language":
                        validationResponse = validateLanguage(settings.language);
                        if (!validationResponse.isValid) {
                        return { isValid: false, message: validationResponse.message };
                        }
                        updateData.language = settings.language;
                        break;

                    case "privacy":
                        validationResponse = validatePrivacy(settings.privacy);
                        if (!validationResponse.isValid) {
                        return { isValid: false, message: validationResponse.message };
                        }
                        updateData.privacy = settings.privacy;
                        break;

                    default:
                        return { isValid: false, message: `Unknown settings field: ${key}` };
                }
            }
        }
        return { isValid: true, message: "All settings successfully updated" };
    }
    catch (error) {
        return { isValid: false, message: error.message };
    }
};


module.exports = { 
    validateSettingsDataInput,
    validateSettingsInDatabase,
    validateSettingsUpdate
};