const express = require('express');
const router = express.Router();

// const { authenticate } = require('../middlewares/authMiddleware');
const {
    getAllScorecards,
    getScorecard,
    getUsersScorecards,
    createScorecard,
    updateScorecard,
    deleteScorecard
} = require('../controllers/scorecardController');

// Define scorecard-related routes
router.get('/', getAllScorecards); // GET /api/scorecards

router.get('/:id', getScorecard); // GET /api/scorecards/:id

router.get('/user/:id', getUsersScorecards); // GET /api/scorecards/users/:id

router.post('/user/create/:id', createScorecard); // POST /api/scorecards/users/create

router.put('/user/update/:id', updateScorecard); // PUT /api/scorecards/users/update/:id

router.delete('/user/delete/:id', deleteScorecard); // DELETE /api/scorecards/users/delete/:id

module.exports = router;