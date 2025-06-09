const fs = require('fs');
const path = require('path');

const getEnv = () => {
	const cliArgs = process.argv.slice(2);
	const envKey = (cliArgs[0] || process.env.NODE_ENV || 'local').toLowerCase();

	switch (envKey) {
		case 'dev':
			return { code: 'dev', name: 'Development' };
		case 'prod':
			return { code: 'prod', name: 'Production' };
		case 'local':
			return { code: 'local', name: 'Localhost' };
		default:
			console.warn(`Unknown environment "${envKey}", defaulting to local.`);
			return { code: 'local', name: 'Localhost' };
	}
};

const setupConfig = (env) => {
	try {
		const config = require(`./src/config/env/${env.code}`);
		config.env = env;

		const configFile = `
const config = ${JSON.stringify(config)};
        
export default config;
`;
		const filepath = path.join(__dirname, 'src/config/env/default.js');
		fs.writeFileSync(filepath, configFile);
		console.log('Configuration file generated');
	} catch (error) {
		console.log('Error:', error);
		throw error;
	}
};

const init = async () => {
	try {
		const env = getEnv();
		setupConfig(env);
	} catch (err) {
		console.log('Error while building config', err);
	}
};

init();

module.exports = null;
