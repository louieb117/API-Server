const express = require('express');
const router = express.Router();
 
const {
    createUserSettings,
    getAllSettings, 
    getUserSettings,
    updateUserSettings
} = require('../controllers/settingsController');

// Define settings-related routes
router.post('/', createUserSettings); // POST /api/settings/

router.get('/', getAllSettings); // GET /api/settings
router.get('/:id', getUserSettings); // GET /api/settings/:id

router.put('/:id', updateUserSettings); // PUT /api/settings/:id

module.exports = router;