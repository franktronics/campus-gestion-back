const express = require('express')
const scheduleCtrl = require('../controllers/schedule')
const authMaster = require('../middleware/authMaster')
const router = express.Router()
//////

router.get('/getscheduleutils', authMaster, scheduleCtrl.getScheduleUtils)
router.post('/postschedule', authMaster, scheduleCtrl.postSchedule)
router.get('/getschedule', authMaster, scheduleCtrl.getAllSchedule)

module.exports = router