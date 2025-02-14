const mongoose = require('mongoose');

// parse Schema json
const raw_json = require('../schemas/user.json');

// create a schema
const userSchema = mongoose.Schema(raw_json);

// compile the model
const User = mongoose.model('user', userSchema);

// export
module.exports = User;