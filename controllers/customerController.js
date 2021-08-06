import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import Customer from '../models/Customer.js'



const registerCustomer = asyncHandler(async (req, res) => {
    const { mobile, firstName, lastName, address,postcode } = req.body
  
    const customerExists = await Customer.findOne({ where:{mobile}  })
  
    if (customerExists) {
      res.status(400)
      throw new Error('customer already exists')
    }
  
    const customer = await Customer.create({
        mobile, firstName, lastName, address,postcode
    })
  
    if (customer) {
      res.status(201).json({
        _id: customer._id,
        mobile: customer.mobile,
          firstName: customer.firstName,
          lastName: customer.lastName,
        postcode:customer.postcode,
        
        token: generateToken(customer._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  })
export {registerCustomer}
  