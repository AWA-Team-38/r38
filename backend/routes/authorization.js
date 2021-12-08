var express = require('express');
const { login, register } = require('../logic/auth');
var router = express.Router();

/* GET home page. */
router.post('/login', async function(req, res, next) {
    console.log(req.body)
    const username = req.body.username
    const password = req.body.password
    const response = await login(username, password) 
    res.json(response)
});

router.post('/register', async function(req, res, next) {
    console.log(req.body)
    const username = req.body.username
    const password = req.body.password
    const response = await register(username, password) 
    res.json(response)
});


module.exports = router;