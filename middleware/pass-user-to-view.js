//middleware/pass-user-to-view.js

const passUserToView = (req, res, next) => {
    res.locals.user = req.session.user ? req.session.user : null; //make user available in all views
    next();//continue to next middleware/route
}

module.exports = passUserToView

// import to server.js