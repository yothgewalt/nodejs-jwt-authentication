const express = require('express');

const router = express.Router();
const { registration_controller, login_controller } = require('../controller/user_controller');

router.get('/', (req, res, next) => {
    res.send('USER API');
});

router.post('/registration', registration_controller);
router.post('/login', login_controller);

module.exports = router;