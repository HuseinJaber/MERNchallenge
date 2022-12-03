const express = require('express');
const router = express.Router()
const {getCategory, setCategory, updateCategory, deleteCategory} = require("../controllers/categoryController")

router.get('/', getCategory)


router.post('/', setCategory)

router.put('/:title', updateCategory)

router.delete('/:title', deleteCategory)

module.exports = router