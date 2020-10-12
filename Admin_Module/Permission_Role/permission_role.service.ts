const config = require('config.json');
const jwt = require('jsonwebtoken');
const db = require('../../_helper/db');
const db_permission_role = db.permission_role;

module.exports = {
    permission_rolecreate,
}

async function permission_rolecreate(userparams){

   
        let data = await new db_permission_role(userparams).save();
        if(data)
        {
            return data
        }
        else{
            return "failed to add"
        }
       
}