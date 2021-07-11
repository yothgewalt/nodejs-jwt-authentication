const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user_model = require('../model/user_model');

exports.registration_controller = (req, res, next) => {
    const { email, password } = req.body;
    user_model.find_user_by_email({ email: email })
        .then(([row]) => {
            if (row.length === 1) {
                return res.status(401).json({
                    message: "Authentication Failed"
                });
            } else {
                bcrypt.hash(password, 10)
                .then((hash) => {
                    const user = new user_model({ email: email, password: hash });
                    user.registration()
                        .then(() => {
                            res.status(201).json({
                                message: 'successfully'
                            });
                        }).catch((error) => {
                            res.status(500).json({
                                message: error
                            });
                        });
                }).catch((error) => {
                    res.status(500).json({
                        message: error
                    });
                });
            }
        }).catch((error) => {
            console.log(error);
        });
}

exports.login_controller = (req, res, next) => {
    const { email = '', password } = req.body;
    user_model.find_user_by_email({ email: email })
        .then(([row]) => {
            if (row.length !== 0) {
                return bcrypt.compare(password, row[0].password)
                    .then((result) => {
                        if (!result) {
                            res.status(401).json({
                                message: 'Authentication Failed'
                            });
                        } else {
                            let jwt_token = jwt.sign({
                                email: row[0].email,
                                user_id: row[0].id
                            },
                            'sample_authentication', {
                                expiresIn: '1h'
                            });
                            res.status(200).json({
                                token: jwt_token,
                                expiresIn: 3600
                            });
                        }
                    }).catch((erorr) => {
                        res.staus(401).json({
                            message: 'Authentication Failed',
                            error: erorr
                        });
                    });
            } else {
                res.status(401).json({
                    message: 'Authentication Failed'
                });
            }
        }).catch((erorr) => {
            res.status(500).json({
                message: erorr
            });
        });
}