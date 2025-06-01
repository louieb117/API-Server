const {
    validateScorecardCreator,
    validateScorecardHoleSelection,
    validateScorecardCourse,
    validateScorecardDate,
    validateScorecardPlayers,
    validateScorecardScoresCreate,
    validateScorecardScoresUpdate,
} = require('./libraries/scorecard');

const validateScorecardDataInput = async (body, id) => {
    try {
        const data = {};
        for (const key in body) {
            if (body.hasOwnProperty(key)) {
                switch (key) {
                    case "creator":
                        const creatorValidation = await validateScorecardCreator(body);
                        if (!creatorValidation.isValid) {
                            data.creator = body.creator;
                        }
                        break;
                    case "holeSelection":
                        const holeSelectionValidation = validateScorecardHoleSelection(body);
                        if (!holeSelectionValidation.isValid) {
                            data.holeSelection = body.holeSelection;
                        }
                        break;
                    case "course":
                        const courseValidation = validateScorecardCourse(body);
                        if (!courseValidation.isValid) {
                            data.course = body.course;
                        }
                        break;
                    case "date":
                        const dateValidation = validateScorecardDate(body);
                        if (!dateValidation.isValid) {
                            data.date = body.date;
                        }
                        break;
                    case "players":
                        const playersValidation = await validateScorecardPlayers(body);
                        if (!playersValidation.isValid) {
                            data.players = body.players;
                        }
                        break;
                    case "scores":
                        const scoresValidation = id 
                            ? await validateScorecardScoresUpdate(body, id) 
                            : await validateScorecardScoresCreate(body);
                        
                        if (!scoresValidation.isValid) {
                            data.scores = body.scores;
                        }
                        break;
                    default:
                        break;
                }
            }
        }
        return { isValid: true};
    } catch (error) {
        console.log('validateScorecardDataInput error:', error.message);
        return { isValid: false, message: error.message};
    }
};


const validateScorecardCreationInput = async (body) => {
    try {
        console.log('validateScorecardCreationInput info: body:', body);
        if (!body.creator || !body.holeSelection || !body.course || !body.date || !body.players ||!body.scores) {
            throw new Error("creator, holeSelection, course, date, and scores are required");
        }
        const v_body = await validateScorecardDataInput(body);
        console.log('validateScorecardCreationInput info: v_body:', v_body);
        if (!v_body.isValid) {
            return { isValid: false, message: v_body.message };
        }

        return { isValid: true , scorecard: v_body.scorecard };
    }   catch (error) {
        console.log('validateScorecardCreationInput error:', error.message);
        return { isValid: false, message: error.message, scorecard: body };
    }
};

const validateScorecardUpdateInput = async (body, id) => {
    try {
        if (!body.holeSelection && !body.course && !body.date && !body.players && !body.scores) {
            throw new Error(`At least one field must be updated. Provided body: ${JSON.stringify(body)}`);
        }

        const v_body = await validateScorecardDataInput(body,id);
        if (!v_body.isValid) {
            return { isValid: false, scorecard: id, scorecard: v_body.scorecard, message: v_body.message };
        }

        return { isValid: true };
    }   catch (error) {
        console.log('validateScorecardUpdateInput error:', error.message);
        return { isValid: false, message: error.message, scorecard: body };
    }
}


module.exports = {
    validateScorecardDataInput,
    validateScorecardCreationInput,
    validateScorecardUpdateInput
};