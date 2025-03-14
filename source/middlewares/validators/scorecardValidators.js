const Scorecard = require("../../models/scorecard");

const validateScorecardInDatabase = async (id) => {
    try{
        const scorecard = await Scorecard.findById(id);
        if (!scorecard) {
            return {
                isValid: false,
                message: "Scorecard not found",
            };        
        }
        return { isValid: true, scorecard };
    } catch (error) {
        return { isValid: false, message: error.message };
    }
};

const validateScorecardNotInDatabase = async (id) => {
    try{
        const scorecard = await
        Scorecard.findById(id);
        if (scorecard) {
            return {
                isValid: false,
                message: "Scorecard already exists",
            };        
        }
        return { isValid: true };
    }
    catch (error) {
        return { isValid: false, message: error.message };
    }
};

const validateScorecardCreator = async (body) => {
    try{
        const scorecard = await
        Scorecard.findById(body.creator);
        if (!scorecard) {
            return {
                isValid: false,
                message: "Scorecard creator not found",
            };        
        }
        return { isValid: true };
    }
    catch (error) {
        return { isValid: false, message: error.message };
    }
};

const validateScorecardHoleSelection = async (body) => {
    try{
        if (body.holeSelection < 9 || body.holeSelection > 18) {
            throw new Error("Hole selection must be between 9 and 18");
        }
        return { isValid: true };
    }
    catch (error) {
        return { isValid: false, message: error.message };
    }
};

const validateScorecardCourse = async (body) => {
    try{
        if (body.course.length < 3 || body.course.length > 50) {
            throw new Error("Course name must be between 3 and 50 characters");
        }
        return { isValid: true };
    }
    catch (error) {
        return { isValid: false, message: error.message };
    }
};

const validateScorecardDate = async (body) => {
    try{
        if (body.date.length !== 10) {
            throw new Error("Date must be in the format YYYY-MM-DD");
        }
        return { isValid: true };
    }
    catch (error) {
        return { isValid: false, message: error.message };
    }
};

const validateScorecardPlayers = async (body) => {
    try{
        if (body.players.length < 1 || body.players.length > 4) {
            throw new Error("There must be between 1 and 4 players");
        }
        return { isValid: true };
    }
    catch (error) {
        return { isValid: false, message: error.message };
    }
};

const validateScorecardScores = async (body) => {
    try{
        if (body.scores.length < 1 || body.scores.length > 4) {
            throw new Error("There must be between 1 and 4 scores");
        }
        if (body.scores.length !== body.players.length) {
            throw new Error("There must be a score for each player");
        }
        for (let i = 0; i < body.scores.length; i++) {
            // I think this should be body.holeSelection - 1
            if (body.scores[i].length !== body.holeSelection) {
                throw new Error("There must be a score for each hole");
            }
            for (let j = 0; j < body.scores[i].length; j++) {
                if (body.scores[i][j] < 1 || body.scores[i][j] > 36) {
                    throw new Error("Scores must be between 1 and 36");
                }
            }
        }
        return { isValid: true };
    }
    catch (error) {
        return { isValid: false, message: error.message};
    }
};

const validateScorecardDataInput = async (body) => {
    // try {
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
                    const scoresValidation = validateScorecardScores(body);
                    if (!scoresValidation.isValid) {
                        data.scores = body.scores;
                    }
                    break;
                default:
                    break;
            }
        }
    }
    return { isValid: true, data };
//     } catch (error) {
//         return { isValid: false, message: error.message };
//     }
};


const validateScorecardCreationInput = async (body) => {
    try {
        // const scorecardValidation = await validateScorecardNotInDatabase(body);
        // if (!scorecardValidation.isValid) {
        //     return { isValid: false, message: scorecardValidation.message };
        // }

        if (!body.creator || !body.holeSelection || !body.course || !body.date || !body.players ||!body.scores) {
            throw new Error("creator, holeSelection, course, date, and scores are required");
        }
        const v_body = await validateScorecardDataInput(body);
        if (!v_body.isValid) {
            return { isValid: false, message: v_body.message };
        }

        return { isValid: true };
    }   catch (error) {
        return { isValid: false, message: error.message };
    }
};

const validateScorecardUpdateInput = async (body) => {
    try {
        if (!body.holeSelection && !body.course && !body.date && !body.players && !body.scores) {
            throw new Error(`At least one field must be updated. Provided body: ${JSON.stringify(body)}`);
        }
        const v_body = await validateScorecardDataInput(body);
        if (!v_body.isValid) {
            return { isValid: false, message: v_body.message };
        }

        return { isValid: true };
    }   catch (error) {
        return { isValid: false, message: error.message };
    }
}


module.exports = {
    validateScorecardCreationInput,
    validateScorecardInDatabase,
    validateScorecardNotInDatabase,
    validateScorecardUpdateInput,
    validateScorecardDataInput,
    validateScorecardHoleSelection,
    validateScorecardCourse,
    validateScorecardDate,
    validateScorecardPlayers,
    validateScorecardScores,
    validateScorecardCreator
};