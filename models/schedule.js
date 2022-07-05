const mongoose = require('mongoose')
const { Schema } = mongoose

const schedule = new Schema({
    path: {type: String, required: true},
    lundi: [{
        mat: {type: String, required: true},
        ens: {type: String, required: true},
        room: {type: String, required: true},
    }],
    mardi: [{
        mat: {type: String, required: true},
        ens: {type: String, required: true},
        room: {type: String, required: true},
    }],
    mercredi: [{
        mat: {type: String, required: true},
        ens: {type: String, required: true},
        room: {type: String, required: true},
    }],
    jeudi: [{
        mat: {type: String, required: true},
        ens: {type: String, required: true},
        room: {type: String, required: true},
    }],
    vendredi: [{
        mat: {type: String, required: true},
        ens: {type: String, required: true},
        room: {type: String, required: true},
    }],
    samedi: [{
        mat: {type: String, required: true},
        ens: {type: String, required: true},
        room: {type: String, required: true},
    }],
    dimanche: [{
        mat: {type: String, required: true},
        ens: {type: String, required: true},
        room: {type: String, required: true},
    }],
})

module.exports = mongoose.model('schedule', schedule)