const express = require('express')
const userCtrl = require('../controllers/user')
const router = express.Router()
const multerConfigProfil = require('../middleware/multer-config-profil')
//////

router.post('/signin', userCtrl.signin)
router.post('/verif', userCtrl.verif)
router.post('/login', userCtrl.login)
router.get('/getfac', userCtrl.getFac)

module.exports = router