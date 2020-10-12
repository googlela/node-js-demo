const config = require('config.json');
const jwt = require('jsonwebtoken');
const db = require('../../_helper/db');
var SHA256 = require("crypto-js/sha256");
const db_admin = db.Admin_User;
var sha512 = require('js-sha512');
var cryptoa = require('crypto');
var assert = require('assert');
var enc = require('../encryption')

module.exports = {
    authenticate,
}

async function authenticate({ username, password }) {

    const user = await db_admin.aggregate([
        {
            $match: {
                username: username,
                status: true
            }
        },
        {
            $lookup: {
                from: "tbl_roles",
                localField: "role_id",
                foreignField: "_id",
                as: "roles"
            }
        }
    ]);
    if (user[0]) {
        
        let user1 = user[0]
        let userid =user1._id.toString()
        
        let a=enc.encrypt(userid)
        console.log("encrypt",a)
         let b=enc.decrypt(a)
         console.log("decrypt",b)
        if (sha512(password) === user1['password']) {
            
           
            if (user1['roles'][0].role_status == true) {
                if (user1 && sha512(password)) {
                    user1= SHA256(user1);
                    const token = jwt.sign({ data: a}, config.secret, { expiresIn: '1 day' });
                    console.log('token',token);
                    return {
                        user,
                        token
                    };
                }
            }
            else {
                throw "your role is not active"
            }
        }
    }
    else {
        throw "login failed"
    }
}