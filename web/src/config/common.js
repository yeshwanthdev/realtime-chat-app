import { default as config } from './env/default';

const commonConfig = {
	...config,
	 apiBaseUrl: 'http://localhost:4000/api'
};

export default commonConfig;
