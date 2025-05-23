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
///////////////////////  SCORECARD TEST DATA: Correct ///////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
const reqCreateBody_c_1 = {
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
/////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////  SCORECARD TEST DATA: Incorrect /////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
const reqCreateBody_ic_HS_1 = {
    "creator": "67c92bfe82104d0c94b23a12",
    "holeSelection": 0
};

const reqCreateBody_ic_HS_2 = {
    "creator": "67c92bfe82104d0c94b23a12",
    "holeSelection": 20,
};

const reqCreateBody_ic_C_1 = {
    "creator": "67c92bfe82104d0c94b23a12",
    "course": "T"
};

const reqCreateBody_ic_P_1 = {
    "creator": "67c92bfe82104d0c94b23a12",
    "players": ["Fin.tester"]
};

const reqCreateBody_ic_P_2 = {
    "creator": "67c92bfe82104d0c94b23a12",
    "players": ["Fin.tester", "jesus.tester", "Roboto.tester", "john.tester", "john.tester"]
};

const reqCreateBody_ic_P_3 = {
    "creator": "67c92bfe82104d0c94b23a12",
    "players": ["Fin.tester", "Fin.tester", "Fin.tester", "Fin.tester"]
};

const reqCreateBody_ic_SC_1 = {
    "creator": "67c92bfe82104d0c94b23a12",
    "holeSelection": 9,
    "players": ["Fin.tester", "jesus.tester", "Roboto.tester", "john.tester"],
    "scores": 
    {
        "Roboto.tester": [4, 4, 4, 4, 4],
        "jesus.tester": [4, 4, 4, 4, 4],
        "peter.tester": [4, 4, 4, 4, 4],
        "john.tester": [4, 4, 4, 4, 4]
    }
};

const reqCreateBody_ic_SC_2 = {
    "creator": "67c92bfe82104d0c94b23a12",
    "holeSelection": 9,
    "players": ["Fin.tester", "jesus.tester", "Roboto.tester", "john.tester"],
    "scores": 
    {
        "Roboto.tester": [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        "jesus.tester": [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        "peter.tester": [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        "john.tester": [4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
    }
};
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// CREATE SCORECARD TEST DATA //////////////////////////////////////////
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
    reqCreateBody_c_1,
    reqCreateBody_ic_HS_1,
    reqCreateBody_ic_HS_2,
    reqCreateBody_ic_C_1,
    reqCreateBody_ic_P_1,
    reqCreateBody_ic_P_2,
    reqCreateBody_ic_P_3,
    reqCreateBody_ic_SC_1,
    reqCreateBody_ic_SC_2,
    // reqCreateBody_ic_SC_3,

    reqCreateScorecardBody,
    reqCreateScorecardBody2,
    reqCreateScorecardBody3,

    reqUpdateScorecardBody,
    reqUpdateScorecardBody2,
    reqUpdateScorecardBody3
};