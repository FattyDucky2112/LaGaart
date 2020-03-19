const express = require('express')
var router = express.Router()
const config = require('./config')
const jwt = require('express-jwt')


router.get('/gallerydata', require('./routes/gallery/gallerydata'))
router.post('/user/login', require('./routes/user/login'))
router.get('/user/auth', jwt({ secret: config.jwtSecret }), require('./routes/user/auth'))
router.post('/user/logout', require('./routes/user/logout'))
router.all('/admin/categories', jwt({ secret: config.jwtSecret }), require('./routes/admin/categories'))
router.all('/admin/pictures', jwt({ secret: config.jwtSecret }), require('./routes/admin/pictures'))
router.get('/newsdata', require('./routes/aktuelles/newsdata'))
router.all('/admin/newsdata', jwt({ secret: config.jwtSecret }), require('./routes/admin/newsdata'))


module.exports = router