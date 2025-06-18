const cors = require('cors');

//change later
// You can customize the allowed origins as needed
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];

const corsOptions = {
	origin: function (origin, callback) {
		// allow requests with no origin (like mobile apps, curl, etc.)
		if (!origin) return callback(null, true);
		if (allowedOrigins.includes(origin)) {
			return callback(null, true);
		} else {
			return callback(new Error('Not allowed by CORS'));
		}
	},
	credentials: true,
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
