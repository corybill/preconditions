import { format } from "node:util";

import * as constants from "../constants.js";
import validate from "../validator/validate.js";

function formatMessage(message, template) {
  if (template === undefined) {
    return message;
  }
  return format(message, ...template);
}

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
      throw new Error(formatMessage(message || constants.ShouldBeDefined, template));
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
      throw new Error(formatMessage(message || constants.ShouldBeUndefined, template));
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
      throw new Error(formatMessage(message || constants.ShouldBeArray, template));
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
      throw new Error(formatMessage(message || constants.ShouldNotBeArray, template));
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
      throw new Error(formatMessage(message || constants.ShouldBeObject, template));
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
      throw new Error(formatMessage(message || constants.ShouldNotBeObject, template));
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
      throw new Error(formatMessage(message || constants.ShouldBeEmpty, template));
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
      throw new Error(formatMessage(message || constants.ShouldNotBeEmpty, template));
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
      throw new Error(formatMessage(message || constants.ShouldBeFunction, template));
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
      throw new Error(formatMessage(message || constants.ShouldNotBeFunction, template));
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
      throw new Error(formatMessage(message || constants.ShouldBeString, template));
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
      throw new Error(formatMessage(message || constants.ShouldNotBeString, template));
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
      throw new Error(formatMessage(message || constants.ShouldBeNumber, template));
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
      throw new Error(formatMessage(message || constants.ShouldNotBeNumber, template));
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
      throw new Error(formatMessage(message || constants.ShouldBeFinite, template));
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
      throw new Error(formatMessage(message || constants.ShouldBeInfinite, template));
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
      throw new Error(formatMessage(message || constants.ShouldBeBoolean, template));
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
      throw new Error(formatMessage(message || constants.ShouldNotBeBoolean, template));
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
      throw new Error(formatMessage(message || constants.ShouldBeDate, template));
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
      throw new Error(formatMessage(message || constants.ShouldNotBeDate, template));
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
      throw new Error(formatMessage(message || constants.ShouldBeRegExp, template));
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
      throw new Error(formatMessage(message || constants.ShouldNotBeRegExp, template));
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
      throw new Error(formatMessage(message || constants.ShouldBeFalsey, template));
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
      throw new Error(formatMessage(message || constants.ShouldNotBeFalsey, template));
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
      throw new Error(formatMessage(message || constants.IllegalArgument, template));
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
      throw new Error(formatMessage(message || constants.IllegalState, template));
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
      throw new Error(formatMessage(message || constants.ShouldHaveValidIndex, template));
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
      throw new Error(formatMessage(message || constants.ShouldHaveValidPosition, template));
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
      throw new Error(formatMessage(message || constants.ShouldHaveValidPositions, template));
    }
    return this;
  }
}

export default SingletonValidator;
