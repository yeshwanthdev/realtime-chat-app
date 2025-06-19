const rm = require('@root/rm.js');
const userModel = require('@model/user.model.js');
const bcrypt = require('bcryptjs');
const { generateToken } = require('@lib/utils.js');
const S3Service = require('@service/s3Service.js');

const signup = async (req, res) => {
	try {
		const { fullName, email, password } = req.body;

		if (!fullName || !email || !password) {
			return res.status(400).json({ message: 'All fields are required' });
		}

		//checking if user already existes
		const user = await userModel.findOne({ email });

		if (user) {
			return res.status(400).json({ message: 'User already exists' });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new userModel({
			fullName,
			email,
			password: hashedPassword,

			//common fields
			code: rm.utils.guid(),
			status: true,
		});

		// const userData = newUser.toObject();

		if (rm._.isEmpty(newUser)) {
			res.status(400).json({ message: 'Invalid user data' });
		}

		// generating jwt token
		generateToken(newUser._doc._id, res);
		await newUser.save();

		res.status(201).json({
			_id: newUser._doc._id,
			fullName: newUser._doc.fullName,
			email: newUser._doc.email,
			profilePic: newUser._doc.profilePic,
			code: newUser._doc.code,
			status: true,
		});
	} catch (error) {
		console.log('Error in signup controller', error.message);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await userModel.findOne({ email: email }).lean();

		if (rm._.isEmpty(user)) {
			return res.status(400).json({ message: 'Invalid Credentials' });
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.status(400).json({ message: 'Invalid Credentials' });
		}

		// generating jwt token
		await generateToken(user._id, res);

		const userWithoutPassword = rm._.omit(user, ['password']);
		res.status(200).json(userWithoutPassword);
	} catch (error) {
		console.log('Error in login controller', error.message);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

const logout = async (req, res) => {
	try {
		res.cookie('jwt', '', { maxAge: 0 });
		res.status(200).json({ message: 'Logged out successfully' });
	} catch (error) {
		console.log('Error in logout controller', error.message);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

const update = async (req, res) => {
	try {
		const { profilePicture } = req.body;
		const userId = req.user._id;

		if (!profilePicture) {
			return res.status(400).json({ message: 'Profile Picture is required' });
		}

		// Handle base64 image string
		let matches = profilePicture.match(/^data:(image\/(png|jpeg|jpg));base64,(.+)$/);
		if (!matches) {
			return res.status(400).json({ message: 'Invalid image format' });
		}
		const mimeType = matches[1];
		const imageBuffer = Buffer.from(matches[3], 'base64');
		const extension = mimeType.split('/')[1];
		const fileName = `profile_${rm.utils.guid()}.${extension}`;
		const key = `chat-app/${rm.utils.guid()}/${fileName}`;

		const s3 = new S3Service({
			bucketName: process.env.S3_BUCKET,
			region: process.env.AWS_REGION,
			accessKeyId: process.env.AWS_ACCESS_KEY_ID,
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
		});

		const result = await s3.createObject({
			key: key,
			data: imageBuffer,
			contentType: mimeType,
		});

		const fileUrl = `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
		const imageMeta = {
			location: fileUrl,
			key: key,
			name: fileName,
			type: mimeType,
		};

		const updatedUser = await userModel.findByIdAndUpdate(userId, { profilePicture: imageMeta }, { new: true }).lean();

		const userWithoutPassword = rm._.omit(updatedUser, ['password']);

		res.status(200).json(userWithoutPassword);
	} catch (error) {
		console.log('error in update profile:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

module.exports = {
	signup,
	login,
	logout,
	update,
};
