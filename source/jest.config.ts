export default {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    testEnvironment: 'node',
    testPathIgnorePatterns: [

        // Comment the test(s) you want to run
        // Validators 
        "__tests__/Middleware_testing/validators_testing/libraries_testing/scorecard_validator_lib.test.js",
        "__tests__/Middleware_testing/validators_testing/scorecard_validator.test.js",
        "__tests__/Middleware_testing/validators_testing/user_validator.test.js", 
        "__tests__/Middleware_testing/validators_testing/login_validator.test.js",

        // Controllers
        // "__tests__/Controller_testing/scorecard_controller.test.js",
        "__tests__/Controller_testing/user_controller.test.js",
        "__tests__/Controller_testing/login_controller.test.js",

        // Middleware
        "__tests__/Middleware_testing/authMiddleware.test.js",
        "__tests__/Middleware_testing/error.test.js",

        // __tests__
        "__tests__/user.test.js"
    ],
    moduleDirectories: [
        'node_modules'
    ],
};