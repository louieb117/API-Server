db = db.getSiblingDB('appdb'); // Switch to the 'app' database
db.createCollection('dummyCollection'); // Create a dummy collection to ensure the database is created