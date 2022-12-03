const asyncHandler = require('express-async-handler')

const Category = require('../models/categoryModel')



const getCategory = asyncHandler (async (req, res) => {
    const category = await Category.find()

    res.status(200).json(category)
})

// const getAllItems = asyncHandler (async (req, res) => {
//     const category = await Category.find({ item: req.body.category })

//     res.status(200).json(category)
// })



const setCategory = asyncHandler (async (req, res) => {
    const {title, icon } = req.body
    if(!title || !icon){
        res.status(400)
        throw new Error('Please add all fields')
    }

    const categoryExists = await Category.findOne({title}) 
    if (categoryExists){
        res.status(400)
        throw new Error('Category already exists')
    }
    

    const category = await Category.create({
        title,
        icon,
    })
    if (category) {
    res.status(201).json({
        _id: category._id,
        title: category.title,
        icon: category.icon
    })
    }else{
        res.status(400)
        throw new Error('Invalid category data')
    }
})

const updateCategory = asyncHandler (async (req, res) => {
    const category = await Category.findById(req.params.title)

    if(!category){
        res.status(401)
        throw new Error('Category not found')
    }

    const updatedCategory = await Category.findByIdAndUpdate(req.params.title, req.body, {new: true})

    res.status(200).json(updatedCategory)
})

const deleteCategory = asyncHandler (async (req, res) => {
    const category = await Category.findById(req.params.name)

    if(!category){
        res.status(401)
        throw new Error('Category not found')
    }

    await category.remove()

    res.status(200).json({ Category: req.params.name })
})

module.exports = {
    getCategory,
    setCategory,
    updateCategory,
    deleteCategory
}