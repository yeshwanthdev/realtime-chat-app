const rm = require('@root/rm'),
	mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	//common fields
	...rm.utils.commonSchema,

	fullName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minLength: 6,
	},
	profilePicture: {},
});

const User = mongoose.model('User', userSchema);

module.exports = User;
