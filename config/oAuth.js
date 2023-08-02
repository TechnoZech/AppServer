const User = require('../models/user');
module.exports.authUser = async (req, accessToken, refreshToken, profile, done) => {
	try {
		if (!req.user) {
			// either have to login/register
			const user = await User.findOne({ googleId: profile.id });
			if (user) {
				// login
				return done(null, user);
			}
			// register
			const newUser = new User({
				googleId: profile.id,
				googleToken: accessToken,
				username: profile.email,
				name: profile.given_name,
				thumbnail: profile._json.picture,
			});
			
			await newUser.save();
			return done(null, newUser);
		} else {
			// already logged in
			console.log('already logged in');
			return done(null, false);
		}
	} catch (error) {
		return done(error, null);
	}
};