const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

// GET /users/:userId/foods - Index Route: SHOW ALL food items in a user's pantry
router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id); // Find user in database
        if (!currentUser) return res.redirect('/'); // Redirect home if user not found

        res.render('foods/index.ejs', { user: req.session.user, pantry: currentUser.pantry }); // Send pantry items to the template
    } catch (err) {
        console.error("Error fetching pantry items:", err);
        res.redirect('/'); // Redirect home if error occurs
    }
});

// GET /users/:userId/foods/new - NEW ITEM form route 
router.get('/new', (req, res) => {
    res.render('foods/new.ejs', { user: req.session.user });
});

// POST /users/:userId/foods - Add a new food item to the pantry
router.post('/', async (req, res) => {
    try {
        console.log("Incoming POST request to add food:", req.body); // Debugging

        const currentUser = await User.findById(req.session.user._id);

        if (!currentUser) {
            console.log("User not found! Redirecting home...");
            return res.redirect('/'); // Redirect to homepage if user not found
        }

        // Check if quantity is provided, default to 1 if empty
        const quantity = req.body.quantity ? parseInt(req.body.quantity) : 1;

        // Debugging: Log what's being added
        console.log(`Adding food: ${req.body.name} with quantity: ${quantity}`);

        // Add the new food item to the pantry array
        currentUser.pantry.push({ 
            name: req.body.name, 
            quantity: quantity //Save the quantity
        });

        // Save the updated user document
        await currentUser.save();

        console.log("Food added successfully! Redirecting to pantry...");
        res.redirect(`/users/${currentUser._id}/foods`);

    } catch (err) {
        console.error("Error adding food:", err); // Log the error
        res.redirect('/'); // Redirect home if error occurs
    }
});

// DELETE /users/:userId/foods/:itemId - Remove a food from pantry
router.delete('/:itemId', async (req, res) => {
    try {
        // Find user in database
        const currentUser = await User.findById(req.session.user._id);
        if (!currentUser) return res.redirect('/'); // Redirect if user not found

        // Remove food item using the item's ID
        currentUser.pantry = currentUser.pantry.filter(item => item._id.toString() !== req.params.itemId);

        // Save the updated user info
        await currentUser.save();

        // Redirect back to pantry
        res.redirect(`/users/${currentUser._id}/foods`);
    } catch (err) {
        console.log('Error deleting item:', err);
        res.redirect('/'); // Redirect home if error occurs
    }
});

// GET /users/:userID/foods/:itemId/edit - EDIT FORM
router.get('/:itemId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        if (!currentUser) {
            console.log("No user found, redirecting...");
            return res.redirect('/');
        }

        const foodItem = currentUser.pantry.id(req.params.itemId);
        if (!foodItem) {
            console.log("Food item not found, redirecting...");
            return res.redirect(`/users/${currentUser._id}/foods`);
        }

        console.log("Rendering edit page for:", foodItem);
        res.render('foods/edit.ejs', { user: req.session.user, food: foodItem });

    } catch (err) {
        console.log("Error fetching food item:", err);
        res.redirect('/');
    }
});

// PUT /users/:userId/foods/:itemId - Update a food item in the pantry
router.put('/:itemId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        if (!currentUser) {
            console.log('User not found, redirecting...');
            return res.redirect('/');
        }

        const foodItem = currentUser.pantry.id(req.params.itemId);
        if (!foodItem) {
            console.log('Food item not found, redirecting...');
            return res.redirect(`/users/${currentUser._id}/foods`);
        }

        // Use .set() (rather than save()) to update MULTIPLE fields from the form (scalable)
        foodItem.set(req.body);

        // Save the updated user document
        await currentUser.save();

        // Redirect back to the pantry
        res.redirect(`/users/${currentUser._id}/foods`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

module.exports = router;