const rm = require('@root/rm'),
	mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
	//common fields
	...rm.utils.commonSchema,

	senderId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	receiverId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	text: {
		type: String,
	},
	image: {},
});

module.exports = mongoose.model('Message', messageSchema);
