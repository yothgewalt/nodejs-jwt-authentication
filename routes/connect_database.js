const database = require("mysql2");

const storage = database.createPool({
    host: '127.0.0.1',
    user: 'root',
    database: 'sample_authentication',
    password: 'First@14131413',
    port: 3306
});

module.exports = storage.promise();