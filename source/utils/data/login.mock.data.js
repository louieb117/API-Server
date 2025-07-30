const mockUserJsonObject = {
    _id: "685e20eeb401f750303a83a1",
    fullName: "Fin The Human",
    phoneNumber: "(619)969-6666",
    email: "Fin.tester@potentiamaxima.com",
    username: "Fin.tester",
    role: "tester",
    creationDate: "1750999277",
    activated: true,
    currentLocation: "US",
    friends: [],
    __v: 0
};


const mockLoginResponse01 = {
    message: "Login successful",
    data: { mockUserJsonObject },
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODVlMjBlZWI0MDFmNzUwMzAzYTgzYTEiLCJmdWxsTmFtZSI6IkZpbiBUaGUgSHVtYW4iLCJwaG9uZU51bWJlciI6Iig2MTkpOTY5LTY2NjYiLCJlbWFpbCI6IkZpbi50ZXN0ZXJAcG90ZW50aWFtYXhpbWEuY29tIiwidXNlcm5hbWUiOiJGaW4udGVzdGVyIiwicm9sZSI6InRlc3RlciIsImNyZWF0aW9uRGF0ZSI6IjE3NTA5OTkyNzciLCJhY3RpdmF0ZWQiOnRydWUsImN1cnJlbnRMb2NhdGlvbiI6IlVTIiwiZnJpZW5kcyI6W10sIl9fdiI6MCwiaWF0IjoxNzUxNDI0ODU4LCJleHAiOjE3NTE0Mjg0NTh9.TAi2ryenFiGzj1SztelKX8pELmuUDLSb7fY9q40csHg"
};

const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODVlMjBlZWI0MDFmNzUwMzAzYTgzYTEiLCJmdWxsTmFtZSI6IkZpbiBUaGUgSHVtYW4iLCJwaG9uZU51bWJlciI6Iig2MTkpOTY5LTY2NjYiLCJlbWFpbCI6IkZpbi50ZXN0ZXJAcG90ZW50aWFtYXhpbWEuY29tIiwidXNlcm5hbWUiOiJGaW4udGVzdGVyIiwicm9sZSI6InRlc3RlciIsImNyZWF0aW9uRGF0ZSI6IjE3NTA5OTkyNzciLCJhY3RpdmF0ZWQiOnRydWUsImN1cnJlbnRMb2NhdGlvbiI6IlVTIiwiZnJpZW5kcyI6W10sIl9fdiI6MCwiaWF0IjoxNzUxNDI0ODU4LCJleHAiOjE3NTE0Mjg0NTh9.TAi2ryenFiGzj1SztelKX8pELmuUDLSb7fY9q40csHg";


module.exports = {
    mockLoginResponse01,
    mockUserJsonObject,
    mockToken
};