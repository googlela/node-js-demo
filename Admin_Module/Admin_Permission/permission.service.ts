const config = require('config.json');
const jwt = require('jsonwebtoken');
const db = require('../../_helper/db');
const db_permisiion = db.Permission;
var dec= require('../encryption')

module.exports = {
    permission_create,
}

async function permission_create(enc,userparams){
    let enca = dec.decrypt(enc)
    console.log(enca)
   var data = await db_permisiion.find({'permission_controller':userparams.permission_controller})
   
    if(data.length == 0){
        let data = await new db_permisiion(userparams).save();
        if(data)
        {
            return data
        }
        else{
            return "failed to add"
        }
    }
    else{
        return "permission control name must be unique"
    }
}