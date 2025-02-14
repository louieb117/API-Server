const mongoose = require('mongoose');

// parse Schema json
const raw_json = require('../schemas/scorecard.json');

// create a schema
const scorecardSchema = mongoose.Schema(raw_json);

// compile the model
const Scorecard = mongoose.model('scorecard', scorecardSchema);

// export
module.exports = Scorecard;