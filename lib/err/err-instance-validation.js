"use strict";

var errValidation = require("./err-singleton-validation"),
  _ = require("lodash");

function Validator(objectUnderTest) {
  // out = Object Under Test
  this.out = objectUnderTest;
}

/**
 * Loops through all of the variables (based on dot notation) in the 'out' object and executes the verification function on each.
 * Example: - configPath = "variable1.variable2.variable3"
 *          - validate will verify that { variable1: { variable2: {variable3: "val"}}} exists &
 *          - that the verification function is true on variable3
 * @param configPath
 * @param verification
 */
Validator.prototype.validate = function (configPath, verification, message) {
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

Validator.prototype.shouldBeDefined = function (configPath, message) {
  this.validate(configPath, function (val) {
    errValidation.shouldBeDefined(val, message);
  }, message);

  return this;
};
Validator.prototype.shouldBeUndefined = function (configPath, message) {
  this.validate(configPath, function (val) {
    errValidation.shouldBeUndefined(val, message);
  }, message);

  return this;
};

Validator.prototype.shouldBeNonEmptyArray = function (configPath, message) {
  this.validate(configPath, function (val) {
    errValidation.shouldBeArray(val, message);
    errValidation.shouldNotBeEmpty(val, message);
  }, message);

  return this;
};

Validator.prototype.shouldBeArray = function (configPath, message) {
  this.validate(configPath, function (val) {
    errValidation.shouldBeArray(val, message);
  }, message);

  return this;
};
Validator.prototype.shouldNotBeArray = function (configPath, message) {
  this.validate(configPath, function (val) {
    errValidation.shouldNotBeArray(val, message);
  }, message);

  return this;
};

Validator.prototype.shouldBeObject = function (configPath, message) {
  this.validate(configPath, function (val) {
    errValidation.shouldBeObject(val, message);
  }, message);

  return this;
};
Validator.prototype.shouldNotBeObject = function (configPath, message) {
  this.validate(configPath, function (val) {
    errValidation.shouldNotBeObject(val, message);
  }, message);

  return this;
};

Validator.prototype.shouldBeEmpty = function (configPath, message) {
  this.validate(configPath, function (val) {
    errValidation.shouldBeEmpty(val, message);
  }, message);

  return this;
};
Validator.prototype.shouldNotBeEmpty = function (configPath, message) {
  this.validate(configPath, function (val) {
    errValidation.shouldNotBeEmpty(val, message);
  }, message);

  return this;
};

Validator.prototype.shouldBeFunction = function (configPath, message) {
  this.validate(configPath, function (val) {
    errValidation.shouldBeFunction(val, message);
  }, message);

  return this;
};
Validator.prototype.shouldNotBeFunction = function (configPath, message) {
  this.validate(configPath, function (val) {
    errValidation.shouldNotBeFunction(val, message);
  }, message);

  return this;
};

Validator.prototype.shouldBeString = function (configPath, message) {
  this.validate(configPath, function (val) {
    errValidation.shouldBeString(val, message);
  }, message);

  return this;
};
Validator.prototype.shouldNotBeString = function (configPath, message) {
  this.validate(configPath, function (val) {
    errValidation.shouldNotBeString(val, message);
  }, message);

  return this;
};

Validator.prototype.shouldBeNumber = function (configPath, message) {
  this.validate(configPath, function (val) {
    errValidation.shouldBeNumber(val, message);
  }, message);

  return this;
};
Validator.prototype.shouldNotBeNumber = function (configPath, message) {
  this.validate(configPath, function (val) {
    errValidation.shouldNotBeNumber(val, message);
  }, message);

  return this;
};

Validator.prototype.shouldBeFinite = function (configPath, message) {
  this.validate(configPath, function (val) {
    errValidation.shouldBeFinite(val, message);
  }, message);

  return this;
};
Validator.prototype.shouldBeInfinite = function (configPath, message) {
  this.validate(configPath, function (val) {
    errValidation.shouldBeInfinite(val, message);
  }, message);

  return this;
};

Validator.prototype.shouldBeBoolean = function (configPath, message) {
  this.validate(configPath, function (val) {
    errValidation.shouldBeBoolean(val, message);
  }, message);

  return this;
};
Validator.prototype.shouldNotBeBoolean = function (configPath, message) {
  this.validate(configPath, function (val) {
    errValidation.shouldNotBeBoolean(val, message);
  }, message);

  return this;
};

Validator.prototype.shouldBeDate = function (configPath, message) {
  this.validate(configPath, function (val) {
    errValidation.shouldBeDate(val, message);
  }, message);

  return this;
};
Validator.prototype.shouldNotBeDate = function (configPath, message) {
  this.validate(configPath, function (val) {
    errValidation.shouldNotBeDate(val, message);
  }, message);

  return this;
};

Validator.prototype.shouldBeRegExp = function (configPath, message) {
  this.validate(configPath, function (val) {
    errValidation.shouldBeRegExp(val, message);
  }, message);

  return this;
};
Validator.prototype.shouldNotBeRegExp = function (configPath, message) {
  this.validate(configPath, function (val) {
    errValidation.shouldNotBeRegExp(val, message);
  }, message);

  return this;
};

Validator.prototype.shouldBeFalsey = function (configPath, message) {
  this.validate(configPath, function (val) {
    errValidation.shouldBeFalsey(val, message);
  }, message);

  return this;
};
Validator.prototype.shouldNotBeFalsey = function (configPath, message) {
  this.validate(configPath, function (val) {
    errValidation.shouldNotBeFalsey(val, message);
  }, message);

  return this;
};

Validator.prototype.checkArgument = function (val, message) {
  errValidation.checkArgument(val, message);
  return this;
};
Validator.prototype.checkState = function (val, message) {
  errValidation.checkState(val, message);
  return this;
};

Validator.prototype.checkElementIndex = function (index, size, message) {
  errValidation.checkElementIndex(index, size, message);
  return this;
};
Validator.prototype.checkPositionIndex = function (index, size, message) {
  errValidation.checkPositionIndex(index, size, message);
  return this;
};
Validator.prototype.checkPositionIndexes = function (start, end, size, message) {
  errValidation.checkPositionIndexes(start, end, size, message);
  return this;
};

module.exports = Validator;
