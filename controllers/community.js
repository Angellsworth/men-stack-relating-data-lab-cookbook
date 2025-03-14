// controllers/community.js
const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

//GET ALL /community
router.get('/', async (req, res) => {
    try {
        const allUsers = await User.find({}, 'username')//get all users, only user names
        res.render('users/index.ejs', { users: allUsers })
    } catch (error) {
        console.error('Error fetching users:', error)
        res.redirect('/')
    }
})
//GET /community/:userId - Show SPECIFIC user's pantry
router.get('/:userId', async (req, res) => {
    try {
        const selectedUser = await User.findById(req.params.userId).select('username pantry')

        if(!selectedUser) {
            console.log('User not found, redirecting...');
            return res.redirect('/community');
        }
        res.render('users/show.ejs', { selectedUser })

    } catch (error) {
        console.error('Error finding user pantry:', error)
        res.redirect('/community')
    }
})

module.exports = router;