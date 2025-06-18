import * as lodash from 'lodash';
import commonConfig from './config/common.js';
import toast from 'react-hot-toast';

class RM {
	get commonConfig() {
		return commonConfig;
	}

	get lodash() {
		return lodash;
	}

	get toast() {
		return toast;
	}
}

export default new RM();
