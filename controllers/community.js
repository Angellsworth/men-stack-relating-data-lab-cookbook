const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

//GET ALL /community
router.get('/', async (req, res) => {
    try {
        const allUsers = await User.find({}, 'username')//get all users, only user names
        res.render('community/index.ejs', { users })
    } catch (error) {
        console.error('Error fetching users:', error)
        res.redirect('/')
    }
})

module.exports = router;