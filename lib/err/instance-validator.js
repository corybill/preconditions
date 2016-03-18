"use strict";

var errValidation = require("./singleton-validator"),
  _ = require("lodash");

/**
 * @warning - This interface will not perform as well 'singleton' or 'errr' interfaces.  Please use those if possible.
 *
 * Validate values in a nested object using a dot notation structure (e.g. .shouldBeString("Person.Address.Street.zip"))
 * System will validate the the Person, Person.Address, and Person.Address.Street objects exist, and will validate that zip is a String.
 *
 * Use this interface if you want to utilize the following functionality:
 * 1. Nested object validation using a dot notation.
 *
 * @param {Object} objectUnderTest - Object to run validations against.
 * @class
 */
function InstanceValidator(objectUnderTest) {
  // out = Object Under Test
  this.out = objectUnderTest;
}

InstanceValidator.prototype._validate_ = function (configPath, verification, message) {
  var variables = configPath.split(".");

  var current = this.out || {};
  var count = 0;

  _.forEach(variables, function (variable) {
    // If statement needed because we need to be able to verify shouldBeUndefined.
    if (count !== variables.length - 1) {
      errValidation.shouldBeDefined(current[variable], message);
    }

    current = current[variable];
    count++;
  });

  verification(current);
};

/**
 * Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is defined.
 *
 * @param {String} configPath - The value to validate.
 * @param {String} [message] - The error message or the error template string to use if the validation fails.
 * @returns {this} - Returns itself to allow chainable validations.
 */
InstanceValidator.prototype.shouldBeDefined = function (configPath, message) {
  this._validate_(configPath, function (val) {
    errValidation.shouldBeDefined(val, message);
  }, message);

  return this;
};
/**
 * Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is not defined.
 *
 * @param {String} configPath - The value to validate.
 * @param {String} [message] - The error message or the error template string to use if the validation fails.
 * @returns {this} - Returns itself to allow chainable validations.
 */
InstanceValidator.prototype.shouldBeUndefined = function (configPath, message) {
  this._validate_(configPath, function (val) {
    errValidation.shouldBeUndefined(val, message);
  }, message);

  return this;
};

/**
 * Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is not an array or is an empty array.
 *
 * @param {String} configPath - The value to validate.
 * @param {String} [message] - The error message or the error template string to use if the validation fails.
 * @returns {this} - Returns itself to allow chainable validations.
 */
InstanceValidator.prototype.shouldBeNonEmptyArray = function (configPath, message) {
  this._validate_(configPath, function (val) {
    errValidation.shouldBeArray(val, message);
    errValidation.shouldNotBeEmpty(val, message);
  }, message);

  return this;
};

/**
 * Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is an array.
 *
 * @param {String} configPath - The value to validate.
 * @param {String} [message] - The error message or the error template string to use if the validation fails.
 * @returns {this} - Returns itself to allow chainable validations.
 */
InstanceValidator.prototype.shouldBeArray = function (configPath, message) {
  this._validate_(configPath, function (val) {
    errValidation.shouldBeArray(val, message);
  }, message);

  return this;
};
/**
 * Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is not an array.
 *
 * @param {String} configPath - The value to validate.
 * @param {String} [message] - The error message or the error template string to use if the validation fails.
 * @returns {this} - Returns itself to allow chainable validations.
 */
InstanceValidator.prototype.shouldNotBeArray = function (configPath, message) {
  this._validate_(configPath, function (val) {
    errValidation.shouldNotBeArray(val, message);
  }, message);

  return this;
};

/**
 * Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is of type Object.
 *
 * @param {String} configPath - The value to validate.
 * @param {String} [message] - The error message or the error template string to use if the validation fails.
 * @returns {this} - Returns itself to allow chainable validations.
 */
InstanceValidator.prototype.shouldBeObject = function (configPath, message) {
  this._validate_(configPath, function (val) {
    errValidation.shouldBeObject(val, message);
  }, message);

  return this;
};
/**
 * Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is not of type Object.
 *
 * @param {String} configPath - The value to validate.
 * @param {String} [message] - The error message or the error template string to use if the validation fails.
 * @returns {this} - Returns itself to allow chainable validations.
 */
