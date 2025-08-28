const mongoose = require('mongoose');

// parse Schema json
const raw_json = require('../schemas/settings.json');

// create a schema
const settingsSchema = mongoose.Schema(raw_json);

// compile the model
const Settings = mongoose.model('settings', settingsSchema);

// export
module.exports = Settings;