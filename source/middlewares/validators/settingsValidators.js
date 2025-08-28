const Settings = require('../../models/settings.js');

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

const validateTheme = (theme) => {
    try {
        const validThemes = ['light', 'dark', 'system'];
        if (!validThemes.includes(theme)) {
            return { isValid: false, message: `Invalid theme. Valid options are: ${validThemes.join(', ')}` };
        }
        return { isValid: true, message: "Theme successfully validated" };
    }
    catch (error) {
        return { isValid: false, message: error.message };
    }
};

const validateNotifications = (notifications) => {
    try {
        if (typeof notifications !== 'boolean') {
            return { isValid: false, message: "Notifications must be a boolean value." };
        }
        return { isValid: true, message: "Notifications setting successfully validated" };
    }
    catch (error) {
        return { isValid: false, message: error.message };
    }
};

const validateLanguage = (language) => {
    try {
        const validLanguages = ['en', 'es', 'fr', 'de', 'zh'];
        if (!validLanguages.includes(language)) {
            return { isValid: false, message: `Invalid language. Valid options are: ${validLanguages.join(', ')}` };
        }
        return { isValid: true, message: "Language successfully validated" };
    }
    catch (error) {
        return { isValid: false, message: error.message };
    }
};

const validatePrivacy = (privacy) => {
    try {
        if (!privacy || typeof privacy !== "object") {
            return { isValid: false, message: "Privacy must be an object" };
        }
        const { profileVisibility, dataSharing } = privacy;
        // Validate profileVisibility
        const validVisibilityOptions = ["public", "friends", "private"];
        if (!validVisibilityOptions.includes(profileVisibility)) {
            return { 
                isValid: false, 
                message: `Invalid profileVisibility. Valid options: ${validVisibilityOptions.join(", ")}` 
            };
        }
        // Validate dataSharing
        if (typeof dataSharing !== "boolean") {
            return { 
                isValid: false, 
                message: "dataSharing must be a boolean (true/false)" 
            };
        }
        return { isValid: true, message: "Privacy settings successfully validated" };
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
    validateSettingsInDatabase,
    validateTheme,
    validateNotifications, 
    validateLanguage,
    validatePrivacy,
    validateSettingsUpdate
};