InstanceValidator.prototype.shouldNotBeObject = function (configPath, message) {
  this._validate_(configPath, function (val) {
    errValidation.shouldNotBeObject(val, message);
  }, message);

  return this;
};

/**
 * Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is not empty.
 *
 * @param {String} configPath - The value to validate.
 * @param {String} [message] - The error message or the error template string to use if the validation fails.
 * @returns {this} - Returns itself to allow chainable validations.
 */
InstanceValidator.prototype.shouldBeEmpty = function (configPath, message) {
  this._validate_(configPath, function (val) {
    errValidation.shouldBeEmpty(val, message);
  }, message);

  return this;
};
/**
 * Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is empty.
 *
 * @param {String} configPath - The value to validate.
 * @param {String} [message] - The error message or the error template string to use if the validation fails.
 * @returns {this} - Returns itself to allow chainable validations.
 */
InstanceValidator.prototype.shouldNotBeEmpty = function (configPath, message) {
  this._validate_(configPath, function (val) {
    errValidation.shouldNotBeEmpty(val, message);
  }, message);

  return this;
};

/**
 * Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is not of type Function.
 *
 * @param {String} configPath - The value to validate.
 * @param {String} [message] - The error message or the error template string to use if the validation fails.
 * @returns {this} - Returns itself to allow chainable validations.
 */
InstanceValidator.prototype.shouldBeFunction = function (configPath, message) {
  this._validate_(configPath, function (val) {
    errValidation.shouldBeFunction(val, message);
  }, message);

  return this;
};
/**
 * Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is of type Function.
 *
 * @param {String} configPath - The value to validate.
 * @param {String} [message] - The error message or the error template string to use if the validation fails.
 * @returns {this} - Returns itself to allow chainable validations.
 */
InstanceValidator.prototype.shouldNotBeFunction = function (configPath, message) {
  this._validate_(configPath, function (val) {
    errValidation.shouldNotBeFunction(val, message);
  }, message);

  return this;
};

/**
 * Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is not of type String.
 *
 * @param {String} configPath - The value to validate.
 * @param {String} [message] - The error message or the error template string to use if the validation fails.
 * @returns {this} - Returns itself to allow chainable validations.
 */
InstanceValidator.prototype.shouldBeString = function (configPath, message) {
  this._validate_(configPath, function (val) {
    errValidation.shouldBeString(val, message);
  }, message);

  return this;
};
/**
 * Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is of type String.
 *
 * @param {String} configPath - The value to validate.
 * @param {String} [message] - The error message or the error template string to use if the validation fails.
 * @returns {this} - Returns itself to allow chainable validations.
 */
InstanceValidator.prototype.shouldNotBeString = function (configPath, message) {
  this._validate_(configPath, function (val) {
    errValidation.shouldNotBeString(val, message);
  }, message);

  return this;
};

/**
 * Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is not of type Number.
 *
 * @param {String} configPath - The value to validate.
 * @param {String} [message] - The error message or the error template string to use if the validation fails.
 * @returns {this} - Returns itself to allow chainable validations.
 */
InstanceValidator.prototype.shouldBeNumber = function (configPath, message) {
  this._validate_(configPath, function (val) {
    errValidation.shouldBeNumber(val, message);
  }, message);

  return this;
};
/**
 * Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is of type Number.
 *
 * @param {String} configPath - The value to validate.
 * @param {String} [message] - The error message or the error template string to use if the validation fails.
 * @returns {this} - Returns itself to allow chainable validations.
 */
InstanceValidator.prototype.shouldNotBeNumber = function (configPath, message) {
  this._validate_(configPath, function (val) {
    errValidation.shouldNotBeNumber(val, message);
  }, message);

  return this;
};

/**
 * Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is not finite.
 *
 * @param {String} configPath - The value to validate.
 * @param {String} [message] - The error message or the error template string to use if the validation fails.
 * @returns {this} - Returns itself to allow chainable validations.
 */
