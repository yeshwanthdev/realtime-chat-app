const lodash = require('lodash');

class RM {
	get _() {
		return lodash;
	}

	get utils() {
		return require('@lib/utils');
	}

	get mongoose() {
		return require('mongoose');
	}

	get commonSchema() {
		return require('@utils/commonSchema');
	}
}

module.exports = new RM();
