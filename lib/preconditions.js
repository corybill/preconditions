var ErrValidator = require("./err/err-instance-validation"),
  errValidator = require("./err/err-singleton-validation"),
  errrValidator = require("./errr/errr-validation");

/**
 * Preconditions interface.
 *
 * @static
 */
module.exports = {

  /**
   * Validate single value with the buildable errr interface from the static errr Validation functionality.
   *
   * @returns Error Validation Singleton.
   */

  errr: function () {
    return errrValidator;
  },

  /**
   * Validate single value with the chainable interface from the Error Validation Singleton.
   *
   * @returns Error Validation Singleton.
   */
  singleton: function () {
    return errValidator;
  },

  /**
   * @warning This functionality has very poor performance.  Please use the 'singleton' or 'errr' functionality instead.
   *
   * Validate values of a given JSON object with the preconditions object.
   * @param objectUnderTest - Object Under Test
   * @returns Error Validation instance.
   */
  instance: function (objectUnderTest) {
    return new ErrValidator(objectUnderTest);
  },

  /**
   * Gives ability to extend and add other preconditions to the Error Validation constructor.
   *
   * @Warning This functionality only works with the 'instance' function which has very poor performance.
   * @returns Error Validation constructor.
   */
  constructor: function () {
    return ErrValidator;
  }
};
