const mockSettingsID = "64b7f0c8e4b0f5a1c2d3e4f5"; 

const mockSettingsResponse = {
    _id: mockSettingsID,
    theme: "dark",
    notifications: true,    
    language: "en",
    privacy: {
        profileVisibility: "public",
        dataSharing: false
    },
};

module.exports = {
    mockSettingsID,
    mockSettingsResponse
};