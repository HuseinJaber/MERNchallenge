const express = require('express');
const router = express.Router()
const {getItems, setItem, updateItem, deleteItem} = require("../controllers/itemController")

router.get('/', getItems)

router.post('/', setItem)

router.put('/:name', updateItem)

router.delete('/:name', deleteItem)

module.exports = router