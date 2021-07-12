const database = require('../routes/connect_database');

class User {
    constructor({email = '', password = '', id = 0}) {
        this.email = email;
        this.password = password;
        this.id = id;
        this.createAt = new Date();
        this.updateAt = new Date();
    }

    registration() {
        return database.execute('INSERT INTO ` ` (email, password, createAt, updateAt) VALUES(?, ?, ?, ?)',
        [this.email, this.password, this.createAt, this.updateAt]);
    }

    static find_user_by_email ({email = ''}) {
        return database.execute('SELECT * FROM ` ` WHERE user_collections.email = ?', [email]);
    }
}

module.exports = User;
