const express = require('express')
const UserController = require('../controllers/UserController')
const router = express.Router()
const checkauth = require('../middleware/auth')

//usercontroller
router.get('/getalluser',checkauth,UserController.getalluser)
router.get('/getuserdetails',checkauth,UserController.getuserdetails)
router.post('/userinsert',UserController.userinsert)
router.post('/verifylogin',UserController.verifylogin)
router.get('/logout',UserController.logout)
router.get('/updatepassword',UserController.updatepassword)




module.exports = router