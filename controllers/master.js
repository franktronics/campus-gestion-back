const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config({path: '.env'})
const Master = require('../models/master')
const Ens = require('../models/enseignant')
const Mat = require('../models/matiere')
const Room = require('../models/classe')

const TOKENKEY = process.env.DB_TOKEN

exports.login = (req, res, next) => {
    Master.findOne({ identifier: req.body.identifier })
        .then(user => {
            if(!user){
                return res.status(200).json({ messageError: 'Compte non trouvé !'})
            }
            bcrypt.compare(req.body.password, user.password)
                .then( valid => {
                    if(!valid){
                        return res.status(200).json({ messageError: 'Mot de passe incorrect !'})
                    }
                    res.status(200).json({
                        message: 'Connexion réussie',
                        masterId: user._id,
                        token: jwt.sign(
                            { masterId: user._id}, /*donnees a encoder*/
                            ''+TOKENKEY+'', /*cle secrete pour l'encodage*/
                            { expiresIn: '24h'} /*periode de validite du token*/
                        )
                    })
                })
                .catch( error => {res.status(500).json({ error })})
        })
        .catch( error => {res.status(501).json({ error })})
}

exports.getData = (req, res, next) => {
    Master.findOne({id: req.query.id})
        .then(user => {
            if(!user){
                return res.status(200).json({ messageError: 'Ce compte admin n\'existe pas!'})
            }
            res.status(200).json(user)
        })
        .catch( error => {res.status(501).json({ error })})
}

exports.addFac = (req, res, next) => {
    Master.findOne({id: req.query.id})
        .then(user => {
            if(!user){
                return res.status(200).json({ messageError: 'Les données n\'ont pas été chargées'})
            }
            user.fac.forEach((f, k) => {
                if(f.title === req.body.name) res.status(200).json({ messageError: 'Ce nom existe deja'})
            })
            const index = parseInt(user.fac[user.fac.length - 1].id.split('fac')[1])
            Master.updateOne({id: req.query.id}, {$push: {fac: {id: `fac${index+1}`, title: req.body.name}}})
                .then(() => {res.status(200).json({
                    message: 'Faculté ajoutée',
                    id: `fac${index+1}`,
                    title: req.body.name
                })})
                .catch( error => {res.status(501).json({ error })})
        })
        .catch( error => {res.status(500).json({ error })})
}

exports.addFil = (req, res, next) => {
    Master.findOne({id: req.query.id})
        .then(user => {
            if(!user){
                return res.status(200).json({ messageError: 'Les données n\'ont pas été chargées'})
            }
            user.fil.forEach((f, k) => {
                if(f.title === req.body.name) res.status(200).json({ messageError: 'Ce nom existe deja'})
            })
            const index = parseInt(user.fil[user.fil.length - 1].id.split('fil')[1])
            Master.updateOne({id: req.query.id}, {$push: {fil: {id: `fil${index+1}`, title: req.body.name, facId: req.body.fac}}})
                .then(() => {res.status(200).json({
                    message: 'Filiere ajoutée',
                    id: `fil${index+1}`,
                    title: req.body.name,
                    facId: req.body.fac
                })})
                .catch( error => {
                    console.log(error)
                    res.status(501).json({ error })})
        })
        .catch( error => {
            console.log(error)
            res.status(500).json({ error })})
}

exports.addEns = (req, res, next) => {
    Ens.findOne({ identifier: req.body.identifier })
    .then(user => {
        if(!user){
            bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const date = Date.now()
                const ens = {
                    ...req.body,
                    password: hash,
                    grade: req.body.grade.toUpperCase(),
                    date: date
                }
                const newUser = new Ens(ens)
                newUser.save()
                .then(() => {res.status(200).json({
                    message: "Enseignant ajouté !",
                    ens: ens
                })})
                .catch(error => {res.status(500).json( error )})
            })
            .catch(error => {
                res.status(500).json( error )
            })
        }else{
            res.status(200).json({messageError: "Cet identifiant est deja utilisé"})
        }
    })
    .catch( error => {res.status(500).json({ error })})
}

