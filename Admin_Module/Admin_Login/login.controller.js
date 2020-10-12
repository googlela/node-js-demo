const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const loginService = require('./login.service.ts');

router.post('/authenticate', authenticate);


module.exports = router;
//login authenticate function
function authenticate(req, res, next) {
    
     loginService.authenticate(req.body)
        .then(user => user ? res.send(user) : res.status(400).send({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}