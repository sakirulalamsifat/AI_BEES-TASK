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
      allowNull: false,
      validate: {
        isSix(value) {
          if (value.length < 6) {
            throw new Error('userName Must be bigger then 6 letters');
          }
        }
      }
    },
    password:{
        type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isSix(value) {
          if (value.length < 8) {
            throw new Error('Password minimum 8 charecter ');
          }
        }
      }
    }
},{hooks: {
  beforeCreate: (user) => {
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(user.password, salt);
  }
},
instanceMethods: {
  validPassword: function(password) {
    return bcrypt.compareSync(password, this.password);
  }
}   });
  
  // `sequelize.define` also returns the model
  User.sync().then(() => {
    console.log('table created');
  });
 export default User