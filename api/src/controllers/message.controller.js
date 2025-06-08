const rm = require('@root/rm');
const userModel = require('@model/user.model.js');
const messageModel = require('@model/message.model.js');
const S3Service = require('@service/s3Service.js');

// list all the users
const getUsers = async (req, res) => {
	try {
		const loggedInUserId = req.user._id;
		const filteredUsers = await userModel.find(
			{
				_id: { $ne: loggedInUserId },
			},
			{ password: 0 }
		);

		res.status(200).json(filteredUsers);
	} catch (error) {
		console.error('Error in getUsers controller: ', error.message);
		res.status(500).json({ error: 'Internal server error' });
	}
};

// get respective user messages
const getMessage = async (req, res) => {
	try {
		const senderId = req.user._id;
		const { id: receiverId } = req.params;

		const messages = await messageModel.find({
			$or: [
				{ senderId: senderId, receiverId: receiverId },
				{ senderId: receiverId, receiverId: senderId },
			],
		});

		res.status(200).json(messages);
	} catch (error) {
		console.log('Error in getMessages controller: ', error.message);
		res.status(500).json({ error: 'Internal server error' });
	}
};

const sendMessage = async (req, res) => {
	try {
		const senderId = req.user._id;
		const { id: receiverId } = req.params;
		const text = req.body.text;

		//--change later
		// saving image to s3
		let imageMeta = null;
		if (req.file && req.file.originalname) {
			const s3 = new S3Service({
				bucketName: process.env.S3_BUCKET,
				region: process.env.AWS_REGION,
				accessKeyId: process.env.AWS_ACCESS_KEY_ID,
				secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
			});

			const { originalname, buffer, mimetype } = req.file;
			const key = `chat-app/${rm.utils.guid()}/${originalname}`;
			const result = await s3.createObject({
				key: key,
				data: buffer,
				contentType: mimetype,
			});

			const fileUrl = `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
			imageMeta = {
				location: fileUrl,
				key: key,
				name: originalname,
				type: mimetype,
			};

			console.log('File uploaded to S3:', result);
		}

		const newMessage = {
			code: rm.utils.guid(),
			senderId,
			receiverId,
			text,
			image: imageMeta,
			status: true,
		};

		await messageModel.create(newMessage);

		res.status(201).json({
			success: true,
			file: imageMeta,
		});
	} catch (error) {
		console.error('Error in sendMessage controller: ', error.message);
		res.status(500).json({ error: 'Internal server error' });
	}
};

module.exports = { getUsers, getMessage, sendMessage };
