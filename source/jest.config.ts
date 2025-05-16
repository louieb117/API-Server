export default {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    testEnvironment: 'node',
    testPathIgnorePatterns: [
        "/__tests__/user.test.js"
    ],
    moduleDirectories: [
        'node_modules'
    ],
};