InstanceValidator.prototype.shouldBeFinite = function (configPath, message) {
  this._validate_(configPath, function (val) {
    errValidation.shouldBeFinite(val, message);
  }, message);

  return this;
};
/**
 * Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is not infinte.
 *
 * @param {String} configPath - The value to validate.
 * @param {String} [message] - The error message or the error template string to use if the validation fails.
 * @returns {this} - Returns itself to allow chainable validations.
 */
InstanceValidator.prototype.shouldBeInfinite = function (configPath, message) {
  this._validate_(configPath, function (val) {
    errValidation.shouldBeInfinite(val, message);
  }, message);

  return this;
};

/**
 * Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is not of type Boolean.
 *
 * @param {String} configPath - The value to validate.
 * @param {String} [message] - The error message or the error template string to use if the validation fails.
 * @returns {this} - Returns itself to allow chainable validations.
 */
InstanceValidator.prototype.shouldBeBoolean = function (configPath, message) {
  this._validate_(configPath, function (val) {
    errValidation.shouldBeBoolean(val, message);
  }, message);

  return this;
};
/**
 * Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is of type Boolean.
 *
 * @param {String} configPath - The value to validate.
 * @param {String} [message] - The error message or the error template string to use if the validation fails.
 * @returns {this} - Returns itself to allow chainable validations.
 */
InstanceValidator.prototype.shouldNotBeBoolean = function (configPath, message) {
  this._validate_(configPath, function (val) {
    errValidation.shouldNotBeBoolean(val, message);
  }, message);

  return this;
};

/**
 * Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is not of type Date.
 *
 * @param {String} configPath - The value to validate.
 * @param {String} [message] - The error message or the error template string to use if the validation fails.
 * @returns {this} - Returns itself to allow chainable validations.
 */
InstanceValidator.prototype.shouldBeDate = function (configPath, message) {
  this._validate_(configPath, function (val) {
    errValidation.shouldBeDate(val, message);
  }, message);

  return this;
};
/**
 * Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is of type Date.
 *
 * @param {String} configPath - The value to validate.
 * @param {String} [message] - The error message or the error template string to use if the validation fails.
 * @returns {this} - Returns itself to allow chainable validations.
 */
InstanceValidator.prototype.shouldNotBeDate = function (configPath, message) {
  this._validate_(configPath, function (val) {
    errValidation.shouldNotBeDate(val, message);
  }, message);

  return this;
};

/**
 * Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is not a Regular Expression.
 *
 * @param {String} configPath - The value to validate.
 * @param {String} [message] - The error message or the error template string to use if the validation fails.
 * @returns {this} - Returns itself to allow chainable validations.
 */
InstanceValidator.prototype.shouldBeRegExp = function (configPath, message) {
  this._validate_(configPath, function (val) {
    errValidation.shouldBeRegExp(val, message);
  }, message);

  return this;
};
/**
 * Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is a Regular Expression.
 *
 * @param {String} configPath - The value to validate.
 * @param {String} [message] - The error message or the error template string to use if the validation fails.
 * @returns {this} - Returns itself to allow chainable validations.
 */
InstanceValidator.prototype.shouldNotBeRegExp = function (configPath, message) {
  this._validate_(configPath, function (val) {
    errValidation.shouldNotBeRegExp(val, message);
  }, message);

  return this;
};

/**
 * Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is not falsey.
 *
 * @param {String} configPath - The value to validate.
 * @param {String} [message] - The error message or the error template string to use if the validation fails.
 * @returns {this} - Returns itself to allow chainable validations.
 */
InstanceValidator.prototype.shouldBeFalsey = function (configPath, message) {
  this._validate_(configPath, function (val) {
    errValidation.shouldBeFalsey(val, message);
  }, message);

  return this;
};
/**
 * Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is falsey.
 *
 * @param {String} configPath - The value to validate.
 * @param {String} [message] - The error message or the error template string to use if the validation fails.
 * @returns {this} - Returns itself to allow chainable validations.
 */
InstanceValidator.prototype.shouldNotBeFalsey = function (configPath, message) {
  this._validate_(configPath, function (val) {
    errValidation.shouldNotBeFalsey(val, message);
  }, message);

  return this;
};

