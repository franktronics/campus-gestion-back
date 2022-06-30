const mongoose = require('mongoose')
const { Schema } = mongoose

const enseignant = new Schema({
    name: {type: String, required: true},
    firstname: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    grade: {type: String, required: true},
    password: {type: String, required: true},
    identifier: {type: String, required: true},
    date: {type: Number, required: true}
})

module.exports = mongoose.model('enseignant', enseignant)