require('dotenv').config({path: '.env'})
const Master = require('../models/master')
const Ens = require('../models/enseignant')
const Mat = require('../models/matiere')
const Room = require('../models/classe')
const Schedule = require('../models/schedule')


const HOURS = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]
const DAYS_NAME = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']
const initTab = (n = HOURS.length) => {
    let tab = []
    for(let i = 0; i < n; i++){
        tab.push({
            mat: 'none',
            ens: 'none',
            room: 'none'
        })
    }
    return tab
}

exports.addSchedule = (req, res, next) => {

    console.log(req.body)
}
exports.getScheduleUtils = async (req, res, next) => {
    try {
        let resEns = []
        let resMat = []
        let resRoom = []
        await Ens.find()
        .then(r => resEns = r)

        await Mat.find()
        .then(r => resMat = r)

        await Room.find()
        .then(r => resRoom = r)

        res.status(200).json({ens: resEns, mat: resMat, room: resRoom})
    } catch (err) {
        res.status(500).json({ err })
    }
}
/**
 * 
 * @param {Object} req 
 * @param {string} req.body.path
 * @param {string} req.body.mat
 * @param {string} req.body.ens
 * @param {string} req.body.room
 * @param {string} req.body.day
 * @param {string} req.body.hour
 */
exports.postSchedule = (req, res, next) => {
    Schedule.findOne({path: req.body.path})
    .then(sch => {
        if(!sch){ //on cree la ligne ici
            let data = {
                path: req.body.path,
                lundi: initTab(),
                mardi: initTab(),
                mercredi: initTab(),
                jeudi: initTab(),
                vendredi: initTab(),
                samedi: initTab(),
                dimanche: initTab()
            }
            console.log('Add schedule', req.body)
            data[`${DAYS_NAME[req.body.day - 1]}`][HOURS.indexOf(req.body.hour)] = {
                mat: req.body.mat,
                ens: req.body.ens,
                room: req.body.room
            }
            const newSchedule = new Schedule(data)
            newSchedule.save()
            .then(() => {res.status(200).json({
                message: "Programme enregistré !"
            })})
            .catch(error => {
                console.log('Erreur d\'ajout de schedule', error)
                res.status(501).json( error )
            })
        } else { 
            let day = DAYS_NAME[req.body.day - 1]
            let newTab = sch[`${day}`]
            newTab[HOURS.indexOf(req.body.hour)] = {
                mat: req.body.mat,
                ens: req.body.ens,
                room: req.body.room
            }
            Schedule.updateOne({path: req.body.path}, {$set: {[`${day}`]: newTab}})
            .then(() => {
                res.status(200).json({message: "Enregistré avec succes"})
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
        }
    })
    .catch(err => {
        console.log('Erreur d\'ajout de schedule', err)
        res.status(500).json(err)
    })
}

exports.getAllSchedule = (req, res, next) => {
    Schedule.find()
    .then(data => {
        res.status(200).json(data)
    })
    .catch(err => res.status(400).json(err))
}