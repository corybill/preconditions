"use strict";

var constants = require("./../constants"),
  ErrrDecorator = require("./decorator"),
  CoreUtilIs = require("core-util-is");

/**
 * Validate single value with a buildable interface on top of the errr node module.
 * Use this interface if you want to utilize the following functionality:
 * 1. Error message templating.
 * 2. Only templates error message if ErrrValidator fails which saves event queue cycles.
 * 3. Gives ability to append Stack traces to an existing error.
 * 4. Gives ability to append debug params to stack trace.
 */
class ErrrValidator {
  /**
   * Throws an error if 'val' is not defined.
   *
   * @param {*} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the ErrrValidator fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  static shouldBeDefined(val, message, template) {
    function doesFail() {
      return CoreUtilIs.isUndefined(val);
    }

    message = message || constants.ShouldBeDefined;
    return new ErrrDecorator(message, template, doesFail);
  }
  /**
   * Throws an error if 'val' is defined.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the ErrrValidator fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  static shouldBeUndefined(val, message, template) {
    function doesFail() {
      return !CoreUtilIs.isUndefined(val);
    }

    message = message || constants.ShouldBeUndefined;
    return new ErrrDecorator(message, template, doesFail);
  }

  /**
   * Throws an error if 'val' is not of type Array.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the ErrrValidator fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  static shouldBeArray(val, message, template) {
    function doesFail() {
      return !CoreUtilIs.isArray(val);
    }

    message = message || constants.ShouldBeArray;
    return new ErrrDecorator(message, template, doesFail);
  }
  /**
   * Throws an error if 'val' is of type Array.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the ErrrValidator fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  static shouldNotBeArray(val, message, template) {
    function doesFail() {
      return CoreUtilIs.isArray(val);
    }

    message = message || constants.ShouldNotBeArray;
    return new ErrrDecorator(message, template, doesFail);
  }

  /**
   * Throws an error if 'val' is not of type Object.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the ErrrValidator fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  static shouldBeObject(val, message, template) {
    function doesFail() {
      return !CoreUtilIs.isObject(val);
    }

    message = message || constants.ShouldBeObject;
    return new ErrrDecorator(message, template, doesFail);
  }
  /**
   * Throws an error if 'val' is of type Object.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the ErrrValidator fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  static shouldNotBeObject(val, message, template) {
    function doesFail() {
      return CoreUtilIs.isObject(val);
    }

    message = message || constants.ShouldNotBeObject;
    return new ErrrDecorator(message, template, doesFail);
  }

  /**
   * Throws an error if 'val' is not empty.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the ErrrValidator fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  static shouldBeEmpty(val, message, template) {
    function doesFail() {
      return !CoreUtilIs.isEmpty(val);
    }

    message = message || constants.ShouldBeEmpty;
    return new ErrrDecorator(message, template, doesFail);
  }
  /**
   * Throws an error if 'val' is empty.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the ErrrValidator fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  static shouldNotBeEmpty(val, message, template) {
    function doesFail() {
      return CoreUtilIs.isEmpty(val);
    }

    message = message || constants.ShouldNotBeEmpty;
    return new ErrrDecorator(message, template, doesFail);
  }

  /**
   * Throws an error if 'val' is not of type Function.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the ErrrValidator fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  static shouldBeFunction(val, message, template) {
    function doesFail() {
      return !CoreUtilIs.isFunction(val);
    }

    message = message || constants.ShouldBeFunction;
    return new ErrrDecorator(message, template, doesFail);
  }
  /**
   * Throws an error if 'val' is of type Function.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the ErrrValidator fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  static shouldNotBeFunction(val, message, template) {
    function doesFail() {
      return CoreUtilIs.isFunction(val);
    }

    message = message || constants.ShouldNotBeFunction;
    return new ErrrDecorator(message, template, doesFail);
  }

  /**
   * Throws an error if 'val' is not of type String.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the ErrrValidator fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  static shouldBeString(val, message, template) {
    function doesFail() {
      return !CoreUtilIs.isString(val);
    }

    message = message || constants.ShouldBeString;
    return new ErrrDecorator(message, template, doesFail);
  }
  /**
   * Throws an error if 'val' is of type String.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the ErrrValidator fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  static shouldNotBeString(val, message, template) {
    function doesFail() {
      return CoreUtilIs.isString(val);
    }

    message = message || constants.ShouldNotBeString;
    return new ErrrDecorator(message, template, doesFail);
  }

  /**
   * Throws an error if 'val' is not of type Number.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the ErrrValidator fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  static shouldBeNumber(val, message, template) {
    function doesFail() {
      return !CoreUtilIs.isNumber(val);
    }

    message = message || constants.ShouldBeNumber;
    return new ErrrDecorator(message, template, doesFail);
  }
  /**
   * Throws an error if 'val' is of type Number.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the ErrrValidator fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  static shouldNotBeNumber(val, message, template) {
    function doesFail() {
      return CoreUtilIs.isNumber(val);
    }

    message = message || constants.ShouldNotBeNumber;
    return new ErrrDecorator(message, template, doesFail);
  }

  /**
   * Throws an error if 'val' is not finite.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the ErrrValidator fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  static shouldBeFinite(val, message, template) {
    function doesFail() {
      return !CoreUtilIs.isFinite(val);
    }

    message = message || constants.ShouldBeFinite;
    return new ErrrDecorator(message, template, doesFail);
  }
  /**
   * Throws an error if 'val' is finite.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the ErrrValidator fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  static shouldBeInfinite(val, message, template) {
    function doesFail() {
      return CoreUtilIs.isFinite(val);
    }

    message = message || constants.ShouldBeInfinite;
    return new ErrrDecorator(message, template, doesFail);
  }

  /**
   * Throws an error if 'val' is not of type Boolean.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the ErrrValidator fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  static shouldBeBoolean(val, message, template) {
    function doesFail() {
      return !CoreUtilIs.isBoolean(val);
    }

    message = message || constants.ShouldBeBoolean;
    return new ErrrDecorator(message, template, doesFail);
  }
  /**
   * Throws an error if 'val' is of type Boolean.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the ErrrValidator fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  static shouldNotBeBoolean(val, message, template) {
    function doesFail() {
      return CoreUtilIs.isBoolean(val);
    }

    message = message || constants.ShouldNotBeBoolean;
    return new ErrrDecorator(message, template, doesFail);
  }

  /**
   * Throws an error if 'val' is not of type Date.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the ErrrValidator fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  static shouldBeDate(val, message, template) {
    function doesFail() {
      return !CoreUtilIs.isDate(val);
    }

    message = message || constants.ShouldBeDate;
    return new ErrrDecorator(message, template, doesFail);
  }
  /**
   * Throws an error if 'val' is of type Date.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the ErrrValidator fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  static shouldNotBeDate(val, message, template) {
    function doesFail() {
      return CoreUtilIs.isDate(val);
    }

    message = message || constants.ShouldNotBeDate;
    return new ErrrDecorator(message, template, doesFail);
  }

  /**
   * Throws an error if 'val' is not a Regular Expression.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the ErrrValidator fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  static shouldBeRegExp(val, message, template) {
    function doesFail() {
      return !CoreUtilIs.isRegExp(val);
    }

    message = message || constants.ShouldBeRegExp;
    return new ErrrDecorator(message, template, doesFail);
  }
  /**
   * Throws an error if 'val' is a Regular Expression.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the ErrrValidator fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  static shouldNotBeRegExp(val, message, template) {
    function doesFail() {
      return CoreUtilIs.isRegExp(val);
    }

    message = message || constants.ShouldNotBeRegExp;
    return new ErrrDecorator(message, template, doesFail);
  }

  /**
   * Throws an error if 'val' is not falsey.
   *
   * @param {Any} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the ErrrValidator fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  static shouldBeFalsey(val, message, template) {
    function doesFail() {
      return !!val;
    }

    message = message || constants.ShouldBeFalsey;
    return new ErrrDecorator(message, template, doesFail);
  }
  /**
   * Throws an error if 'val' is falsey.
   *
   * @param {Any} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the ErrrValidator fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  static shouldNotBeFalsey(val, message, template) {
    function doesFail() {
      return !val;
    }

    message = message || constants.ShouldNotBeFalsey;
    return new ErrrDecorator(message, template, doesFail);
  }
  /**
   * Synonym for shouldBeFalsey.
   *
   * @param {Any} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the ErrrValidator fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  static shouldBeFalsy(val, message, template) {
    return this.shouldBeFalsey(val, message, template);
  }
  /**
   * Synonym for shouldNotBeFalsey.
   *
   * @param {Any} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the ErrrValidator fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  static shouldNotBeFalsy(val, message, template) {
    return this.shouldNotBeFalsey(val, message, template);
  }

  /**
   * Synonym for shouldNotBeFalsey.
   *
   * @param {Any} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the ErrrValidator fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  static shouldBeTruthy(val, message, template) {
    return this.shouldNotBeFalsey(val, message, template);
  }
  /**
   * Synonym for shouldBeFalsey.
   *
   * @param {Any} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the ErrrValidator fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  static shouldNotBeTruthy(val, message, template) {
    return this.shouldBeFalsey(val, message, template);
  }

  /**
   * Ensures the truth of an expression involving one or more parameters to the calling method.
   *
   * @param {Any} expression - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the ErrrValidator fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  static checkArgument(expression, message, template) {
    function doesFail() {
      return !expression;
    }

    message = message || constants.IllegalArgument;
    return new ErrrDecorator(message, template, doesFail);
  }
  /**
   * Ensures the truth of an expression involving the state of the calling instance, but not involving any parameters to the calling method.
   *
   * @param {Any} expression - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the ErrrValidator fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  static checkState(expression, message, template) {
    function doesFail() {
      return !expression;
    }

    message = message || constants.IllegalState;
    return new ErrrDecorator(message, template, doesFail);
  }

  /**
   * Ensures that index specifies a valid element in an array, list or string of size size.
   *
   * @param {Number} index
   * @param {Number} size
   * @param {String} [message] - The error message or the error template string to use if the ErrrValidator fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  static checkElementIndex(index, size, message, template) {
    function doesFail() {
      return (index < 0 || index >= size);
    }

    message = message || constants.ShouldHaveValidIndex;
    return new ErrrDecorator(message, template, doesFail);
  }
  /**
   * Ensures that index specifies a valid position in an array, list or string of size size.
   *
   * @param {Number} index
   * @param {Number} size
   * @param {String} [message] - The error message or the error template string to use if the ErrrValidator fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  static checkPositionIndex(index, size, message, template) {
    function doesFail() {
      return (index < 0 || index > size);
    }

    message = message || constants.ShouldHaveValidPosition;
    return new ErrrDecorator(message, template, doesFail);
  }
  /**
   * Ensures that start and end specify a valid positions in an array, list or string of size size, and are in order.
   *
   * @param {Number} start
   * @param {Number} end
   * @param {Number} size
   * @param {String} [message] - The error message or the error template string to use if the ErrrValidator fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  static checkPositionIndexes(start, end, size, message, template) {
    function doesFail() {
      return ((end < start) || (start < 0 || end > size));
    }

    message = message || constants.ShouldHaveValidPositions;
    return new ErrrDecorator(message, template, doesFail);
  }
}

module.exports = ErrrValidator;
