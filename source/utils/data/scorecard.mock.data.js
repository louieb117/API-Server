const mockUser = {
  _id: "67c93f408333cec4179f7904",
  fullName: "Fin The Human",
  phoneNumber: "(619)969-6666",
  email: "Fin.tester@potentiamaxima.com",
  username: "Fin.tester",
  password: "Fin3453333!",
  role: "tester",
  creationDate: "1750999277",
  activated: true,
  currentLocation: "US",
  friends: [],
  __v: 0
};

const mockSocrecardGetResponse01 = {
  active: true,
  _id: "67f8943ed64a99c0f4abb9ca",
  creator: "67c93f408333cec4179f7904",
  holeSelection: 9,
  course: "Test Course 99",
  date: "{{new Date().toISOString()}}",
  players: [
    "Roboto.tester",
    "jesus.tester",
    "peter.tester",
    "john.tester"
  ],
  scores: {
    "Roboto.tester": [
      7, 3, 9, 5, 2, 8, 6, 4, 1
    ],
    "jesus.tester": [
      4, 4, 4, 4, 4, 4, 4, 4, 4
    ],
    "peter.tester": [
      4, 2, 2, 5, 2, 8, 6, 4
    ],
    "john.tester": [
      4, 4, 4, 4, 4, 4, 4, 4, 4
    ]
  },
  __v: 0
};

const mockSocrecardUpdateResponse01 = {
  message: "Scorecard updated!",
  data: {
    active: true,
    _id: "67f8943ed64a99c0f4abb9ca",
    creator: "67c93f408333cec4179f7904",
    holeSelection: 9,
    course: "Test Course 99",
    date: "{{new Date().toISOString()}}",
    players: [
      "Roboto.tester",
      "jesus.tester",
      "peter.tester",
      "john.tester"
    ],
    scores: {
      "Roboto.tester": [
        7, 3, 9, 5, 2, 8, 6, 4, 1
      ],
      "jesus.tester": [
        4, 4, 4, 4, 4, 4, 4, 4, 4
      ],
      "peter.tester": [
        0, 0, 0, 0, 0, 0, 0, 0, 0
      ],
      "john.tester": [
        4, 4, 4, 4, 4, 4, 4, 4, 4
      ]
    },
    __v: 0
  }
}

const mockScorecardDeleteResponse01 = {
  message: "Scorecard deleted"
}

module.exports = {
  mockUser,
  mockSocrecardGetResponse01,
  mockSocrecardUpdateResponse01,
  mockScorecardDeleteResponse01
};