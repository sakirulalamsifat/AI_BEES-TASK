import asyncHandler from 'express-async-handler'
import Product from '../models/Product.js'
import SubCategory from '../models/Subcategory.js'

const getProduct = asyncHandler(async (req, res) => {
  const products = await Product.find()
  const category = await SubCategory.findById(product.subCategory._id).populate(
    'category',
    'discount'
  )

  res.json({ products })
})

// @desc    Fetch single Product
// @route   GET /api/Products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Delete a Product
// @route   DELETE /api/Products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Create a Product
// @route   POST /api/Products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const { name, discount, discountEnable, subCategory, price } = req.body

  const product = await Product.create({
    name,
    discount,
    discountEnable,
    subCategory,
    price,
  })
  if (product) {
    res.status(201).json({
      _id: product._id,
      name: product.name,
      discount: product.discount,
      discountEnable: product.discountEnable,
      subCategory: product.subCategory,
      price: product.price,
    })
  } else {
    res.status(400)
    throw new Error('Invalid Product data')
  }
})

const getProductsDiscount = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate('subCategory', 'discount')
    .populate('category', 'discount')
  const category = await SubCategory.findById(product.subCategory._id).populate(
    'category',
    'discount'
  )
  if (product) {
    if (product.discount !== 0 && product.discountEnable === true) {
      const discountAmount = Number((product.price * product.discount) / 100)
      const finalPrice = Number(product.price - discountAmount)
      console.log(product)
      res.status(201).json({
        price: product.price,
        discountedPrice: JSON.stringify(finalPrice),
        discount: product.discount + '%',
      })
    }

    if (
      (product.discount === 0 && product.subCategory.discount !== 0) ||
      product.discountEnable === false
    ) {
      const discountAmount = Number(
        (product.price * product.subCategory.discount) / 100
      )
      const finalPrice = Number(product.price - discountAmount)
      console.log(product)
      res.status(201).json({
        price: product.price,
        discountedPrice: JSON.stringify(finalPrice),
        discount: product.subCategory.discount + '%',
      })
    }

    if (
      product.subCategory.discount === 0 ||
      product.subCategory.discountEnable === false
    ) {
      const discountAmount = Number(
        (product.price * category.category.discount) / 100
      )
      const finalPrice = Number(product.price - discountAmount)
      console.log(product)
      res.status(201).json({
        price: product.price,
        discountedPrice: JSON.stringify(finalPrice),
        discount: category.category.discount + '%',
      })
    } else {
      res.status(201).json({
        price: product.price,
        discount: 'No discounts Available',
      })
    }
  } else {
    res.status(400)
    throw new Error('Invalid Product data')
  }
})

export {
  createProduct,
  getProduct,
  getProductById,
  deleteProduct,
  getProductsDiscount,
}
