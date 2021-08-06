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
        type: DataTypes.REAL,
        allowNull: false,
        validate: {
            isNumber(value) {
              if (value.length <=12) {
                throw new Error('Phone Must be 10 to 12 Number');
              }
            }
          }
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    postcode: {
        type: DataTypes.REAL,
        allowNull:false
    }

});
  
  // `sequelize.define` also returns the model
  Customer.sync().then(() => {
    console.log('table created');
  });
 export default Customer