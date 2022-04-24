'use strict';

class Error {
  static ctrl(err) {
    return {
      success: false,
      clientMsg: err.message,
      err: err.stack,
      status: err.status,
    };
  }
}

module.exports = Error;
