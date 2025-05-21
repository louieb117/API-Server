export default {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    testEnvironment: 'node',
    testPathIgnorePatterns: [
        "/__tests__/Middleware_testing/validation_testing/user.test.js",
        "/__tests__/Middleware_testing/validation_testing/login.test.js",
        "/__tests__/Middleware_testing/authMiddleware.test.js",
        "/__tests__/Middleware_testing/error.test.js",
        "/__tests__/user.test.js"
    ],
    moduleDirectories: [
        'node_modules'
    ],
};