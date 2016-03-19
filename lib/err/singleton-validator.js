"use strict";

var constants = require("./../constants"),
  validate = require("../validator/validate");

var util = require("util");

/**
 * Validate single value with a chainable interface.
 * Use this interface if you want to utilize the following functionality:
 * 1. Error message templating.
 * 2. Only templates error message if validation fails which saves event queue cycles.
 * 3. Chain together precondition validations.
 */
class SingletonValidator {
  /**
   * Throws an error if 'val' is not defined.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {this} - Returns itself to allow chainable validations.
   */
  static shouldBeDefined(val, message, template) {
    if (validate.shouldBeDefined(val)) {
      var msg = message || constants.ShouldBeDefined;

      msg = (template === undefined) ? msg : util.format.apply(this, [msg].concat(template));
      throw new Error(msg);
    }
    return this;
  }

  /**
   * Throws an error if 'val' is defined.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {this} - Returns itself to allow chainable validations.
   */
  static shouldBeUndefined(val, message, template) {
    if (validate.shouldBeUndefined(val)) {
      var msg = message || constants.ShouldBeUndefined;

      msg = (template === undefined) ? msg : util.format.apply(this, [msg].concat(template));
      throw new Error(msg);
    }
    return this;
  }

  /**
   * Throws an error if 'val' is not of type Array.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {this} - Returns itself to allow chainable validations.
   */
  static shouldBeArray(val, message, template) {
    if (validate.shouldBeArray(val)) {
      var msg = message || constants.ShouldBeArray;

      msg = (template === undefined) ? msg : util.format.apply(this, [msg].concat(template));
      throw new Error(msg);
    }
    return this;
  }

  /**
   * Throws an error if 'val' is of type Array.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {this} - Returns itself to allow chainable validations.
   */
  static shouldNotBeArray(val, message, template) {
    if (validate.shouldNotBeArray(val)) {
      var msg = message || constants.ShouldNotBeArray;

      msg = (template === undefined) ? msg : util.format.apply(this, [msg].concat(template));
      throw new Error(msg);
    }
    return this;
  }

  /**
   * Throws an error if 'val' is not of type Object.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {this} - Returns itself to allow chainable validations.
   */
  static shouldBeObject(val, message, template) {
    if (validate.shouldBeObject(val)) {
      var msg = message || constants.ShouldBeObject;

      msg = (template === undefined) ? msg : util.format.apply(this, [msg].concat(template));
      throw new Error(msg);
    }
    return this;
  }

  /**
   * Throws an error if 'val' is of type Object.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {this} - Returns itself to allow chainable validations.
   */
  static shouldNotBeObject(val, message, template) {
    if (validate.shouldNotBeObject(val)) {
      var msg = message || constants.ShouldNotBeObject;

      msg = (template === undefined) ? msg : util.format.apply(this, [msg].concat(template));
      throw new Error(msg);
    }
    return this;
  }

  /**
   * Throws an error if 'val' is not empty.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {this} - Returns itself to allow chainable validations.
   */
  static shouldBeEmpty(val, message, template) {
    if (validate.shouldBeEmpty(val)) {
      var msg = message || constants.ShouldBeEmpty;

      msg = (template === undefined) ? msg : util.format.apply(this, [msg].concat(template));
      throw new Error(msg);
    }
    return this;
  }

  /**
   * Throws an error if 'val' is empty.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {this} - Returns itself to allow chainable validations.
   */
  static shouldNotBeEmpty(val, message, template) {
    if (validate.shouldNotBeEmpty(val)) {
      var msg = message || constants.ShouldNotBeEmpty;

      msg = (template === undefined) ? msg : util.format.apply(this, [msg].concat(template));
      throw new Error(msg);
    }
    return this;
  }

  /**
   * Throws an error if 'val' is not of type Function.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {this} - Returns itself to allow chainable validations.
   */
  static shouldBeFunction(val, message, template) {
    if (validate.shouldBeFunction(val)) {
      var msg = message || constants.ShouldBeFunction;

      msg = (template === undefined) ? msg : util.format.apply(this, [msg].concat(template));
      throw new Error(msg);
    }
    return this;
  }

  /**
   * Throws an error if 'val' is of type Function.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {this} - Returns itself to allow chainable validations.
   */
  static shouldNotBeFunction(val, message, template) {
    if (validate.shouldNotBeFunction(val)) {
      var msg = message || constants.ShouldNotBeFunction;

      msg = (template === undefined) ? msg : util.format.apply(this, [msg].concat(template));
      throw new Error(msg);
    }
    return this;
  }

