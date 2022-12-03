const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    title: { type: String, required: [true, 'Please add a title' ], unique: true},
    icon: {type: String, required: [true, 'Please add an icon' ], unique: true },
    
}, {
    timestamps: true,
}) 

module.exports = mongoose.model('Category', categorySchema)