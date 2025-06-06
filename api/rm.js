const lodash = require("lodash");

class RM {
  get _() {
    return lodash;
  }

  get utils() {
    return require("@lib/utils");
  }
}

module.exports = new RM();
