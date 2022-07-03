const mongoose = require('mongoose')
const { Schema } = mongoose

const matiere = new Schema({
    fac: {type: String, required: true},
    fil: {type: String, required: true},
    niv: {type: String, required: true},
    intitled: {type: String, required: true},
    code: {type: String, required: true},
})

module.exports = mongoose.model('matiere', matiere)