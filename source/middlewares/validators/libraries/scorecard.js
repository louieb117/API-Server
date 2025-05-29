const Scorecard = require("../../../models/scorecard");

const validateScorecardInDatabase = async (id) => {
    try{
        console.log('validateScorecardInDatabase id', id);
        const scorecard = await Scorecard.findById(id);
        console.log('validateScorecardInDatabase scorecard', scorecard);
        if (!scorecard) {
            return {
                isValid: false,
                message: "Scorecard not found"
            };        
        }
        return { isValid: true, scorecard: scorecard };
    } catch (error) {
        console.log('validateScorecardInDatabase error:', error.message);
        return { isValid: false, message: error.message };
    }
};

const validateScorecardNotInDatabase = async (id) => {
    try{
        console.log('validateScorecardNotInDatabase > Input id', id);
        const scorecard = await Scorecard.findById(id);
        console.log('validateScorecardNotInDatabase > scorecard found: ', scorecard);
        if (scorecard) {
            return {
                isValid: false,
                message: "Scorecard already exists"
            };        
        }
        return { isValid: true };
    }
    catch (error) {
        console.log('validateScorecardNotInDatabase error:', error.message);
        return { isValid: false, message: error.message };
    }
};

const validateScorecardCreator = async (body) => {
    try{
        const scorecard = await Scorecard.findById(body.creator);
        console.log('validateScorecardCreator scorecard', scorecard);
        if (!scorecard) {
            return {
                isValid: false,
                message: "Scorecard creator not found"
            };        
        }
        return { isValid: true };
    }
    catch (error) {
        console.log('validateScorecardCreator error:', error.message);
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
        console.log('validateScorecardHoleSelection error:', error.message);
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
        console.log('validateScorecardCourse error:', error.message);
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
        console.log('validateScorecardDate error:', error.message);
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
        console.log('validateScorecardPlayers error:', error.message);
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
        console.log('validateScorecardScoresCreate error:', error.message);
        return { isValid: false, message: error.message};
    }
};

const validateScorecardScoresUpdate = async (body, id) => {
    const refScorecard = id ? await Scorecard.findById(id) : null;
    if (id && !refScorecard) {
        console.log('validateScorecardScoresUpdate error: Scorecard not found');
        throw new Error("Scorecard not found");
    }
    try{
        if (body.scores.length < 1 || body.scores.length > 4) {
            throw new Error("There must be between 1 and 4 scores");
        }

        // Ensure each player has scores matching the hole selection
        for (const [playerIndex, playerScores] of Object.entries(body.scores)) {
            console.log('validateScorecardScoresUpdate Info: score counts', playerIndex, playerScores.length, refScorecard.holeSelection);
            if (!(body.holeSelection) && playerScores.length !== refScorecard.holeSelection) {
                console.log(`validateScorecardScoresUpdate Info: Player ${playerIndex} must have scores for ${refScorecard.holeSelection} holes`);
                throw new Error(`Player ${playerIndex} must have scores for ${refScorecard.holeSelection} holes`);
            }
        }

        return { isValid: true};

    }
    catch (error) {
        console.log('validateScorecardScoresUpdate error:', error.message);
        return { isValid: false, message: error.message};
    }
};

module.exports = {
    validateScorecardInDatabase,
    validateScorecardNotInDatabase,
    validateScorecardCreator,
    validateScorecardHoleSelection,
    validateScorecardCourse,
    validateScorecardDate,
    validateScorecardPlayers,
    validateScorecardScoresCreate,
    validateScorecardScoresUpdate
};