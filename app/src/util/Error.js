'use strict';

class Error {
  static ctrl(err) {
    return {
      success: false,
      clientMsg: '서버 에러입니다. 서버 개발자에게 문의해주세요.',
      err: err.stack,
      status: err.status || 500,
    };
  }
}

module.exports = Error;
