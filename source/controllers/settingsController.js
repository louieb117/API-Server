const Settings = require('../models/settings.js');
const {
    validateSettingsInDatabase, 
    validateSettingsUpdate
} = require('../middlewares/validators/settingsValidators.js'); 

const createUserSettings = async (req, res) => {
    try { 
      // validate input
      const settingsValidation = await validateSettingsInDatabase(null);
      if (!settingsValidation.isValid) {
        return res.status(400).json({ error: settingsValidation.message });
      } 
      // set default settings
      req.body.theme = "light";
      req.body.notifications = true;
      req.body.language = "en";
      req.body.privacy = {
        profileVisibility: "public",
        dataSharing: true
      }

      const newSettings = new Settings(req.body);
      newSettings.save();
      console.log(newSettings);

      res.status(201).json({
        message: "New Settings Created!",
        data: newSettings
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }   
};

const updateUserSettings = async (req, res) => {
    try{
      // Database Validation: Check if settings exists
      const settingsValidation = await validateSettingsInDatabase(req.params.id);
      if (!settingsValidation.isValid) {
        return res.status(404).json({ error: settingsValidation.message });
      } 
      // Input Validation: Check if update input is valid
      const updateValidation = await validateSettingsUpdate(req.body);
      if (!updateValidation.isValid) {
        return res.status(400).json({ error: updateValidation.message });
      }

      // Update settings
      const updatedSettings = await Settings.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json({
        message: "Settings Updated!",
        data: updatedSettings
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};

const getAllSettings = async (req, res) => {
    try{
      const allSettings = await Settings.find();
      res.status(200).json(allSettings);
    } catch (error) { 
      res.status(500).json({ message: error.message });
    }
}; 

const getUserSettings = async (req, res) => {
    try{
      const userSettings = await validateSettingsInDatabase(req.params.id);
      if (!userSettings.isValid) {
        return res.status(404).json({ error: userSettings.message });
      }
      res.status(200).json(userSettings.settings);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
};

module.exports = {
    createUserSettings,
    getAllSettings,
    getUserSettings,
    updateUserSettings
}