const mockUserId = '68101f14af912a4fc8d69fe7';
const mockUsername = 'peter.tester';

const mockUserResponse = {
    _id: '68101f14af912a4fc8d69fe7', // Use a string representation of ObjectId
    fullName: 'Mr Roboto Admin',
    phoneNumber: '6199696660',
    email: 'test.user.Roboto@potentiamaxima.com',
    username: 'peter.tester',
    password: 'Roboto123!',
    role: 'tester',
    creationDate: '1741237332',
    activated: true,
    currentLocation: 'US',
    friends: ['friend_test'],
    __v: 0,
};

const mockUserResponse02 = {
    _id: "685e20eeb401f750303a83a1",
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


module.exports = {
    mockUserId,
    mockUsername,
    mockUserResponse,
    mockUserResponse02
};