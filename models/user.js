const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: String,
    name: String,
	googleId: String,
	googleToken: String,
	thumbnail: String,
	isAdmin: { type: Boolean, default: false }
});

module.exports = mongoose.model('user', userSchema);

