const express = require('express')
const masterCtrl = require('../controllers/master')
const authMaster = require('../middleware/authMaster')
const router = express.Router()
//////

router.post('/login', masterCtrl.login)
router.get('/getdata', authMaster, masterCtrl.getData)

module.exports = router