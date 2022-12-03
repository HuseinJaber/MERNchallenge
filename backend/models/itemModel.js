const mongoose = require('mongoose')

const itemSchema = mongoose.Schema(
    {
    name: { type: String, required: [true, 'Please add a name' ], unique: true},
    description: String,
    price: Number,
    image: String,
    category: {type: mongoose.Schema.Types.String, required: true, ref: 'Category' },
}, {
    timestamps: true,
}) 

module.exports = mongoose.model('Item', itemSchema)