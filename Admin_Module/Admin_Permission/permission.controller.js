const express = require('express');
const router = express.Router();
const dec = require('../encryption')
const jwt = require('jsonwebtoken');
const permissionservice = require('./permission.service.ts')
router.post('/createpermission', createpermission);

module.exports = router;

async function createpermission(req,res,next){
    console.log((jwt.decode(req.token)))
   await permissionservice.permission_create(req.body)
    .then(role => role ? res.send({status:200,result:role}) : res.status(400).send({ message: 'Permission creation failed'}))
    .catch(err => next(err));
}