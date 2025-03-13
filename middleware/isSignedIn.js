//middleware/is-signed-in.js
const isSignedIn = (req, res, next) => {
    if (req.session.user) return next(); //if signedIn, continue to next middleware/route
    res.redirect('/auth/sign-in')//if not signedin, redirect to the sign-in page
}

module.exports = isSignedIn

// import to server.js