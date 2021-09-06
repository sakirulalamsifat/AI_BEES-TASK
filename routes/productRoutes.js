import express from 'express'
const router = express.Router()
import {
  getProduct,
  getProductsDiscount,
  getProductById,
  createProduct,
  deleteProduct,
} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/create').post(protect, admin, createProduct)
router.route('/').get(protect, getProduct)
router
  .route('/:id')
  .get(protect, getProductById)
  .delete(protect, admin, deleteProduct)

router.route('/:id/getprice').get(protect, getProductsDiscount)

export default router
