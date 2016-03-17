"use strict";

var constants = require("./../constants"),
  validate = require("../validate");

var nodeErrFactory = {
  shouldBeDefined: function (val, message) {
    if (validate.shouldBeDefined(val)) {
      var msg = message || constants.ShouldBeDefined;

      throw new Error(msg);
    }
    return this;
  },
  shouldBeUndefined: function (val, message) {
    if (validate.shouldBeUndefined(val)) {
      var msg = message || constants.ShouldBeUndefined;

      throw new Error(msg);
    }
    return this;
  },

  shouldBeArray: function (val, message) {
    if (validate.shouldBeArray(val)) {
      var msg = message || constants.ShouldBeArray;

      throw new Error(msg);
    }
    return this;
  },
  shouldNotBeArray: function (val, message) {
    if (validate.shouldNotBeArray(val)) {
      var msg = message || constants.ShouldNotBeArray;

      throw new Error(msg);
    }
    return this;
  },

  shouldBeObject: function (val, message) {
    if (validate.shouldBeObject(val)) {
      var msg = message || constants.ShouldBeObject;

      throw new Error(msg);
    }
    return this;
  },
  shouldNotBeObject: function (val, message) {
    if (validate.shouldNotBeObject(val)) {
      var msg = message || constants.ShouldNotBeObject;

      throw new Error(msg);
    }
    return this;
  },

  shouldBeEmpty: function (val, message) {
    if (validate.shouldBeEmpty(val)) {
      var msg = message || constants.ShouldBeEmpty;

      throw new Error(msg);
    }
    return this;
  },
  shouldNotBeEmpty: function (val, message) {
    if (validate.shouldNotBeEmpty(val)) {
      var msg = message || constants.ShouldNotBeEmpty;

      throw new Error(msg);
    }
    return this;
  },

  shouldBeFunction: function (val, message) {
    if (validate.shouldBeFunction(val)) {
      var msg = message || constants.ShouldBeFunction;

      throw new Error(msg);
    }
    return this;
  },
  shouldNotBeFunction: function (val, message) {
    if (validate.shouldNotBeFunction(val)) {
      var msg = message || constants.ShouldNotBeFunction;

      throw new Error(msg);
    }
    return this;
  },

  shouldBeString: function (val, message) {
    if (validate.shouldBeString(val)) {
      var msg = message || constants.ShouldBeString;

      throw new Error(msg);
    }
    return this;
  },
  shouldNotBeString: function (val, message) {
    if (validate.shouldNotBeString(val)) {
      var msg = message || constants.ShouldNotBeString;

      throw new Error(msg);
    }
    return this;
  },

  shouldBeNumber: function (val, message) {
    if (validate.shouldBeNumber(val)) {
      var msg = message || constants.ShouldBeNumber;

      throw new Error(msg);
    }
    return this;
  },
  shouldNotBeNumber: function (val, message) {
    if (validate.shouldNotBeNumber(val)) {
      var msg = message || constants.ShouldNotBeNumber;

      throw new Error(msg);
    }
    return this;
  },

  shouldBeFinite: function (val, message) {
    if (validate.shouldBeFinite(val)) {
      var msg = message || constants.ShouldBeFinite;

      throw new Error(msg);
    }
    return this;
  },
  shouldBeInfinite: function (val, message) {
    if (validate.shouldBeInfinite(val)) {
      var msg = message || constants.ShouldBeInfinite;

      throw new Error(msg);
    }
    return this;
  },

  shouldBeBoolean: function (val, message) {
    if (validate.shouldBeBoolean(val)) {
      var msg = message || constants.ShouldBeBoolean;

      throw new Error(msg);
    }
    return this;
  },
  shouldNotBeBoolean: function (val, message) {
    if (validate.shouldNotBeBoolean(val)) {
      var msg = message || constants.ShouldNotBeBoolean;

      throw new Error(msg);
    }
    return this;
  },

  shouldBeDate: function (val, message) {
    if (validate.shouldBeDate(val)) {
      var msg = message || constants.ShouldBeDate;

      throw new Error(msg);
    }
    return this;
  },
  shouldNotBeDate: function (val, message) {
    if (validate.shouldNotBeDate(val)) {
      var msg = message || constants.ShouldNotBeDate;

      throw new Error(msg);
    }
    return this;
  },

  shouldBeRegExp: function (val, message) {
    if (validate.shouldBeRegExp(val)) {
      var msg = message || constants.ShouldBeRegExp;

      throw new Error(msg);
    }
    return this;
  },
  shouldNotBeRegExp: function (val, message) {
    if (validate.shouldNotBeRegExp(val)) {
      var msg = message || constants.ShouldNotBeRegExp;

      throw new Error(msg);
    }
    return this;
  },

  shouldBeFalsey: function (val, message) {
    if (validate.shouldBeFalsey(val)) {
      var msg = message || constants.ShouldBeFalsey;

      throw new Error(msg);
    }
    return this;
  },
  shouldNotBeFalsey: function (val, message) {
    if (validate.shouldNotBeFalsey(val)) {
      var msg = message || constants.ShouldNotBeFalsey;

      throw new Error(msg);
    }
    return this;
  },
  checkArgument: function (val, message) {
    if (validate.checkArgument(val)) {
      var msg = message || constants.IllegalArgument;

      throw new Error(msg);
    }
    return this;
  },
  checkState: function (val, message) {
    if (validate.checkState(val)) {
      var msg = message || constants.IllegalState;

      throw new Error(msg);
    }
    return this;
  },

  checkElementIndex: function (index, size, message) {
    if (validate.checkElementIndex(index, size)) {
      var msg = message || constants.ShouldHaveValidIndex;

      throw new Error(msg);
    }
    return this;
  },
  checkPositionIndex: function (index, size, message) {
    if (validate.checkPositionIndex(index, size)) {
      var msg = message || constants.ShouldHaveValidPosition;

      throw new Error(msg);
    }
    return this;
  },
  checkPositionIndexes: function (start, end, size, message) {
    if (validate.checkPositionIndexes(start, end, size)) {
      var msg = message || constants.ShouldHaveValidPositions;

      throw new Error(msg);
    }
    return this;
  },

  shouldBeFalsy: function (val, message) {
    return this.shouldBeFalsey(val, message);
  },
  shouldNotBeFalsy: function (val, message) {
    return this.shouldNotBeFalsey(val, message);
  },

  shouldBeTruthy: function (val, message) {
    return this.shouldNotBeFalsey(val, message);
  },
  shouldNotBeTruthy: function (val, message) {
    return this.shouldBeFalsey(val, message);
  },

  shouldBeTruthey: function (val, message) {
    return this.shouldNotBeFalsey(val, message);
  },
  shouldNotBeTruthey: function (val, message) {
    return this.shouldBeFalsey(val, message);
  }
};

module.exports = nodeErrFactory;
