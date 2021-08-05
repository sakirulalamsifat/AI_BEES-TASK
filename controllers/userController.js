import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/User.js'
import bcrypt from 'bcrypt'

const authUser = asyncHandler(async (req, res) => {
    const { userName, password } = req.body
  
    const user = await User.findOne({ where: { userName }})
   
        if (user && password===user.password) {
            res.json({
                _id: user._id,
                userName: user.userName,
                firstName: user.firstName,
                lastName: user.lastName,
                token: generateToken(user._id),
            })
        }
    
       
           else {
            res.status(401)
            throw new Error('Invalid user name or password')
          }
    
  
    
})
  
const registerUser = asyncHandler(async (req, res) => {
    const { userName, firstName, lastName, password } = req.body
  
    const userExists = await User.findOne({ where:{userName}  })
  
    if (userExists) {
      res.status(400)
      throw new Error('User already exists')
    }
  
    const user = await User.create({
        userName,
      firstName,
      lastName,
      password,
    })
  
    if (user) {
      res.status(201).json({
        _id: user._id,
        userName: user.userName,
          firstName: user.firstName,
        lastName:user.lastName,
        
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  })
export {authUser,registerUser}
  