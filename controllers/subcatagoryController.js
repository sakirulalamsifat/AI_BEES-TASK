import asyncHandler from 'express-async-handler'
import SubCategory from '../models/Subcategory.js'

const getSubCategory = asyncHandler(async (req, res) => {
  const subcategories = await SubCategory.find()

  res.json({ subcategories })
})

// @desc    Fetch single SubCategory
// @route   GET /api/SubCategorys/:id
// @access  Public
const getSubCategoryById = asyncHandler(async (req, res) => {
  const subCategory = await SubCategory.findById(req.params.id)

  if (subCategory) {
    res.json(subCategory)
  } else {
    res.status(404)
    throw new Error('subCategory not found')
  }
})

// @desc    Delete a SubCategory
// @route   DELETE /api/SubCategorys/:id
// @access  Private/Admin
const deleteSubCategory = asyncHandler(async (req, res) => {
  const subCategory = await SubCategory.findById(req.params.id)

  if (subCategory) {
    await subCategory.remove()
    res.json({ message: 'subCategory removed' })
  } else {
    res.status(404)
    throw new Error('subCategory not found')
  }
})

// @desc    Create a SubCategory
// @route   POST /api/SubCategorys
// @access  Private/Admin
const createSubCategory = asyncHandler(async (req, res) => {
  const { name, discount, discountEnable, category } = req.body
  const subCatagoryExists = await SubCategory.findOne({ name })
  if (subCatagoryExists) {
    res(400)
    throw new Error('SubCategory already exists')
  }

  const subCategory = await SubCategory.create({
    name,
    discount,
    discountEnable,
    category,
  })
  if (subCategory) {
    res.status(201).json({
      _id: subCategory._id,
      name: subCategory.name,
      discount: subCategory.discount,
      discountEnable: subCategory.discountEnable,
      category: subCategory.category,
    })
  } else {
    res.status(400)
    throw new Error('Invalid SubCategory data')
  }
})

export {
  createSubCategory,
  getSubCategory,
  getSubCategoryById,
  deleteSubCategory,
}
