import * as lodash from 'lodash';
import commonConfig from './config/common.js';
import toast from 'react-hot-toast';
import moment from 'moment';

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

	get moment() {
		return moment;
	}

	get formatSettings() {
		return {
			dateFormat: 'DD/MM/YYYY',
			timeFormat: 'HH:mm:ss',
			dateTimeFormat: 'DD/MM/YYYY HH:mm:ss',
		};
	}
}

export default new RM();
