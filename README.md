<h1 align="center">JWT Authentication (Very Simple)</h1>

<p align="center">
  <img src="https://jwt.io/img/pic_logo.svg" alt="jwt" with="128" height="128" /><br>
  <i>
    JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained <br> way for securely transmitting information between parties as a JSON object. This information can be verified and trusted <br>because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) <br>or a public/private key pair using RSA or ECDSA.
  </i>
</p>

<p align="center">
  <a href="https://jwt.io/introduction"><strong>https://jwt.io/introduction</strong></a>
</p>

<hr>

## Getting started

Before you start You have to install all necessary packages first. (Because I have removed node_modules for easy download)

```
npm install
```

After you have installed the package You can call http_server to use the API now.

```
npm start
```


* Remember to set Database and Execute for Database in Model

routes/connect_database.js
```js
const database = require("mysql2");

const storage = database.createPool({
    host: '<Your hostname>',
    user: '<Your username>',
    database: '<Your database>',
    password: '<Your password>',
    port: 3306
});

module.exports = storage.promise();
```

model/user_model.js
```js
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
        return database.execute('INSERT INTO `<Your table>` (email, password, createAt, updateAt) VALUES(?, ?, ?, ?)',
        [this.email, this.password, this.createAt, this.updateAt]);
    }

    static find_user_by_email ({email = '<Your table>'}) {
        return database.execute('SELECT * FROM `user_collections` WHERE user_collections.email = ?', [email]);
    }
}

module.exports = User;
```

## Routes

If you want to register use this path.

```
/api/registration
```

If you want to login use this path

```
/api/login
```

## Testing Tools

You can use any program that can test the API, but I recommend using Postman.
Postman: https://www.postman.com/downloads/
