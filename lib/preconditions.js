var ErrValidator = require("./err/err-instance-validation"),
  errValidator = require("./err/err-singleton-validation"),
  errrValidator = require("./errr/errr-validation");

module.exports = {

  /**
   * @warning This functionality has very poor performance.  Please use the 'singleton' or 'errr' functionality instead.
   *
   * Validate Object values with preconditions object.
   * @param objectUnderTest - Object Under Test
   * @returns Preconditions object with object for testing.
   */
  instance: function (objectUnderTest) {
    return new ErrValidator(objectUnderTest);
  },
  constructor: function () {
    return ErrValidator;
  },
  singleton: function () {
    return errValidator;
  },
  errr: function () {
    return errrValidator;
  }
};
