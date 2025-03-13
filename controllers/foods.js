//controllers/foods.js
const express = require('express')
const router = express.Router()
const User = require('../models/user.js')

// GET /users/:userId/foods - Index Route: Show all food items in a user's pantry
router.get('/', async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);// Find user in database
        if (!user) return res.redirect('/'); // Redirect home if user not found

        res.render('foods/index.ejs', { user: req.session.user, pantry: user.pantry });// Send pantry items to the template
    } catch (err) {
        console.error("Error fetching pantry items:", err);
        res.redirect('/'); // Redirect home if error occurs
    }
});

//GET /users/:userId/foods/new - New item form route 
router.get('/new', (req,res) => {
    res.render('foods/new.ejs', { user: req.session.user })
})

//POST /users/:userId/foods - Create new food item in pantry
router.post('/', async (req, res) => {
    try {
        //find the user in the database using their session
        const user = await User.findById(req.session.user._id);

        if(!user) {
            return res.redirect('/'); //Redirect to homepage if user not found
        }
        //add the new food item to the pantry array
        user.pantry.push({ name: req.body.name })

        //Save the updated user document
        await user.save()

        //redirect back to the pantry index page
        res.redirect(`/users/${user._id}/foods`)
    } catch (err) {
        console.error(err)
        res.redirect('/')//Redirect home if error occurs
    }
})


module.exports = router