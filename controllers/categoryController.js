import asyncHandler from 'express-async-handler'
import Category from '../models/Category.js'

const getCategory = asyncHandler(async (req, res) => {
  const categories = await Category.find()

  res.json({ categories })
})

// @desc    Fetch single category
// @route   GET /api/categorys/:id
// @access  Public
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id)

  if (category) {
    res.json(category)
  } else {
    res.status(404)
    throw new Error('category not found')
  }
})

// @desc    Delete a category
// @route   DELETE /api/categorys/:id
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id)

  if (category) {
    await category.remove()
    res.json({ message: 'category removed' })
  } else {
    res.status(404)
    throw new Error('category not found')
  }
})

// @desc    Create a category
// @route   POST /api/categorys
// @access  Private/Admin
const createCategory = asyncHandler(async (req, res) => {
  const { name, discount, discountEnable } = req.body
  const catagoryExists = await Category.findOne({ name })
  if (catagoryExists) {
    res(400)
    throw new Error('Category already exists')
  }

  const category = await Category.create({
    name,
    discount,
    discountEnable,
  })
  if (category) {
    res.status(201).json({
      _id: category._id,
      name: category.name,
      discount: category.discount,
      discountEnable: category.discountEnable,
    })
  } else {
    res.status(400)
    throw new Error('Invalid Category data')
  }
})

export { createCategory, getCategory, getCategoryById, deleteCategory }
