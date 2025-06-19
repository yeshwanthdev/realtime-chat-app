const rm = require('@root/rm'),
	jwt = require('jsonwebtoken'),
	uuid = require('uuid').v4;

class Utils {
	connectDB = async () => {
		try {
			const connection = await mongoose.connect(process.env.MONGODB_URI);
			console.log('MongoDB connected');
		} catch (error) {
			console.error('MongoDB connection error:', error);
			process.exit(1);
		}
	};

	generateToken = (userId, res) => {
		const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
			expiresIn: '7d',
		});

		res.cookie('jwt', token, {
			maxAge: 7 * 24 * 60 * 60 * 1000,
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.ENV !== 'development',
		});

		return token;
	};

	guid() {
		return uuid();
	}

	get UTCDateNow() {
		const isoDate = new Date().toISOString();
		return Date.now(isoDate);
	}

	get commonSchema() {
		return {
			code: {
				type: String,
				default: null,
			},
			dateCreated: { type: Date, default: rm.utils.UTCDateNow },
			dateModified: { type: Date, default: rm.utils.UTCDateNow },
			createdBy: { type: rm.mongoose.Schema.Types.ObjectId, ref: 'users' },
			modifiedBy: { type: rm.mongoose.Schema.Types.ObjectId, ref: 'users' },
			json: { type: Object },
			status: { type: Boolean, default: true },
		};
	}
}

module.exports = new Utils();
