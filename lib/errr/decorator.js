"use strict";

const Errr = require("errr");

/**
 * Error Builder allows you to use optional functions to build an error object.  The error can have appended stack traces and debug params to assist with debugging.
 */
class ErrrDecorator {

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
    this._setValues_ = [];
  }

  /**
   * Decorated function from 'errr' module. Add parameters to the stack trace that will make it easier to debug the problem.
   *
   * @param {Object} params - Object Map of key value parameters that will make it easier to debug the error.
   * @param {Boolean} [shouldDebug] - If shouldDebug === false, then debug params will not print.  Any other value (including undefined), and the debug params will be printed. Useful if you want to only print debugParams given an Environment Variable.
   * @returns {ErrrDecorator} - Returns the instance of errorBuilder to allow chainability.
   */
  debug(debugParams, shouldDebug) {
    this._debugParams_ = debugParams;
    this._shouldDebug_ = shouldDebug;
    return this;
  }

  /**
   * Decorated function from 'errr' module. Sets an immutable value on the error object using the key as the variable name.
   *
   * @param {String} key - The key that will be used to set the value on the error object.
   * @param {Object} value - The value that will be set on the object.
   * @param {Boolean} [force] - If force equals true, then this value will override a value with the same key from an errr
   * passed in using the 'appendTo' function.
   * @returns {ErrrDecorator} - Returns the instance of errorBuilder to allow chainability.
   */
  set(key, value) {
    this._setValues_.push({key, value});
    return this;
  }

  /**
   * Decorated function from 'errr' module. Same concept and functionality as the 'set' function.  The difference is
   * that you can set all values in a given object onto the Errr instance.
   *
   * @param {String} key - The key that will be used to set the value on the error object.
   * @param {Object} value - The value that will be set on the object.
   * @param {Boolean} [force] - If force equals true, then this value will override a value with the same key from an errr
   * passed in using the 'appendTo' function.
   * @returns {ErrrDecorator} - Returns the instance of errorBuilder to allow chainability.
   */
  setAll(object) {
    for (let key in object) {
      if (object.hasOwnProperty(key)) {
        this._setValues_.push({key, value: object[key]});
      }
    }

    return this;
  }

  /**
   * Decorated function from 'errr' module. Append the error being built, to the end of this error's stack trace.
   *
   * @param {Error} err - The stack trace of the error being built, will be appended to this error's stack trace.
   * @returns {ErrrDecorator} - Returns the instance of errorBuilder to allow chainability.
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
      let errr = Errr.newError(this._message_, this._templateParams_)
        .debug(this._debugParams_, this._shouldDebug_)
        .appendTo(this._appendTo_);

      this._setValues_.forEach((item) => {
        errr.set(item.key, item.value);
      });

      errr.throw();
    }
  }

  /**
   * Synonym for the test function.
   */
  t() { // eslint-disable-line
    this.test();
  }
}

module.exports = ErrrDecorator;
