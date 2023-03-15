const express = require('express');

const homeControlloer = require('../controllers/homeController');

const router = express.Router();

router.get('/' , homeControlloer.home)



module.exports = router;