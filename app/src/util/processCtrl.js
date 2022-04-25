'use strict';

module.exports = (res, response) => {
  if (response.status < 400) {
    return res.status(response.status).json(response);
  }
  if (response.status < 500) {
    return res.status(response.status).json(response);
  }

  delete response.err;

  return res.status(response.status).json(response);
};
