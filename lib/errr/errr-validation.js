"use strict";

var constants = require("./../constants"),
  ErrrDecorator = require("./errr-decorator"),
  _ = require("lodash");

var ErrrFactory = {
  shouldBeDefined: function (val, message, template) {
    function doesFail() {
      return _.isUndefined(val);
    }

    message = message || constants.ShouldBeDefined;
    return new ErrrDecorator(message, template, doesFail);
  },
  shouldBeUndefined: function (val, message, template) {
    function doesFail() {
      return !_.isUndefined(val);
    }

    message = message || constants.ShouldBeUndefined;
    return new ErrrDecorator(message, template, doesFail);
  },

  shouldBeArray: function (val, message, template) {
    function doesFail() {
      return !_.isArray(val);
    }

    message = message || constants.ShouldBeArray;
    return new ErrrDecorator(message, template, doesFail);
  },
  shouldNotBeArray: function (val, message, template) {
    function doesFail() {
      return _.isArray(val);
    }

    message = message || constants.ShouldNotBeArray;
    return new ErrrDecorator(message, template, doesFail);
  },

  shouldBeObject: function (val, message, template) {
    function doesFail() {
      return !_.isObject(val);
    }

    message = message || constants.ShouldBeObject;
    return new ErrrDecorator(message, template, doesFail);
  },
  shouldNotBeObject: function (val, message, template) {
    function doesFail() {
      return _.isObject(val);
    }

    message = message || constants.ShouldNotBeObject;
    return new ErrrDecorator(message, template, doesFail);
  },

  shouldBeEmpty: function (val, message, template) {
    function doesFail() {
      return !_.isEmpty(val);
    }

    message = message || constants.ShouldBeEmpty;
    return new ErrrDecorator(message, template, doesFail);
  },
  shouldNotBeEmpty: function (val, message, template) {
    function doesFail() {
      return _.isEmpty(val);
    }

    message = message || constants.ShouldNotBeEmpty;
    return new ErrrDecorator(message, template, doesFail);
  },

  shouldBeFunction: function (val, message, template) {
    function doesFail() {
      return !_.isFunction(val);
    }

    message = message || constants.ShouldBeFunction;
    return new ErrrDecorator(message, template, doesFail);
  },
  shouldNotBeFunction: function (val, message, template) {
    function doesFail() {
      return _.isFunction(val);
    }

    message = message || constants.ShouldNotBeFunction;
    return new ErrrDecorator(message, template, doesFail);
  },

  shouldBeString: function (val, message, template) {
    function doesFail() {
      return !_.isString(val);
    }

    message = message || constants.ShouldBeString;
    return new ErrrDecorator(message, template, doesFail);
  },
  shouldNotBeString: function (val, message, template) {
    function doesFail() {
      return _.isString(val);
    }

    message = message || constants.ShouldNotBeString;
    return new ErrrDecorator(message, template, doesFail);
  },

  shouldBeNumber: function (val, message, template) {
    function doesFail() {
      return !_.isNumber(val);
    }

    message = message || constants.ShouldBeNumber;
    return new ErrrDecorator(message, template, doesFail);
  },
  shouldNotBeNumber: function (val, message, template) {
    function doesFail() {
      return _.isNumber(val);
    }

    message = message || constants.ShouldNotBeNumber;
    return new ErrrDecorator(message, template, doesFail);
  },

  shouldBeFinite: function (val, message, template) {
    function doesFail() {
      return !_.isFinite(val);
    }

    message = message || constants.ShouldBeFinite;
    return new ErrrDecorator(message, template, doesFail);
  },
  shouldBeInfinite: function (val, message, template) {
    function doesFail() {
      return _.isFinite(val);
    }

    message = message || constants.ShouldBeInfinite;
    return new ErrrDecorator(message, template, doesFail);
  },

  shouldBeBoolean: function (val, message, template) {
    function doesFail() {
      return !_.isBoolean(val);
    }

    message = message || constants.ShouldBeBoolean;
    return new ErrrDecorator(message, template, doesFail);
  },
  shouldNotBeBoolean: function (val, message, template) {
    function doesFail() {
      return _.isBoolean(val);
    }

    message = message || constants.ShouldNotBeBoolean;
    return new ErrrDecorator(message, template, doesFail);
  },

  shouldBeDate: function (val, message, template) {
    function doesFail() {
      return !_.isDate(val);
    }

    message = message || constants.ShouldBeDate;
    return new ErrrDecorator(message, template, doesFail);
  },
  shouldNotBeDate: function (val, message, template) {
    function doesFail() {
      return _.isDate(val);
    }

    message = message || constants.ShouldNotBeDate;
    return new ErrrDecorator(message, template, doesFail);
  },

  shouldBeRegExp: function (val, message, template) {
    function doesFail() {
      return !_.isRegExp(val);
    }

    message = message || constants.ShouldBeRegExp;
    return new ErrrDecorator(message, template, doesFail);
  },
  shouldNotBeRegExp: function (val, message, template) {
    function doesFail() {
      return _.isRegExp(val);
    }

    message = message || constants.ShouldNotBeRegExp;
    return new ErrrDecorator(message, template, doesFail);
  },

  shouldBeFalsey: function (val, message, template) {
    function doesFail() {
      return (!_.isNaN(val) && !_.isNull(val) && !_.isUndefined(val));
    }

    message = message || constants.ShouldBeFalsey;
    return new ErrrDecorator(message, template, doesFail);
  },
  shouldNotBeFalsey: function (val, message, template) {
    function doesFail() {
      return (_.isNaN(val) || _.isNull(val) || _.isUndefined(val));
    }

    message = message || constants.ShouldNotBeFalsey;
    return new ErrrDecorator(message, template, doesFail);
  },
  shouldBeFalsy: function (val, message, template) {
    function doesFail() {
      return (!_.isNaN(val) && !_.isNull(val) && !_.isUndefined(val));
    }

    message = message || constants.ShouldBeFalsey;
    return new ErrrDecorator(message, template, doesFail);
  },
  shouldNotBeFalsy: function (val, message, template) {
    function doesFail() {
      return (_.isNaN(val) || _.isNull(val) || _.isUndefined(val));
    }

    message = message || constants.ShouldNotBeFalsey;
    return new ErrrDecorator(message, template, doesFail);
  },

  shouldBeTruthy: function (val, message, template) {
    function doesFail() {
      return (_.isNaN(val) || _.isNull(val) || _.isUndefined(val));
    }

    message = message || constants.ShouldNotBeFalsey;
    return new ErrrDecorator(message, template, doesFail);
  },
  shouldNotBeTruthy: function (val, message, template) {
    function doesFail() {
      return (!_.isNaN(val) && !_.isNull(val) && !_.isUndefined(val));
    }

    message = message || constants.ShouldBeFalsey;
    return new ErrrDecorator(message, template, doesFail);
  },

  checkArgument: function (val, message, template) {
    function doesFail() {
      return !val;
    }

    message = message || constants.IllegalArgument;
    return new ErrrDecorator(message, template, doesFail);
  },
  checkState: function (val, message, template) {
    function doesFail() {
      return !val;
    }

    message = message || constants.IllegalState;
    return new ErrrDecorator(message, template, doesFail);
  },

  checkElementIndex: function (index, size, message, template) {
    function doesFail() {
      return (index < 0 || index >= size);
    }

    message = message || constants.ShouldHaveValidIndex;
    return new ErrrDecorator(message, template, doesFail);
  },
  checkPositionIndex: function (index, size, message, template) {
    function doesFail() {
      return (index < 0 || index > size);
    }

    message = message || constants.ShouldHaveValidPosition;
    return new ErrrDecorator(message, template, doesFail);
  },
  checkPositionIndexes: function (start, end, size, message, template) {
    function doesFail() {
      return ((end < start) || (start < 0 || end > size));
    }

    message = message || constants.ShouldHaveValidPositions;
    return new ErrrDecorator(message, template, doesFail);
  }
};

module.exports = ErrrFactory;
