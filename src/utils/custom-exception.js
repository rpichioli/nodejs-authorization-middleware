'use strict';

module.exports = function CustomException(message, extra = '') {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message || "Invalid data has been sent.";
  this.extra = extra;
};

require('util').inherits(module.exports, Error);
