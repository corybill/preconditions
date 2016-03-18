"use strict";

const Errr = require("errr");

/**
 * Error Builder allows you to use optional functions to build an error object.  The error can have appended stack traces and debug params to assist with debugging.
 */
class Decorator {

  /**
   * Provides an interface to build an error.  Then allows you to get or throw the error.
   * @class
   *
   * @param {String} [message] - Error message that will supplied to Error Object.
   * @param {Array} [template] - Array of parameters.  If given, util.format(message, template) will be applied to the message string.
   */
  constructor(message, templateParams, failsTest) {
    this._message_ = message;
    this._templateParams_ = templateParams;
    this._failsTest_ = failsTest;
  }

  /**
   * Decorated function from 'errr' module. Add parameters to the stack trace that will make it easier to debug the problem.
   *
   * @param {Object} params - Object Map of key value parameters that will make it easier to debug the error.
   * @param {Boolean} [shouldDebug] - If shouldDebug === false, then debug params will not print.  Any other value (including undefined), and the debug params will be printed. Useful if you want to only print debugParams given an Environment Variable.
   * @returns {ErrorBuilder} - Returns the instance of errorBuilder to allow chainability.
   */
  debug(debugParams, shouldDebug) {
    this._debugParams_ = debugParams;
    this._shouldDebug_ = shouldDebug;
    return this;
  }

  /**
   * Decorated function from 'errr' module. Append the error being built, to the end of this error's stack trace.
   *
   * @param {Error} err - The stack trace of the error being built, will be appended to this error's stack trace.
   * @returns {ErrorBuilder} - Returns the instance of errorBuilder to allow chainability.
   */
  appendTo(err) {
    this._appendTo_ = err;
    return this;
  }

  /**
   * Validate preconditions check and throw an errr if it fails.
   */
  test() {
    if (this._failsTest_()) {
      Errr.newError(this._message_, this._templateParams_)
        .debug(this._debugParams_, this._shouldDebug_)
        .appendTo(this._appendTo_).throw();
    }
  }

  /**
   * Synonym for the test function.
   */
  t() { // eslint-disable-line
    this.test();
  }
}

module.exports = Decorator;
