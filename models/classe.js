const mongoose = require('mongoose')
const { Schema } = mongoose

const classe = new Schema({
    room: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: Number, required: true}
})

module.exports = mongoose.model('classe', classe)