const Settings = require('../../../models/settings.js');

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

module.exports = { 
    validateTheme,
    validateNotifications, 
    validateLanguage,
    validatePrivacy
};