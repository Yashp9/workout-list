const express = require('express');
const {signup,login} = require('../controllers/user.controller');

const router = express.Router()

//login route.
router.post('/login',login)

//signup route.
router.post('/signup',signup)

module.exports = router