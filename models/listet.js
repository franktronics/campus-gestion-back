const mongoose = require('mongoose')
const { Schema } = mongoose

const listet = new Schema({
    matricule: {type: String, required: true},
    email: {type: String, required: true}
})

module.exports = mongoose.model('listet', listet)