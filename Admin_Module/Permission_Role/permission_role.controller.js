const express = require('express');
const router = express.Router();

const permission_roleservice = require('./permission_role.service.ts')
router.post('/createpermissionrole', createpermission);

module.exports = router;

async function createpermission(req,res,next){
    console.log("Aaa")
   await permission_roleservice.permission_rolecreate(req.body)
    .then(role => role ? res.send({status:200,result:role}) : res.status(400).send({ message: 'Permission creation failed'}))
    .catch(err => next(err));
}