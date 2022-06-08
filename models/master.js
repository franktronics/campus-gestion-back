const mongoose = require('mongoose')
const { Schema } = mongoose

const master = new Schema({
    identifier: {type: String, required: true},
    password: {type: String, required: true},
    fac: [{
        id: {type: String, required: true},
        title: {type: String, required: true}
    }],
    fil: [{
        id: {type: String, required: true},
        title: {type: String, required: true},
        facId: {type: String, required: true}
    }]
})

module.exports = mongoose.model('master', master)