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
        return database.execute('INSERT INTO `user_collections` (email, password, createAt, updateAt) VALUES(?, ?, ?, ?)',
        [this.email, this.password, this.createAt, this.updateAt]);
    }

    static find_user_by_email ({email = ''}) {
        return database.execute('SELECT * FROM `user_collections` WHERE user_collections.email = ?', [email]);
    }
}

module.exports = User;