const reqScorecardID = '67c92bfe82104d0c94b23a12';
const reqScorecardID2 = '68101f14af912a4fc8d69fe7';
const reqScorecardID3 = '68101f14af912a4fc8d69fe8';

const reqUserID = '68101f14af912a4fc8d69fe7';
const reqUserID2 = '68101f14af912a4fc8d69fe8';
const reqUserID3 = '68101f14af912a4fc8d69fe9';

const reqUserName = 'John Doe';
const reqUserName2 = 'Jane Doe';
const reqUserName3 = 'Jake Doe';

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// CREATE SCORECARD TEST DATA ////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

const reqCreateScorecardBody = {
    "creator": "67c92bfe82104d0c94b23a12",
    "holeSelection": 9,
    "course": "Test Course 009",
    "date": "{{$Timestamp}}",
    "players": ["Fin.tester", "jesus.tester", "Roboto.tester", "john.tester"],
    "scores": 
    {
    "Roboto.tester": [4, 4, 4, 4, 4, 4, 4, 4, 4],
    "jesus.tester": [4, 4, 4, 4, 4, 4, 4, 4, 4],
    "peter.tester": [4, 4, 4, 4, 4, 4, 4, 4, 4],
    "john.tester": [4, 4, 4, 4, 4, 4, 4, 4, 4]
    }
};
const reqCreateScorecardBody2 = {
    "holeSelection": 18,
    "course": "Test Course 018",
    "date": "{{$Timestamp}}",
    "players": ["Fin.tester", "jesus.tester", "Roboto.tester", "john.tester"],
    "scores": 
    {
    "Roboto.tester": [4, 4, 4, 4, 4, 4, 4, 4, 4],
    "jesus.tester": [4, 4, 4, 4, 4, 4, 4, 4, 4],
    "peter.tester": [4, 4, 4, 4, 4, 4, 4, 4, 4],
    "john.tester": [4, 4, 4, 4, 4, 4, 4, 4, 4]
    }
};
const reqCreateScorecardBody3 = {
    "holeSelection": 18,
    "course": "Test Course 018",
    "date": "{{$Timestamp}}",
    "players": ["Fin.tester", "jesus.tester", "Roboto.tester", "john.tester"],
    "scores": 
    {
    "Roboto.tester": [4, 4, 4, 4, 4, 4, 4, 4, 4],
    "jesus.tester": [4, 4, 4, 4, 4, 4, 4, 4, 4],
    "peter.tester": [4, 4, 4, 4, 4, 4, 4, 4, 4],
    "john.tester": [4, 4, 4, 4, 4, 4, 4, 4, 5]
    }
};

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// UPDATE SCORECARD TEST DATA ////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

const reqUpdateScorecardBody = {
    "holeSelection": 9,
    "course": "Test Course 009",
    "date": "{{$Timestamp}}",
    "players": ["Fin.tester", "jesus.tester", "Roboto.tester", "john.tester"],
    "scores": 
    {
    "Roboto.tester": [4, 4, 4, 4, 4, 4, 4, 4, 4],
    "jesus.tester": [4, 4, 4, 4, 4, 4, 4, 4, 5],
    "peter.tester": [4, 4, 4, 4, 4, 4, 4, 4, 5],
    "john.tester": [4, 4, 4, 4, 5, 5, 5, 5]
    }
};
const reqUpdateScorecardBody2 = {
    "holeSelection": 18,
    "course": "Test Course 018",
    "date": "{{$Timestamp}}",
    "players": ["Fin.tester", "jesus.tester", "Roboto.tester", "john.tester"],
    "scores": 
    {
    "Roboto.tester": [4, 4, 4, 4, 4, 4, 4, 4, 4],
    "jesus.tester": [4, 4, 4, 4, 4, 4, 4, 4, 5],
    "peter.tester": [4, 4, 4, 4, 5, 5, 5, 5],
    "john.tester": [5, 5, 5, 5]
    }
};
const reqUpdateScorecardBody3 = {
    "holeSelection": 18,
    "course": "Test Course 018",
    "date": "{{$Timestamp}}",
    "players": ["Fin.tester", "jesus.tester", "Roboto.tester", "john.tester"],
    "scores": 
    {
    "Roboto.tester": [4, 4, 4, 4, 4, 4, 4, 4, 4],
    "jesus.tester": [4, 4, 4, 4, 5, 5, 5, 5],
    "peter.tester": [5, 5, 5, 5],
    "john.tester": [5, 5, 5]
    }
};

module.exports = {
    reqScorecardID,
    reqScorecardID2,
    reqScorecardID3,
    reqUserID,
    reqUserID2,
    reqUserID3,
    reqUserName,
    reqUserName2,
    reqUserName3,

    reqCreateScorecardBody,
    reqCreateScorecardBody2,
    reqCreateScorecardBody3,

    reqUpdateScorecardBody,
    reqUpdateScorecardBody2,
    reqUpdateScorecardBody3
};