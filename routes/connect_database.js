const database = require("mysql2");

const storage = database.createPool({
    host: ' ',
    user: ' ',
    database: ' ',
    password: ' ',
    port: 3306
});

module.exports = storage.promise();
