import express from 'express'
const router = express.Router()
import {
  registerCustomer
} from '../controllers/customerController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(protect,registerCustomer)


export default router