require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./_helper/jwt');
const errorHandler = require('./_helper/errorhandler');


app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.use(cors());
// use JWT auth to secure the api
app.use(jwt());

app.use('/role', require('./Admin_Module/Admin_Role/role.controller'));
app.use('/adminusers', require('./Admin_Module/Admin_Login/login.controller'));
app.use('/permission', require('./Admin_Module/Admin_Permission/permission.controller'));
app.use('/role_permission',require('./Admin_Module/Permission_Role/permission_role.controller'))
// global error handler
app.use(errorHandler);

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});