"use strict";

var constants = require("./../constants"),
  ErrrDecorator = require("./errr-decorator"),
  _ = require("lodash");

/**
 * Validate single value with a buildable interface on top of the errr node module.
 * Use this interface if you want to utilize the following functionality:
 * 1. Error message templating. 2. Only templates error message if validation fails which saves event queue cycles.
 * 3. Gives ability to append Stack traces to an existing error. 4. Gives ability to append debug params to stack trace.
 */
var ErrrFactory = {
  /**
   * Throws an error if 'val' is not defined.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  shouldBeDefined: function (val, message, template) {
    function doesFail() {
      return _.isUndefined(val);
    }

    message = message || constants.ShouldBeDefined;
    return new ErrrDecorator(message, template, doesFail);
  },
  /**
   * Throws an error if 'val' is defined.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  shouldBeUndefined: function (val, message, template) {
    function doesFail() {
      return !_.isUndefined(val);
    }

    message = message || constants.ShouldBeUndefined;
    return new ErrrDecorator(message, template, doesFail);
  },

  /**
   * Throws an error if 'val' is not of type Array.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  shouldBeArray: function (val, message, template) {
    function doesFail() {
      return !_.isArray(val);
    }

    message = message || constants.ShouldBeArray;
    return new ErrrDecorator(message, template, doesFail);
  },
  /**
   * Throws an error if 'val' is of type Array.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  shouldNotBeArray: function (val, message, template) {
    function doesFail() {
      return _.isArray(val);
    }

    message = message || constants.ShouldNotBeArray;
    return new ErrrDecorator(message, template, doesFail);
  },

  /**
   * Throws an error if 'val' is not of type Object.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  shouldBeObject: function (val, message, template) {
    function doesFail() {
      return !_.isObject(val);
    }

    message = message || constants.ShouldBeObject;
    return new ErrrDecorator(message, template, doesFail);
  },
  /**
   * Throws an error if 'val' is of type Object.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  shouldNotBeObject: function (val, message, template) {
    function doesFail() {
      return _.isObject(val);
    }

    message = message || constants.ShouldNotBeObject;
    return new ErrrDecorator(message, template, doesFail);
  },

  /**
   * Throws an error if 'val' is not empty.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  shouldBeEmpty: function (val, message, template) {
    function doesFail() {
      return !_.isEmpty(val);
    }

    message = message || constants.ShouldBeEmpty;
    return new ErrrDecorator(message, template, doesFail);
  },
  /**
   * Throws an error if 'val' is empty.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  shouldNotBeEmpty: function (val, message, template) {
    function doesFail() {
      return _.isEmpty(val);
    }

    message = message || constants.ShouldNotBeEmpty;
    return new ErrrDecorator(message, template, doesFail);
  },

  /**
   * Throws an error if 'val' is not of type Function.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  shouldBeFunction: function (val, message, template) {
    function doesFail() {
      return !_.isFunction(val);
    }

    message = message || constants.ShouldBeFunction;
    return new ErrrDecorator(message, template, doesFail);
  },
  /**
   * Throws an error if 'val' is of type Function.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  shouldNotBeFunction: function (val, message, template) {
    function doesFail() {
      return _.isFunction(val);
    }

    message = message || constants.ShouldNotBeFunction;
    return new ErrrDecorator(message, template, doesFail);
  },

  /**
   * Throws an error if 'val' is not of type String.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  shouldBeString: function (val, message, template) {
    function doesFail() {
      return !_.isString(val);
    }

    message = message || constants.ShouldBeString;
    return new ErrrDecorator(message, template, doesFail);
  },
  /**
   * Throws an error if 'val' is of type String.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  shouldNotBeString: function (val, message, template) {
    function doesFail() {
      return _.isString(val);
    }

    message = message || constants.ShouldNotBeString;
    return new ErrrDecorator(message, template, doesFail);
  },

  /**
   * Throws an error if 'val' is not of type Number.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  shouldBeNumber: function (val, message, template) {
    function doesFail() {
      return !_.isNumber(val);
    }

    message = message || constants.ShouldBeNumber;
    return new ErrrDecorator(message, template, doesFail);
  },
  /**
   * Throws an error if 'val' is of type Number.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  shouldNotBeNumber: function (val, message, template) {
    function doesFail() {
      return _.isNumber(val);
    }

    message = message || constants.ShouldNotBeNumber;
    return new ErrrDecorator(message, template, doesFail);
  },

  /**
   * Throws an error if 'val' is not finite.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  shouldBeFinite: function (val, message, template) {
    function doesFail() {
      return !_.isFinite(val);
    }

    message = message || constants.ShouldBeFinite;
    return new ErrrDecorator(message, template, doesFail);
  },
  /**
   * Throws an error if 'val' is finite.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  shouldBeInfinite: function (val, message, template) {
    function doesFail() {
      return _.isFinite(val);
    }

    message = message || constants.ShouldBeInfinite;
    return new ErrrDecorator(message, template, doesFail);
  },

  /**
   * Throws an error if 'val' is not of type Boolean.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  shouldBeBoolean: function (val, message, template) {
    function doesFail() {
      return !_.isBoolean(val);
    }

    message = message || constants.ShouldBeBoolean;
    return new ErrrDecorator(message, template, doesFail);
  },
  /**
   * Throws an error if 'val' is of type Boolean.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  shouldNotBeBoolean: function (val, message, template) {
    function doesFail() {
      return _.isBoolean(val);
    }

    message = message || constants.ShouldNotBeBoolean;
    return new ErrrDecorator(message, template, doesFail);
  },

  /**
   * Throws an error if 'val' is not of type Date.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  shouldBeDate: function (val, message, template) {
    function doesFail() {
      return !_.isDate(val);
    }

    message = message || constants.ShouldBeDate;
    return new ErrrDecorator(message, template, doesFail);
  },
  /**
   * Throws an error if 'val' is of type Date.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  shouldNotBeDate: function (val, message, template) {
    function doesFail() {
      return _.isDate(val);
    }

    message = message || constants.ShouldNotBeDate;
    return new ErrrDecorator(message, template, doesFail);
  },

  /**
   * Throws an error if 'val' is not a Regular Expression.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  shouldBeRegExp: function (val, message, template) {
    function doesFail() {
      return !_.isRegExp(val);
    }

    message = message || constants.ShouldBeRegExp;
    return new ErrrDecorator(message, template, doesFail);
  },
  /**
   * Throws an error if 'val' is a Regular Expression.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  shouldNotBeRegExp: function (val, message, template) {
    function doesFail() {
      return _.isRegExp(val);
    }

    message = message || constants.ShouldNotBeRegExp;
    return new ErrrDecorator(message, template, doesFail);
  },

  /**
   * Throws an error if 'val' is not falsey.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  shouldBeFalsey: function (val, message, template) {
    function doesFail() {
      return (!_.isNaN(val) && !_.isNull(val) && !_.isUndefined(val));
    }

    message = message || constants.ShouldBeFalsey;
    return new ErrrDecorator(message, template, doesFail);
  },
  /**
   * Throws an error if 'val' is falsey.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  shouldNotBeFalsey: function (val, message, template) {
    function doesFail() {
      return (_.isNaN(val) || _.isNull(val) || _.isUndefined(val));
    }

    message = message || constants.ShouldNotBeFalsey;
    return new ErrrDecorator(message, template, doesFail);
  },
  /**
   * Synonym for shouldBeFalsey.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  shouldBeFalsy: function (val, message, template) {
    return this.shouldBeFalsey(val, message, template);
  },
  /**
   * Synonym for shouldNotBeFalsey.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  shouldNotBeFalsy: function (val, message, template) {
    return this.shouldNotBeFalsey(val, message, template);
  },

  /**
   * Synonym for shouldNotBeFalsey.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  shouldBeTruthy: function (val, message, template) {
    return this.shouldNotBeFalsey(val, message, template);
  },
  /**
   * Synonym for shouldBeFalsey.
   *
   * @param {String} val - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  shouldNotBeTruthy: function (val, message, template) {
    return this.shouldBeFalsey(val, message, template);
  },

  /**
   * Ensures the truth of an expression involving one or more parameters to the calling method.
   *
   * @param {String} expression - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  checkArgument: function (expression, message, template) {
    function doesFail() {
      return !expression;
    }

    message = message || constants.IllegalArgument;
    return new ErrrDecorator(message, template, doesFail);
  },
  /**
   * Ensures the truth of an expression involving the state of the calling instance, but not involving any parameters to the calling method.
   *
   * @param {String} expression - The value to validate.
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  checkState: function (expression, message, template) {
    function doesFail() {
      return !expression;
    }

    message = message || constants.IllegalState;
    return new ErrrDecorator(message, template, doesFail);
  },

  /**
   * Ensures that index specifies a valid element in an array, list or string of size size.
   *
   * @param {Number} index
   * @param {Number} size
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  checkElementIndex: function (index, size, message, template) {
    function doesFail() {
      return (index < 0 || index >= size);
    }

    message = message || constants.ShouldHaveValidIndex;
    return new ErrrDecorator(message, template, doesFail);
  },
  /**
   * Ensures that index specifies a valid position in an array, list or string of size size.
   *
   * @param {Number} index
   * @param {Number} size
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  checkPositionIndex: function (index, size, message, template) {
    function doesFail() {
      return (index < 0 || index > size);
    }

    message = message || constants.ShouldHaveValidPosition;
    return new ErrrDecorator(message, template, doesFail);
  },
  /**
   * Ensures that start and end specify a valid positions in an array, list or string of size size, and are in order.
   *
   * @param {Number} start
   * @param {Number} end
   * @param {Number} size
   * @param {String} [message] - The error message or the error template string to use if the validation fails.
   * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
   * @returns {ErrrDecorator} - An object that decorates the errr node module.
   */
  checkPositionIndexes: function (start, end, size, message, template) {
    function doesFail() {
      return ((end < start) || (start < 0 || end > size));
    }

    message = message || constants.ShouldHaveValidPositions;
    return new ErrrDecorator(message, template, doesFail);
  }
};

module.exports = ErrrFactory;
