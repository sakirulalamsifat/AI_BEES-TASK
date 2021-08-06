// external imports
import { check, validationResult } from 'express-validator'


// internal imports
import User from '../models/User.js'

// add user
const addUserValidators = [
  check("userName")
    .isLength({ min: 6 })
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabet")
    .trim(),
  check("password")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
    ),
];

export{addUserValidators}