/**
 * Synonym for shouldBeFalsey.
 *
 * @param {String} configPath - The value to validate.
 * @param {String} [message] - The error message or the error template string to use if the validation fails.
 * @returns {this} - Returns itself to allow chainable validations.
 */
InstanceValidator.prototype.shouldBeFalsy = function (configPath, message) {
  this._validate_(configPath, function (val) {
    errValidation.shouldBeFalsey(val, message);
  }, message);

  return this;
};
/**
 * Synonym for shouldNotBeFalsey.
 *
 * @param {String} configPath - The value to validate.
 * @param {String} [message] - The error message or the error template string to use if the validation fails.
 * @returns {this} - Returns itself to allow chainable validations.
 */
InstanceValidator.prototype.shouldNotBeFalsy = function (configPath, message) {
  this._validate_(configPath, function (val) {
    errValidation.shouldNotBeFalsey(val, message);
  }, message);

  return this;
};

/**
 * Synonym for shouldNotBeFalsey.
 *
 * @param {String} configPath - The value to validate.
 * @param {String} [message] - The error message or the error template string to use if the validation fails.
 * @returns {this} - Returns itself to allow chainable validations.
 */
InstanceValidator.prototype.shouldBeTruthy = function (configPath, message) {
  this._validate_(configPath, function (val) {
    errValidation.shouldNotBeFalsey(val, message);
  }, message);

  return this;
};
/**
 * Synonym for shouldBeFalsey.
 *
 * @param {String} configPath - The value to validate.
 * @param {String} [message] - The error message or the error template string to use if the validation fails.
 * @returns {this} - Returns itself to allow chainable validations.
 */
InstanceValidator.prototype.shouldNotBeTruthy = function (configPath, message) {
  this._validate_(configPath, function (val) {
    errValidation.shouldBeFalsey(val, message);
  }, message);

  return this;
};

/**
 * Ensures the truth of an expression involving one or more parameters to the calling method.
 *
 * @param {String} expression - The value to validate.
 * @param {String} [message] - The error message or the error template string to use if the validation fails.
 * @param {Array} [template] - Template params.  If provided, the error message will be generated using util.format(message, template).
 * @returns {this} - Returns itself to allow chainable validations.
 */
InstanceValidator.prototype.checkArgument = function (expression, message) {
  errValidation.checkArgument(expression, message);
  return this;
};
/**
 * Ensures the truth of an expression involving the state of the calling InstanceValidator, but not involving any parameters to the calling method.
 *
 * @param {String} expression - The value to validate.
 * @param {String} [message] - The error message or the error template string to use if the validation fails.
 * @returns {this} - Returns itself to allow chainable validations.
 */
InstanceValidator.prototype.checkState = function (expression, message) {
  errValidation.checkState(expression, message);
  return this;
};

/**
 * Ensures that index specifies a valid element in an array, list or string of size size.
 *
 * @param {Number} index
 * @param {Number} size
 * @param {String} [message] - The error message or the error template string to use if the validation fails.
 * @returns {this} - Returns itself to allow chainable validations.
 */
InstanceValidator.prototype.checkElementIndex = function (index, size, message) {
  errValidation.checkElementIndex(index, size, message);
  return this;
};
/**
 * Ensures that index specifies a valid position in an array, list or string of size size.
 *
 * @param {Number} index
 * @param {Number} size
 * @param {String} [message] - The error message or the error template string to use if the validation fails.
 * @returns {this} - Returns itself to allow chainable validations.
 */
InstanceValidator.prototype.checkPositionIndex = function (index, size, message) {
  errValidation.checkPositionIndex(index, size, message);
  return this;
};
/**
 * Ensures that start and end specify a valid positions in an array, list or string of size size, and are in order.
 *
 * @param {Number} start
 * @param {Number} end
 * @param {Number} size
 * @param {String} [message] - The error message or the error template string to use if the validation fails.
 * @returns {this} - Returns itself to allow chainable validations.
 */
InstanceValidator.prototype.checkPositionIndexes = function (start, end, size, message) {
  errValidation.checkPositionIndexes(start, end, size, message);
  return this;
};

module.exports = InstanceValidator;
