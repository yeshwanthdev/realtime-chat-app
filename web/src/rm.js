import * as lodash from 'lodash';
import commonConfig from './config/common.js';

class RM {
	commonConfig() {
		return commonConfig;
	}

	lodash() {
		return lodash;
	}
}

export default new RM();
