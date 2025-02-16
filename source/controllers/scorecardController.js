const Scorecard = require('../models/scorecard.js');
const { validateUserInDatabase } = require('../middlewares/validators.js');
const { validateScorecardCreationInput, validateScorecardInDatabase } = require('../middlewares/validators.js');

const getAllScorecards = async (req, res) => {
    try{
      const allScorecards = await Scorecard.find();
      res.status(200).json(allScorecards);
    } catch (error) {
      console.error('Error fetching scorecards:', error); // Log the error
      res.status(500).json({ message: error.message });
    }
};

// const getScorecard = async (req, res) => {
//     try{
//       // Database Validation: Check if scorecard exists
//       const scorecardValidation = await validateScorecardInDatabase(req.params.id);
//       if (!scorecardValidation.isValid) {
//         return res.status(404).json({ error: scorecardValidation.message });
//       }
//       res.status(200).json(scorecardValidation.scorecard);
//     } catch (error) {
//       res.status(404).json({ message: error.message });
//     }
// };

const getUsersScorecards = async (req, res) => {
    try{
      // Database Validation: Check if user exists
      const userValidation = await validateUserInDatabase(null,req.params.id);
        if (!userValidation.isValid) {
            return res.status(404).json({ error: userValidation.message });
            }
        const user = userValidation.user;
        const userScorecards = await Scorecard.find({ creator: user._id });
        res.status(200).json(userScorecards);
    } catch (error) {
        res.status(404).json({ message: error.message });
        }
};

const createScorecard = async (req, res) => {
    try { 
        // // validate user
        // const userValidation = await validateUserInDatabase(req.params.id);
        // if (!userValidation.isValid) {
        //   return res.status(404).json({ error: userValidation.message });
        // }
        // const user = userValidation.user;
        // req.body.creator = user._id

        // // validate input
        // const scorecardCreationValidation = validateScorecardCreationInput(req.body);
        // if (!scorecardCreationValidation.isValid) {
        //     return res.status(400).json({ error: scorecardCreationValidation.message });
        // }
        req.body.creator = req.params.id;
        const newScorecard = new Scorecard(req.body);
        // save scorecard
        newScorecard.save();
        // print log
        console.log(newScorecard);
    
        res.status(201).json({
            message: "New Scorecard Created!",
            data: newScorecard
        });
        } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateScorecard = async (req, res) => {
    try{
    //   const scorecardValidation = await validateScorecardInDatabase(req.params.id);
    //   if (!scorecardValidation.isValid) {
    //     return res.status(404).json({ error: scorecardValidation.message });
    //   }
    //   const scorecardCreationValidation = validateScorecardCreationInput(req.body);
    //   if (!scorecardCreationValidation.isValid) {
    //     return res.status(400).json({ error: scorecardCreationValidation.message });
    //   }
      const scorecard = await Scorecard.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Return the updated document
      if (!scorecard) return res.status(404).json({ message: 'Scorecard not found' });
      res.status(200).json({
        message: "Scorecard updated!",
        data: scorecard
      });
    } catch (error) {
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
    getUsersScorecards,
    createScorecard,
    updateScorecard,
    deleteScorecard
};