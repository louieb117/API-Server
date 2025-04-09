const reqCreateUser = {
    fullName: "Fin The Human",
    phoneNumber: "(619)969-6666",
    email: "Fin.tester@potentiamaxima.com",
    username: "Fin.tester",
    password: "Fin3453333!",
    role: "tester",
    creationDate: "{{$timestamp}}",
    activated: true,
    currentLocation: "US",
    bio: "Im the best test user"
}

const reqUpdateUser = {
    fullName: "Fin The Human",
    phoneNumber: "(619)969-6666",
    email: "Fin.tester@potentiamaxima.com",
    username: "Fin.tester",
    password: "Fin3453333!",
    role: "tester",
    creationDate: "{{$timestamp}}",
    activated: true,
    currentLocation: "US",
    bio: "Im the best test user",
    friends: ["67c93c4654dbccdef72e30d9","67c93c4654dbccdef72e30d9"]
}

module.exports = { reqCreateUser, reqUpdateUser };