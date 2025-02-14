const mongoose = require('mongoose');

// parse Schema json
const raw_01 = require('../schemas/profile.json');

// create a schema
const profileSchema = mongoose.Schema(raw_01);

// compile the model
const Profile = mongoose.model('profile', profileSchema);

// export
module.exports = Profile;