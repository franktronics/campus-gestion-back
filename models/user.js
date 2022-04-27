const mongoose = require('mongoose')
const { Schema } = mongoose

const user = new Schema({
    date: {type: Number, required: true},
    birthdayJ: {type: String, required: true},
    birthdayM: {type: String, required: true},
    birthdayA: {type: String, required: true},
    bornat: {type: String, required: true},
    faculty: {type: String, required: true},
    firstname: {type: String, required: true},
    level: {type: String, required: true},
    matricule: {type: String, required: true},
    name: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    speciality: {type: String, required: true},
    pseudo: {type: String, required: true},
    imgProfil: {type: String, required: false},
    password: {type: String, required: true},
    email: {type: String, required: true},
})

module.exports = mongoose.model('user', user)