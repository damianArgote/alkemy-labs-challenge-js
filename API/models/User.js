const Sequelize = require('sequelize');
const db = require('../config/database');
const bcrypt = require('bcrypt-nodejs');
const Application = require('./Application');
const passport = require('passport');

const User = db.define('user',{
    id:{
        type:Sequelize.INTEGER(11),
        primaryKey:true,
        autoIncrement:true
      },
    role: Sequelize.STRING(20),
    email:{
        type: Sequelize.STRING(60),
        allowNull:false
    },
    username:{
        type:Sequelize.STRING(60),
        allowNull:false
    },
    password:{
        type:Sequelize.STRING(60),
        allowNull:false
    }
},{
    hooks:{
        beforeCreate(user){
            user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
        }
    }
});

User.prototype.checkPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

User.hasMany(Application);

module.exports=User;