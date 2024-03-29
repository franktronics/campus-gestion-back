const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config({path: '.env'})
const User = require('../models/user')
const listet = require('../models/listet')
const { numberGenerator } = require('../script/numberGenerator')
const { sendMail } = require('../script/sendMail')
const Master = require('../models/master')

const TOKENKEY = process.env.DB_TOKEN

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
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
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id}, /*donnees a encoder*/
                            ''+TOKENKEY+'', /*cle secrete pour l'encodage*/
                            { expiresIn: '24h'} /*periode de validite du token*/
                        )
                    })
                })
                .catch( error => {res.status(500).json({ error })})
        })
        .catch( error => {res.status(501).json({ error })
        })
}

exports.signin = (req, res, next) => {
    /*if(req.file){
        console.log('file present', req.file)
    }*/
    User.findOne({ matricule: req.body.matricule })
        .then(user => {
            if(!user){
                bcrypt.hash(req.body.password, 10)
                    .then(hash => {
			const date = Date.now()
                        const newUser = new User({
                            ...req.body,
                            password: hash,
                            date: date,
                            imgProfil: ''
                        })
                        newUser.save()
                            .then(() => {res.status(200).json({message: "Utilisateur crée !"})})
                            .catch(error => {
                                res.status(500).json( error )})
                    })
                    .catch(error => {
                        res.status(500).json( error )
                    })
            }else{
                res.status(200).json({messageError: "Le matricule que vous avez entré est deja utilisé"})
            }
        })
        .catch( error => {res.status(500).json({ error })})
}

exports.verif = (req, res, next) => {
    User.findOne({matricule: req.body.matricule})
        .then((user) => {
            if(!user){
                const code = numberGenerator(6)
                listet.findOne({matricule: req.body.matricule})
                    .then((et) => {
                        if(et){
                            sendMail(et.email, `Campus gestion: votre code de confirmation est ${code}`)
                                .then(mail => {
                                    res.status(200).json({
                                        email: et.email,
                                        code: code,
                                        matricule: req.body.matricule
                                    })
                                })
                                .catch(error => {res.status(200).json({messageError: error})
                                })    
                        }else{
                            res.status(200).json({messageError: "Le matricule que vous avez entré n'existe pas"})
                        }
                    })
                    .catch( error => {
                        console.log(error);
                        res.status(500).json({error})})
            }else{
                res.status(200).json({messageError: "Le matricule que vous avez entré est deja utilisé"})
            }
        })
        .catch( error => {res.status(500).json({error})})
}

exports.getFac = (req, res, next) => {
    Master.find()
        .then(mas => {
            const fac = mas[0].fac.map((f) => {
                return {
                    title: f.title,
                    id: f.id
                }
            })
            const fil = mas[0].fil.map((f) => {
                return {
                    title: f.title,
                    facId: f.facId,
                    id: f.id
                }
            })
            res.status(200).json({fac, fil})
        })
        .catch(err => {
            res.status(400).json(err)
        })
}