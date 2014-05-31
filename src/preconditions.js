"use strict";

var _ = require("underscore");
var validatorFunctions = require("./validatorFunctions");
var require = require("util");

function Preconditions (objectUnderTest) {
  this.validatorFunctions = validatorFunctions;

  //out = Object Under Test
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
Preconditions.prototype.validate = function (configPath, verification) {
  var variables = configPath.split(".");

  var current = this.out;
  var count = 0;
  for (var key in variables) {
    var variable = variables[key];

    //If statement needed because we need to be able to verify shouldBeUndefined.
    if (count !== variables.length-1) {
      this.validatorFunctions.shouldBeDefined(current[variable], configPath);
    }

    current = current[variable];
    count++;
  }

  verification(current);
};

Preconditions.prototype.shouldBeDefined = function (configPath) {
  this.validate(configPath, function (val) {
    this.validatorFunctions.shouldBeDefined(val, configPath);
  }.bind(this));
  return this;
};
Preconditions.prototype.shouldBeUndefined = function (configPath) {
  this.validate(configPath, function (val) {
    this.validatorFunctions.shouldBeUndefined(val, configPath);
  }.bind(this));
  return this;
};

Preconditions.prototype.shouldBeNonEmptyArray = function (configPath) {
  this.validate(configPath, function (val) {
    this.validatorFunctions.shouldBeArray(val, configPath);
    this.validatorFunctions.shouldNotBeEmpty(val, configPath);
  }.bind(this));
  return this;
};

Preconditions.prototype.shouldBeArray = function (configPath) {
  this.validate(configPath, function (val) {
    this.validatorFunctions.shouldBeArray(val, configPath);
  }.bind(this));
  return this;
};
Preconditions.prototype.shouldNotBeArray = function (configPath) {
  this.validate(configPath, function (val) {
    this.validatorFunctions.shouldNotBeArray(val, configPath);
  }.bind(this));
  return this;
};

Preconditions.prototype.shouldBeObject = function (configPath) {
  this.validate(configPath, function (val) {
    this.validatorFunctions.shouldBeObject(val, configPath);
  }.bind(this));
  return this;
};
Preconditions.prototype.shouldNotBeObject = function (configPath) {
  this.validate(configPath, function (val) {
    this.validatorFunctions.shouldNotBeObject(val, configPath);
  }.bind(this));
  return this;
};

Preconditions.prototype.shouldBeEmpty = function (configPath) {
  this.validate(configPath, function (val) {
    this.validatorFunctions.shouldBeEmpty(val, configPath);
  }.bind(this));
  return this;
};
Preconditions.prototype.shouldNotBeEmpty = function (configPath) {
  this.validate(configPath, function (val) {
    this.validatorFunctions.shouldNotBeEmpty(val, configPath);
  }.bind(this));
  return this;
};

Preconditions.prototype.shouldBeFunction = function (configPath) {
  this.validate(configPath, function (val) {
    this.validatorFunctions.shouldBeFunction(val, configPath);
  }.bind(this));
  return this;
};
Preconditions.prototype.shouldNotBeFunction = function (configPath) {
  this.validate(configPath, function (val) {
    this.validatorFunctions.shouldNotBeFunction(val, configPath);
  }.bind(this));
  return this;
};

Preconditions.prototype.shouldBeString = function (configPath) {
  this.validate(configPath, function (val) {
    this.validatorFunctions.shouldBeString(val, configPath);
  }.bind(this));
  return this;
};
Preconditions.prototype.shouldNotBeString = function (configPath) {
  this.validate(configPath, function (val) {
    this.validatorFunctions.shouldNotBeString(val, configPath);
  }.bind(this));
  return this;
};

Preconditions.prototype.shouldBeNumber = function (configPath) {
  this.validate(configPath, function (val) {
    this.validatorFunctions.shouldBeNumber(val, configPath);
  }.bind(this));
  return this;
};
Preconditions.prototype.shouldNotBeNumber = function (configPath) {
  this.validate(configPath, function (val) {
    this.validatorFunctions.shouldNotBeNumber(val, configPath);
  }.bind(this));
  return this;
};


Preconditions.prototype.shouldBeFinite = function (configPath) {
  this.validate(configPath, function (val) {
    this.validatorFunctions.shouldBeFinite(val, configPath);
  }.bind(this));
  return this;
};
Preconditions.prototype.shouldBeInfinite = function (configPath) {
  this.validate(configPath, function (val) {
    this.validatorFunctions.shouldBeInfinite(val, configPath);
  }.bind(this));
  return this;
};

Preconditions.prototype.shouldBeBoolean = function (configPath) {
  this.validate(configPath, function (val) {
    this.validatorFunctions.shouldBeBoolean(val, configPath);
  }.bind(this));
  return this;
};
Preconditions.prototype.shouldNotBeBoolean = function (configPath) {
  this.validate(configPath, function (val) {
    this.validatorFunctions.shouldNotBeBoolean(val, configPath);
  }.bind(this));
  return this;
};

Preconditions.prototype.shouldBeDate = function (configPath) {
  this.validate(configPath, function (val) {
    this.validatorFunctions.shouldBeDate(val, configPath);
  }.bind(this));
  return this;
};
Preconditions.prototype.shouldNotBeDate = function (configPath) {
  this.validate(configPath, function (val) {
    this.validatorFunctions.shouldNotBeDate(val, configPath);
  }.bind(this));
  return this;
};

Preconditions.prototype.shouldBeRegExp = function (configPath) {
  this.validate(configPath, function (val) {
    this.validatorFunctions.shouldBeRegExp(val, configPath);
  }.bind(this));
  return this;
};
Preconditions.prototype.shouldNotBeRegExp = function (configPath) {
  this.validate(configPath, function (val) {
    this.validatorFunctions.shouldNotBeRegExp(val, configPath);
  }.bind(this));
  return this;
};

Preconditions.prototype.shouldBeFalsey = function (configPath) {
  this.validate(configPath, function (val) {
    this.validatorFunctions.shouldBeFalsey(val, configPath);
  }.bind(this));
  return this;
};
Preconditions.prototype.shouldNotBeFalsey = function (configPath) {
  this.validate(configPath, function (val) {
    this.validatorFunctions.shouldNotBeFalsey(val, configPath);
  }.bind(this));
  return this;
};

module.exports = {

  /**
   * Validate ObjectUnderTest with preconditions object.
   * @param objectUnderTest - Object Under Test
   * @returns Preconditions object with object for testing.
   */
  build: function (objectUnderTest) {
    return new Preconditions(objectUnderTest);
  },
  getClass: function (objectUnderTest) {
    return Preconditions;
  }

};