const Sequelize = require('sequelize');
const db = require('../config/database');

const Application = db.define('app',{
  id:{
    type:Sequelize.INTEGER(11),
    primaryKey:true,
    autoIncrement:true
  },
  category: Sequelize.STRING(100),
  name: Sequelize.STRING(100),
  price:Sequelize.DOUBLE,
  image: Sequelize.SMALLINT(100)
})


module.exports=Application;