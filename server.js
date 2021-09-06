
import express from 'express'
import dotenv from 'dotenv'

import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import db from './config/db.js'
import connectDB from './config/db.js'

import userRoutes from './routes/userRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import subCategoryRoutes from './routes/subcategoryRoutes.js'
import productRoutes from './routes/productRoutes.js'




dotenv.config()
// Database


connectDB()



const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.use('/user', userRoutes)
app.use('/category', categoryRoutes)
app.use('/subcategory', subCategoryRoutes)
app.use('/product', productRoutes)






app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)
