const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { MongoClient } = require('mongodb');

let connection;
let mongoServer;

const connect = async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    connection = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

const closeDatabase = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
};

const clearDatabase = async () => {
    const collections = mongoose.connection.collections;
    for (const key of collections) {
        await collections[key].deleteMany({});
    }
};
module.exports = {
    connect,
    closeDatabase,
    clearDatabase,
};