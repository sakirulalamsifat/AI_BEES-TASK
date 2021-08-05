import pkg from 'sequelize';

import db from '../config/db.js'
import bcrypt from 'bcryptjs'

const { Sequelize, DataTypes } = pkg;

const User = db.define('User', {
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull:false
    },
    userName: {
        type: DataTypes.STRING,
      allowNull:false
    },
    password:{
        type: DataTypes.STRING,
      allowNull:false
    }
});
  
  // `sequelize.define` also returns the model
  User.sync().then(() => {
    console.log('table created');
  });
 export default User