const express = require('express');
const router = express.Router();
const passport = require('passport');
router.get('/auth/google', async (req, res, next) => {
	passport.authenticate('google', {
		scope: [ 'email', 'profile' ]
	})(req, res, next);
});
router.get(
	'/auth/google/process',
	
	passport.authenticate('google', {
		failureFlash: true,
		failureMessage: 'Cannot login to google, try again later!',
		failureRedirect: process.env.ERROR_LOGIN_URL,
		successRedirect: process.env.SUCCESS_LOGIN_URL,
	}),
	(req, res) => {
		
		// req.flash('success', 'welcome google user');
		console.log("google login success");
		// res.redirect(process.env.SUCCESS_LOGIN_URL);
	}
);

module.exports = router;