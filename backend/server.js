const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/admin/items', require('./routes/itemRoutes'))
app.use('/api/admin/category', require('./routes/categoryRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server start on port ${port}`))
