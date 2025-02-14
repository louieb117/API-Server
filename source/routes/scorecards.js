const express = require('express');
const router = express.Router();

// const { authenticate } = require('../middlewares/authMiddleware');
const scorecardController = require('../controllers/scorecardController');

// Define scorecard-related routes
router.get('/', scorecardController.getAllScorecards); // GET /api/scorecards
router.get('/user/:id', scorecardController.getUsersScorecards); // GET /api/scorecards/users/:id

router.post('/user/create/:id', scorecardController.createScorecard); // POST /api/scorecards/users/create

router.put('/user/update/:id', scorecardController.updateScorecard); // PUT /api/scorecards/users/update/:id

router.delete('/user/delete/:id', scorecardController.deleteScorecard); // DELETE /api/scorecards/users/delete/:id

module.exports = router;