exports.getEns = (req, res, next) => {
    Ens.find()
    .then(r => {
        let R = [...r]
        R.forEach((el, k) => {
            R[k].id = undefined
            R[k]._id = undefined
            R[k].__v = undefined
        })
        res.status(200).json({ens: R})
    })
    .catch(error => {res.status(500).json({ error })})
}

exports.deleteEns = (req, res, next) => {
    Ens.deleteOne({identifier: req.body.identifier})
    .then(() => {res.status(200).json({ message: 'Enseignant supprimé!' })})
    .catch(( error ) => {res.status(400).json( error )})
}

exports.addMat = (req, res, next) => {
    Mat.findOne({ code: req.body.code })
    .then(user => {
        console.log(user)
        if(!user || !(user.intitled === req.body.intitled && user.fil === req.body.fil && user.niv === req.body.niv)){
                const date = Date.now()
                const mat = {
                    ...req.body,
                    code: req.body.code.toUpperCase(),
                    intitled: req.body.intitled.toUpperCase(),
                    date: date
                }
                const newUser = new Mat(mat)
                newUser.save()
                    .then(() => {res.status(200).json({
                        message: "Matiere ajoutée !",
                        mat: mat
                    })})
                    .catch(error => {res.status(500).json( error )})
        }else{
            res.status(200).json({messageError: "Cette matiere existe deja au meme emplacement"})
        }
    })
    .catch( error => {
        console.log(error)
        res.status(500).json({ error })})
}

exports.getMat = (req, res, next) => {
    Mat.find()
    .then(r => {
        let R = [...r]
        R.forEach((el, k) => {
            R[k].id = undefined
            R[k]._id = undefined
            R[k].__v = undefined
        })
        res.status(200).json({mat: R})
    })
    .catch(error => {res.status(500).json({ error })})
}

exports.deleteMat = (req, res, next) => {
    Mat.find()
    .then((d) => {
        let id = 0
        d.forEach((el) => {
            if(el.intitled.toUpperCase() === req.body.intitled.toUpperCase() && el.fil === req.body.fil && el.niv === req.body.niv){
                id = el.id
                return
            }
        })
        console.log('delete Mat ', req.body.intitled, " ",id)
        if(id !== 0){
            Mat.deleteOne({id: id})
            .then((f) => {res.status(200).json({ message: 'Matiere supprimé!' })})
            .catch(( error ) => {res.status(400).json( error )})
        }
    })
    .catch(( error ) => {res.status(400).json( error )})
    
}

exports.addRoom = (req, res, next) => {
    Room.findOne({ room: req.body.room })
    .then(user => {
        if(!user){
            const date = Date.now()
            const room = {
                ...req.body,
                room: req.body.room.split(' ').join('-').toUpperCase(),
                description: req.body.description === ''? 'Aucune description': req.body.description,
                date: date
            }
            const newRoom = new Room(room)
            newRoom.save()
                .then(() => {res.status(200).json({
                    message: "Classe ajoutée !",
                    room: room
                })})
                .catch(error => {res.status(500).json( error )})
        }else{
            res.status(200).json({messageError: "Cette classe existe deja"})
        }
    })
    .catch( error => {
        console.log(error)
        res.status(500).json({ error })
    })
}

exports.getRoom = (req, res, next) => {
    Room.find()
    .then(r => {
        let R = [...r]
        R.forEach((el, k) => {
            R[k].id = undefined
            R[k]._id = undefined
            R[k].__v = undefined
        })
        res.status(200).json({room: R})
    })
    .catch(error => {res.status(500).json({ error })})
}

exports.deleteRoom = (req, res, next) => {
    Room.deleteOne({room: req.body.room})
    .then(() => {res.status(200).json({ message: 'Classe supprimé!' })})
    .catch(( error ) => {res.status(400).json( error )})
}