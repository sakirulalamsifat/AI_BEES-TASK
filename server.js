
import express from 'express'
import dotenv from 'dotenv'

import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import  db  from './config/db.js'

import userRoutes from './routes/userRoutes.js'
import customerRoutes from './routes/customerRoutes.js'



dotenv.config()
// Database


// Test DB
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err))



const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.use('/user', userRoutes)
app.use('/customer',customerRoutes)





app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)
