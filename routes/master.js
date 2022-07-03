const express = require('express')
const masterCtrl = require('../controllers/master')
const authMaster = require('../middleware/authMaster')
const router = express.Router()
//////

router.post('/login', masterCtrl.login)
router.get('/getdata', authMaster, masterCtrl.getData)
router.post('/addfac', authMaster, masterCtrl.addFac)
router.post('/addfil', authMaster, masterCtrl.addFil)

router.post('/addens', authMaster, masterCtrl.addEns)
router.get('/getens', authMaster, masterCtrl.getEns)
router.post('/deleteens', authMaster, masterCtrl.deleteEns)

router.post('/addmat', authMaster, masterCtrl.addMat)
router.get('/getmat', authMaster, masterCtrl.getMat)
router.post('/deletemat', authMaster, masterCtrl.deleteMat)

module.exports = router