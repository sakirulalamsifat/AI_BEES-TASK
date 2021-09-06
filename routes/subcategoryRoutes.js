import express from 'express'
const router = express.Router()
import {
  getSubCategory,getSubCategoryById,deleteSubCategory,createSubCategory
} from '../controllers/subcatagoryController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/create').post(protect, admin, createSubCategory)
router.route('/').get(protect, getSubCategory)
router
  .route('/:id')
  .get(protect, getSubCategoryById)
  .delete(protect, admin, deleteSubCategory)

export default router
