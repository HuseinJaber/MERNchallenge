const asyncHandler = require('express-async-handler')

const Item = require('../models/itemModel')



const getItems = asyncHandler (async (req, res) => {
    const items = await Item.find()
// { category: req.category.title }
    res.status(200).json(items)
})

const setItem = asyncHandler (async (req, res) => {
    const {name, description, price, image, category } = req.body
    if(!name || !description || !price || !image || !category){
        res.status(400)
        throw new Error('Please add all fields')
    }
    const itemExists = await Item.findOne({name}) 
    if (itemExists){
        res.status(400)
        throw new Error('Item already exists')
    }

    const item = await Item.create({
        name ,
        description ,
        price ,
        image ,
        category
    })
    if (item){
    res.status(201).json({
        _id : item.id,
        name : item.name,
        description : item.description,
        price: item.price,
        image: item.image,
        category: category.title
    })
    }else{
        res.status(400)
        throw new Error('Invalid Item data')
    }
})

const updateItem = asyncHandler (async (req, res) => {
    const item = await Item.findById(req.params.name)

    if(!item){
        res.status(401)
        throw new Error('Item not found')
    }

    const updatedItem = await Item.findByIdAndUpdate(req.params.name, req.body, {new: true})

    res.status(200).json(updatedItem)
})

const deleteItem = asyncHandler (async (req, res) => {
    const item = await Item.findById(req.params.name)

    if(!item){
        res.status(401)
        throw new Error('Item not found')
    }

    await item.remove()

    res.status(200).json({ item: req.params.name })
})

module.exports = {
    getItems,
    setItem,
    updateItem,
    deleteItem
}