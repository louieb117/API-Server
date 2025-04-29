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
        return { isValid: true, scorecard: scorecard };
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

const validateScorecardScoresCreate = async (body) => {
    try{
        if (body.scores.length < 1 || body.scores.length > 4) {
            throw new Error("There must be between 1 and 4 scores");
        }

        // Ensure each player has scores matching the hole selection
        for (const [playerIndex, playerScores] of Object.entries(body.scores)) {
            console.log('score counts', playerIndex, playerScores.length, body.holeSelection);
            if (body.holeSelection && playerScores.length !== body.holeSelection) {
                throw new Error(`Player ${playerIndex} must have scores for ${body.holeSelection} holes`);
            }
        }

        return { isValid: true};

    }
    catch (error) {
        console.log('error', error.message);
        return { isValid: false, message: error.message};
    }
};

const validateScorecardScoresUpdate = async (body, id) => {

    const refScorecard = id ? await Scorecard.findById(id) : null;
    if (id && !refScorecard) {
        throw new Error("Scorecard not found");
    }
    // console.log('flag 0  - req.body.scores', body.scores);
    try{
        if (body.scores.length < 1 || body.scores.length > 4) {
            throw new Error("There must be between 1 and 4 scores");
        }

        // Ensure each player has scores matching the hole selection
        for (const [playerIndex, playerScores] of Object.entries(body.scores)) {
            console.log('score counts', playerIndex, playerScores.length, refScorecard.holeSelection);
            if (!(body.holeSelection) && playerScores.length !== refScorecard.holeSelection) {
                console.log(`Player ${playerIndex} must have scores for ${refScorecard.holeSelection} holes`);
                throw new Error(`Player ${playerIndex} must have scores for ${refScorecard.holeSelection} holes`);
            }
        }

        return { isValid: true};

    }
    catch (error) {
        console.log('error', error.message);
        return { isValid: false, message: error.message};
    }
};

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
        return { isValid: false, message: error.message};
    }
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

        return { isValid: true , scorecard: v_body.scorecard };
    }   catch (error) {
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
        return { isValid: false, message: error.message, scorecard: body };
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
    validateScorecardScoresCreate,
    validateScorecardScoresUpdate,
    validateScorecardCreator
};