class ApiException extends Error {
    constructor(code, msg, isOper = true, stack = '') {
      super(msg);
      this.statusCode = code;
      this.isOperational = isOper;
      if (stack) {
        this.stack = stack;
      } else {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }
  
  module.exports = ApiException;