'use strict';

class Error {
  static ctrl(status, err, msg) {
    return {
      success: false,
      msg,
      err,
      status,
    };
  }
}

module.exports = Error;
