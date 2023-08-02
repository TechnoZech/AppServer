const User = require('../models/user');

module.exports.isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
};

module.exports.isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userID);
        if(user.isAdmin) return next();
        res.redirect('back');
    } catch (error) {
        console.log(error);
        res.redirect('/login');
    }
};