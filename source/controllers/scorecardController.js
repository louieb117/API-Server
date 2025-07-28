const Scorecard = require('../models/scorecard.js');
const { validateUsernameInDatabase } = require('../middlewares/validators/userValidators.js');
const { validateScorecardInDatabase } = require('../middlewares/validators/libraries/scorecard.js');
const { 
  validateScorecardCreationInput, 
  validateScorecardUpdateInput
} = require('../middlewares/validators/scorecardValidators.js');

const getAllScorecards = async (req, res) => {
  try{
    const allScorecards = await Scorecard.find();
    res.status(200).json(allScorecards);
  } catch (error) {
    console.error('Error fetching scorecards:', error); // Log the error
    res.status(500).json({ message: error.message });
  }
};

const getScorecard = async (req, res) => {
  try{
    // Database Validation: Check if scorecard exists
    const scorecardValidation = await validateScorecardInDatabase(req.params.id);
    if (!scorecardValidation.isValid) {
      return res.status(404).json({ error: scorecardValidation.message });

    }
    res.status(200).json(scorecardValidation.scorecard);
  } catch (error) {
    console.error('Error fetching scorecard:', error); // Log the error
    res.status(404).json({ message: error.message });
  }
};

const getUsersScorecards = async (req, res) => {
  try{
    // Database Validation: Check if user exists
    const userValidation = await validateUsernameInDatabase(req.params.id);
    if (!userValidation.isValid) {
      return res.status(404).json({ error: userValidation.message });
    }

    console.log('getUsersScorecards info: input for find()', { creator: req.params.id });
    const userScorecards = await Scorecard.find({ creator: req.params.id });

    res.status(200).json({Scorecards: userScorecards, User: req.params.id});
  } catch (error) {
    console.error('Error fetching user scorecards:', error); // Log the error
    res.status(404).json({ message: error.message });
  }

};

const createScorecard = async (req, res) => {
  try { 
    // Database Validation: Check if user exists
    const userValidation = await validateUsernameInDatabase(req.params.id);
    if (!userValidation.isValid) {
      return res.status(404).json({ error: userValidation.message });
    }

    const user = userValidation.user;
    console.log('createScorecard info: user', user);

    // Create Feature: Assign the request parameter id to the scorecard's creator field
    // if (!req.body.creator) {
    //     console.log('createScorecard info: No creator provided, using user._id');
    // }
    req.body.creator = user.toString();
    console.log('createScorecard info: request body', req.body);
    
    // Request body validation: Check if all required fields are present
    const scorecardCreationValidation = await validateScorecardCreationInput(req.body);
    console.log('createScorecard info: scorecardCreationValidation', scorecardCreationValidation);
    if (!scorecardCreationValidation.isValid) {
        return res.status(400).json({ 
          vstatus: scorecardCreationValidation.isValid,
          request: req.body,
          error: scorecardCreationValidation.message
        });
    }

    // Create Function: Create a new scorecard with the validated request body
    const newScorecard = await Scorecard.create(req.body);
    console.log('createScorecard info: newScorecard', newScorecard);
    
    // // Save the new scorecard to the database
    // await newScorecard.save();
    // console.log('createScorecard info: newScorecard saved', newScorecard);
    // // Log the new scorecard
    // console.log('createScorecard info: newScorecard created', newScorecard);
    // // Respond with the created scorecard
    // console.log('createScorecard info: response', { message: "New Scorecard Created!", data: newScorecard });

    // Response Feature: Return a success message with the created scorecard
    res.status(201).json({ message: "New Scorecard Created!", data: newScorecard });
  } catch (error) {
        console.error('Error creating scorecard:', error); // Log the error
        res.status(407).json({ message: error.message });
  }
};

const updateScorecard = async (req, res) => {
    try{
      // Database Validation: Check if scorecard exists
      const scorecardValidation = await validateScorecardInDatabase(req.params.id);
      if (!scorecardValidation.isValid) {
        return res.status(404).json({ error: scorecardValidation.message });
      }

      const refScorecard = scorecardValidation.scorecard;
      console.log('updateScorecard Info: reference Scorecard', refScorecard);

      
      // Update Feature: Merge existing scores with the new scores
      const updatedScores = { ...refScorecard.scores }; // Start with existing scores
  
      for (const player in req.body.scores) {
          if (updatedScores[player]) {
              // Update the player's scores
              updatedScores[player] = [...req.body.scores[player]];
          } else {
              // Add new player scores if the player doesn't exist
              updatedScores[player] = [...req.body.scores[player]];
          }
      }
      console.log('updateScorecard Info: updatedScores', updatedScores);
      
      // Assign the updated scores back to the body
      req.body.scores = updatedScores;
      console.log('updateScorecard Info: request body after merging scores', req.body);
      
      // Request body validation: Check if at least one field is being updated
      const scorecardUpdateValidation =  await validateScorecardUpdateInput(req.body, req.params.id);
      console.log('scorecardUpdateValidation', scorecardUpdateValidation);
      if (!scorecardUpdateValidation.isValid) {
        return res.status(400).json({ error: scorecardUpdateValidation.message });
      }

      // Update Function: Update the scorecard with the validated request body
      console.log('updateScorecard Info: updating scorecard with body', req.body);
      const scorecard = await Scorecard.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Return the updated document
      if (!scorecard) {
        console.error('Scorecard not found or update failed');
        return res.status(404).json({ message: 'Scorecard not found' });
      }

      // Response Feature: Return a success message with the updated scorecard
      console.log('updateScorecard Info: scorecard updated', scorecard);
      res.status(200).json({
        message: "Scorecard updated!",
        data: scorecard
      });
    } catch (error) {
      console.error('Error updating scorecard:', error); // Log the error
      res.status(400).json({ message: error.message });
    }
};

const deleteScorecard = async (req, res) => {
    try {
    //   const scorecardValidation = await validateScorecardInDatabase(req.params.id);
    //   if (!scorecardValidation.isValid) {
    //     return res.status(404).json({ error: scorecardValidation.message });
    //   }
      await Scorecard.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Scorecard deleted' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getAllScorecards,
    getScorecard,
    getUsersScorecards,
    createScorecard,
    updateScorecard,
    deleteScorecard
};