  /**
   * Throws an error if 'val' is not of type String.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {this} - Returns itself to allow chainable validations.
   */
  static shouldBeString(val, message, template) {
    if (validate.shouldBeString(val)) {
      var msg = message || constants.ShouldBeString;

      msg = (template === undefined) ? msg : util.format.apply(this, [msg].concat(template));
      throw new Error(msg);
    }
    return this;
  }

  /**
   * Throws an error if 'val' is of type String.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {this} - Returns itself to allow chainable validations.
   */
  static shouldNotBeString(val, message, template) {
    if (validate.shouldNotBeString(val)) {
      var msg = message || constants.ShouldNotBeString;

      msg = (template === undefined) ? msg : util.format.apply(this, [msg].concat(template));
      throw new Error(msg);
    }
    return this;
  }

  /**
   * Throws an error if 'val' is not of type Number.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {this} - Returns itself to allow chainable validations.
   */
  static shouldBeNumber(val, message, template) {
    if (validate.shouldBeNumber(val)) {
      var msg = message || constants.ShouldBeNumber;

      msg = (template === undefined) ? msg : util.format.apply(this, [msg].concat(template));
      throw new Error(msg);
    }
    return this;
  }

  /**
   * Throws an error if 'val' is of type Number.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {this} - Returns itself to allow chainable validations.
   */
  static shouldNotBeNumber(val, message, template) {
    if (validate.shouldNotBeNumber(val)) {
      var msg = message || constants.ShouldNotBeNumber;

      msg = (template === undefined) ? msg : util.format.apply(this, [msg].concat(template));
      throw new Error(msg);
    }
    return this;
  }

  /**
   * Throws an error if 'val' is not finite.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {this} - Returns itself to allow chainable validations.
   */
  static shouldBeFinite(val, message, template) {
    if (validate.shouldBeFinite(val)) {
      var msg = message || constants.ShouldBeFinite;

      msg = (template === undefined) ? msg : util.format.apply(this, [msg].concat(template));
      throw new Error(msg);
    }
    return this;
  }

  /**
   * Throws an error if 'val' is not infinite.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {this} - Returns itself to allow chainable validations.
   */
  static shouldBeInfinite(val, message, template) {
    if (validate.shouldBeInfinite(val)) {
      var msg = message || constants.ShouldBeInfinite;

      msg = (template === undefined) ? msg : util.format.apply(this, [msg].concat(template));
      throw new Error(msg);
    }
    return this;
  }

  /**
   * Throws an error if 'val' is not of type Boolean.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {this} - Returns itself to allow chainable validations.
   */
  static shouldBeBoolean(val, message, template) {
    if (validate.shouldBeBoolean(val)) {
      var msg = message || constants.ShouldBeBoolean;

      msg = (template === undefined) ? msg : util.format.apply(this, [msg].concat(template));
      throw new Error(msg);
    }
    return this;
  }

  /**
   * Throws an error if 'val' is of type Boolean.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {this} - Returns itself to allow chainable validations.
   */
  static shouldNotBeBoolean(val, message, template) {
    if (validate.shouldNotBeBoolean(val)) {
      var msg = message || constants.ShouldNotBeBoolean;

      msg = (template === undefined) ? msg : util.format.apply(this, [msg].concat(template));
      throw new Error(msg);
    }
    return this;
  }

  /**
   * Throws an error if 'val' is not of type Date.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {this} - Returns itself to allow chainable validations.
   */
  static shouldBeDate(val, message, template) {
    if (validate.shouldBeDate(val)) {
      var msg = message || constants.ShouldBeDate;

      msg = (template === undefined) ? msg : util.format.apply(this, [msg].concat(template));
      throw new Error(msg);
    }
    return this;
  }

  /**
   * Throws an error if 'val' is of type Date.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {this} - Returns itself to allow chainable validations.
   */
  static shouldNotBeDate(val, message, template) {
    if (validate.shouldNotBeDate(val)) {
      var msg = message || constants.ShouldNotBeDate;

      msg = (template === undefined) ? msg : util.format.apply(this, [msg].concat(template));
      throw new Error(msg);
    }
    return this;
  }

  /**
   * Throws an error if 'val' is not a Regular Expression.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {this} - Returns itself to allow chainable validations.
   */
  static shouldBeRegExp(val, message, template) {
    if (validate.shouldBeRegExp(val)) {
      var msg = message || constants.ShouldBeRegExp;

      msg = (template === undefined) ? msg : util.format.apply(this, [msg].concat(template));
      throw new Error(msg);
    }
    return this;
  }

