require('../config/module-alias')();

const express = require('express'),
	http = require('http'),
	dotenv = require('dotenv'),
	cookieParser = require('cookie-parser'),
	authRoutes = require('@route/auth.route'),
	messageRoutes = require('@route/message.route'),
	{ connectDB } = require('@lib/db');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cookieParser());
app.use(express.json({ limit: '1024kb' }));
app.use(require('@middleware/cors.middleware'));

//routes
app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
	res.status(200).json({ status: 'ok' });
});

async function startServer() {
	await connectDB();

	const server = http.createServer(app);

	server.listen(PORT, () => {
		console.log('------------------------');
		console.log(`Server running on port ${PORT}`);
		console.log('------------------------');
	});
}

startServer();
