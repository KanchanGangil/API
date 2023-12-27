const express = require('express')
const UserController = require('../controllers/UserController')
const router = express.Router()
const checkauth = require('../middleware/auth')
const CategoryController = require('../controllers/CategoryController')
const ProductController = require('../controllers/ProductController')

//usercontroller
router.get('/getalluser', UserController.getalluser)
router.get('/me', checkauth, UserController.getuserdetails)
router.post('/userinsert', UserController.userinsert)
router.post('/verifylogin', UserController.verifylogin)
router.get('/logout', UserController.logout)
router.post('/updatepassword', checkauth, UserController.updatepassword)
router.post('/updateprofile', checkauth, UserController.updateprofile)

//CategoryController
router.post('/categoryinsert', CategoryController.categoryinsert)
router.get('/categorydisplay', CategoryController.categorydisplay)
router.get('/categoryview/:id', CategoryController.categoryview)
router.post('/categoryupdate/:id', CategoryController.categoryupdate)
router.get('/categorydelete/:id', CategoryController.categorydelete)

//ProductController
router.post('/createproduct', ProductController.createproduct)
router.get('/getallproduct', ProductController.getallproduct)
router.get('/getallproductdetail/:id', ProductController.getallproductdetail)
router.post('/updateproduct/:id', ProductController.updateproduct)
router.get('/deleteproduct/:id', ProductController.deleteproduct)





module.exports = router