// Controller for testing settings validators
const {
    createUserSettings,
    getAllSettings, 
    getUserSettings,
    updateUserSettings
} = require('../../controllers/settingsController');

// Mock data
const { reqUpdateSettings } = require('../../utils/data/settings.test.data.js');
const { mockSettingsId, mockSettingsResponse } = require('../../utils/data/settings.mock.data.js');

// Mocks
jest.mock('../../models/settings.js', () => {
    const mockSave = jest.fn();
    const mockSettingsConstructor = jest.fn(() => ({
        save: mockSave
    }));

    mockSettingsConstructor.find = jest.fn();
    mockSettingsConstructor.findById = jest.fn();
    mockSettingsConstructor.findByIdAndUpdate = jest.fn();

    return mockSettingsConstructor;
});

const {
    validateSettingsInDatabase, 
    validateSettingsUpdate
} = require('../../middlewares/validators/settingsValidators.js');

jest.mock('../../middlewares/validators/settingsValidators.js', () => ({
    validateSettingsInDatabase: jest.fn(),
    validateSettingsUpdate: jest.fn()
}));

beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
});

// Tests

describe('\nSettings Controller Tests\n', () => {
const Settings = require('../../models/settings.js');
    // 1. createUserSettings
    describe('1. createUserSettings', () => {
        test('should create new user settings with default values', async () => {
            const mockSave = jest.fn();
            Settings.mockImplementation(() => ({ save: mockSave }));
            validateSettingsInDatabase.mockResolvedValue({ isValid: true });

            const req = { body: {} };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            
            await createUserSettings(req, res);

            expect(validateSettingsInDatabase).toHaveBeenCalled();
            expect(mockSave).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: "New Settings Created!"
            }));
        });
    });

    // 2. updateUserSettings
    describe('2. updateUserSettings', () => {
        test('should update existing user settings if valid', async () => {
            validateSettingsInDatabase.mockResolvedValue({ isValid: true });
            validateSettingsUpdate.mockResolvedValue({ isValid: true });
            Settings.findByIdAndUpdate.mockResolvedValue({ ...mockSettingsResponse, ...reqUpdateSettings });

            const req = { params: { id: mockSettingsId }, body: reqUpdateSettings };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await updateUserSettings(req, res);

            expect(validateSettingsInDatabase).toHaveBeenCalledWith(mockSettingsId);
            expect(validateSettingsUpdate).toHaveBeenCalledWith(reqUpdateSettings);
            expect(Settings.findByIdAndUpdate).toHaveBeenCalledWith(
                mockSettingsId,
                { $set: reqUpdateSettings },
                { new: true }
            );
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: "Settings Updated!"
            }));
        });
        test('should return 400 if an exception is thrown', async () => {
            validateSettingsInDatabase.mockResolvedValue({ isValid: true });
            validateSettingsUpdate.mockResolvedValue({ isValid: true });
            Settings.findByIdAndUpdate.mockRejectedValue(new Error('DB update error'));

            const req = { params: { id: mockSettingsId }, body: reqUpdateSettings };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await updateUserSettings(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'DB update error' });
        });
    });

    // 3. getAllSettings
    describe('3. getAllSettings', () => {
        test('should retrieve all settings in the database', async () => {
            Settings.find.mockResolvedValue([mockSettingsResponse]);

            const req = {};
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await getAllSettings(req, res);

            expect(Settings.find).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([mockSettingsResponse]);
        });

        test('should return 500 if an exception is thrown', async () => {
            Settings.find.mockRejectedValue(new Error('DB fetch error'));

            const req = {};
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await getAllSettings(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'DB fetch error' });
        });
    });

    // 4. getUserSettings
    describe('4. getUserSettings', () => {
        test('should retrieve user settings if valid', async () => {
            validateSettingsInDatabase.mockResolvedValue({ isValid: true, settings: mockSettingsResponse });

            const req = { params: { id: mockSettingsId } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await getUserSettings(req, res);

            expect(validateSettingsInDatabase).toHaveBeenCalledWith(mockSettingsId);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockSettingsResponse);
        });

        test('should return 404 if settings not found', async () => {
            validateSettingsInDatabase.mockResolvedValue({ isValid: false, message: 'Settings not found' });

            const req = { params: { id: mockSettingsId } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await getUserSettings(req, res);

            expect(validateSettingsInDatabase).toHaveBeenCalledWith(mockSettingsId);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Settings not found' });
        });

        test('should return 404 if an exception is thrown', async () => {
            validateSettingsInDatabase.mockRejectedValue(new Error('DB fetch error'));

            const req = { params: { id: mockSettingsId } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await getUserSettings(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'DB fetch error' });
        });
    });
});
