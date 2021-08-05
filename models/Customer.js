import pkg from 'sequelize';

import db from '../config/db.js'

const { Sequelize, DataTypes } = pkg;


const Customer = db.define('Customer', {
    // Model attributes are defined here
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mobile: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    postcode: {
        type: DataTypes.NUMBER,
        allowNull:false
    }

});
  
  // `sequelize.define` also returns the model
  Customer.sync().then(() => {
    console.log('table created');
  });
 export default Customer