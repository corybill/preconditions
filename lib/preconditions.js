"use strict";

var InstanceValidator = require("./err/instance-validator"),
  SingletonValidator = require("./err/singleton-validator"),
  ErrrValidator = require("./errr/validator");

/**
 * Preconditions entry point interface.
 *
 * @class
 */
class Preconditions {
  /**
   * Validate single value with the buildable errr interface from the static errr Validation functionality.
   *
   * @returns Error Validation Singleton.
   */

  static errr() {
    return ErrrValidator;
  }

  /**
   * Validate single value with the chainable interface from the Error Validation Singleton.
   *
   * @returns Error Validation Singleton.
   */
  static singleton() {
    return SingletonValidator;
  }

  /**
   * @warning This functionality has very poor performance.  Please use the 'singleton' or 'errr' functionality instead.
   *
   * Validate values of a given JSON object with the preconditions object.
   * @param objectUnderTest - Object Under Test
   * @returns Error Validation instance.
   */
  static instance(objectUnderTest) {
    return new InstanceValidator(objectUnderTest);
  }

  /**
   * Gives ability to extend and add other preconditions to the Error Validation constructor.
   *
   * @Warning This functionality only works with the 'instance' function which has very poor performance.
   * @returns Error Validation constructor.
   */
  static constructor() {
    return InstanceValidator;
  }
}

module.exports = Preconditions;
