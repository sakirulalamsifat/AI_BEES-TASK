import express from 'express'
const router = express.Router()
import {
  getCategory,
  getCategoryById,
  deleteCategory,
  createCategory,
} from '../controllers/categoryController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/create').post(protect, admin, createCategory)
router.route('/').get(protect, getCategory)
router
  .route('/:id')
  .get(protect, getCategoryById)
  .delete(protect, admin, deleteCategory)

export default router
