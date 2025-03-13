//controllers/foods.js
const express = require('express')
const router = express.Router()
const User = require('../models/user.js')

//Index Routes:Show all food items in a user's pantry
router.get('/', (req, res) => {
    res.render('foods/index.ejs')
})


module.exports = router