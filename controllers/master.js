const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config({path: '.env'})
const Master = require('../models/master')

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