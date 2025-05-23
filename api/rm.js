const lodash = require("lodash");

class RM {
  get _() {
    return lodash;
  }
}

module.exports = new RM();
