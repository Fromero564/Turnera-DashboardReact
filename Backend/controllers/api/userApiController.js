const path = require('path');
const db = require('../../src/database/models');
const sequelize = db.sequelize;
const { Op, where } = require("sequelize");
const moment = require('moment');
const req = require('express/lib/request');
const { route } = require('../../routers/mainRouter');



const User = db.User;


const userAPIController = {
    usuarioCreado: (req, res) => {
        User.create({
            
        })
        .then(user => {
           
            req.session.user = user;  

            return res.redirect('/');
        })
        .catch(error => res.send(error));
    },
}
module.exports = userAPIController;