  /**
   * Throws an error if 'val' is a Regular Expression.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {this} - Returns itself to allow chainable validations.
   */
  static shouldNotBeRegExp(val, message, template) {
    if (validate.shouldNotBeRegExp(val)) {
      var msg = message || constants.ShouldNotBeRegExp;

      msg = (template === undefined) ? msg : util.format.apply(this, [msg].concat(template));
      throw new Error(msg);
    }
    return this;
  }

  /**
   * Throws an error if 'val' is not falsey.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {this} - Returns itself to allow chainable validations.
   */
  static shouldBeFalsey(val, message, template) {
    if (validate.shouldBeFalsey(val)) {
      var msg = message || constants.ShouldBeFalsey;

      msg = (template === undefined) ? msg : util.format.apply(this, [msg].concat(template));
      throw new Error(msg);
    }
    return this;
  }

  /**
   * Throws an error if 'val' is falsey.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {this} - Returns itself to allow chainable validations.
   */
  static shouldNotBeFalsey(val, message, template) {
    if (validate.shouldNotBeFalsey(val)) {
      var msg = message || constants.ShouldNotBeFalsey;

      msg = (template === undefined) ? msg : util.format.apply(this, [msg].concat(template));
      throw new Error(msg);
    }
    return this;
  }

  /**
   * Synonym for shouldBeFalsey.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {this} - Returns itself to allow chainable validations.
   */
  static shouldBeFalsy(val, message, template) {
    return this.shouldBeFalsey(val, message, template);
  }

  /**
   * Synonym for shouldNotBeFalsey.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {this} - Returns itself to allow chainable validations.
   */
  static shouldNotBeFalsy(val, message, template) {
    return this.shouldNotBeFalsey(val, message, template);
  }

  /**
   * Synonym for shouldNotBeFalsey.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {this} - Returns itself to allow chainable validations.
   */
  static shouldBeTruthy(val, message, template) {
    return this.shouldNotBeFalsey(val, message, template);
  }

  /**
   * Synonym for shouldBeFalsey.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {this} - Returns itself to allow chainable validations.
   */
  static shouldNotBeTruthy(val, message, template) {
    return this.shouldBeFalsey(val, message, template);
  }

  /**
   * Ensures the truth of an expression involving one or more parameters to the calling method.
   *
   * @param {String} expression - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {this} - Returns itself to allow chainable validations.
   */
  static checkArgument(expression, message, template) {
    if (validate.checkArgument(expression)) {
      var msg = message || constants.IllegalArgument;

      msg = (template === undefined) ? msg : util.format.apply(this, [msg].concat(template));
      throw new Error(msg);
    }
    return this;
  }

  /**
   * Ensures the truth of an expression involving the state of the calling instance, but not involving any parameters to the calling method.
   *
   * @param {String} expression - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {this} - Returns itself to allow chainable validations.
   */
  static checkState(expression, message, template) {
    if (validate.checkState(expression)) {
      var msg = message || constants.IllegalState;

      msg = (template === undefined) ? msg : util.format.apply(this, [msg].concat(template));
      throw new Error(msg);
    }
    return this;
  }

  /**
   * Ensures that index specifies a valid element in an array, list or string of size size.
   *
   * @param {Number} index
   * @param {Number} size
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {this} - Returns itself to allow chainable validations.
   */
  static checkElementIndex(index, size, message, template) {
    if (validate.checkElementIndex(index, size)) {
      var msg = message || constants.ShouldHaveValidIndex;

      msg = (template === undefined) ? msg : util.format.apply(this, [msg].concat(template));
      throw new Error(msg);
    }
    return this;
  }

  /**
   * Ensures that index specifies a valid position in an array, list or string of size size.
   *
   * @param {Number} index
   * @param {Number} size
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {this} - Returns itself to allow chainable validations.
   */
  static checkPositionIndex(index, size, message, template) {
    if (validate.checkPositionIndex(index, size)) {
      var msg = message || constants.ShouldHaveValidPosition;

      msg = (template === undefined) ? msg : util.format.apply(this, [msg].concat(template));
      throw new Error(msg);
    }
    return this;
  }

  /**
   * Ensures that start and end specify a valid positions in an array, list or string of size size, and are in order.
   *
   * @param {Number} start
   * @param {Number} end
   * @param {Number} size
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {this} - Returns itself to allow chainable validations.
   */
  static checkPositionIndexes(start, end, size, message, template) {
    if (validate.checkPositionIndexes(start, end, size)) {
      var msg = message || constants.ShouldHaveValidPositions;

      msg = (template === undefined) ? msg : util.format.apply(this, [msg].concat(template));
      throw new Error(msg);
    }
    return this;
  }
}

module.exports = SingletonValidator;
