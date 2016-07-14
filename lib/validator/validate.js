"use strict";

var _ = require("lodash");

var validate = {
  shouldBeDefined: function (val) {
    return _.isUndefined(val);
  },
  shouldBeUndefined: function (val) {
    return !_.isUndefined(val);
  },

  shouldBeArray: function (val) {
    return !_.isArray(val);
  },
  shouldNotBeArray: function (val) {
    return _.isArray(val);
  },

  shouldBeObject: function (val) {
    return !_.isObject(val);
  },
  shouldNotBeObject: function (val) {
    return _.isObject(val);
  },

  shouldBeEmpty: function (val) {
    return !_.isEmpty(val);
  },
  shouldNotBeEmpty: function (val) {
    return _.isEmpty(val);
  },

  shouldBeFunction: function (val) {
    return !_.isFunction(val);
  },
  shouldNotBeFunction: function (val) {
    return _.isFunction(val);
  },

  shouldBeString: function (val) {
    return !_.isString(val);
  },
  shouldNotBeString: function (val) {
    return _.isString(val);
  },

  shouldBeNumber: function (val) {
    return !_.isNumber(val);
  },
  shouldNotBeNumber: function (val) {
    return _.isNumber(val);
  },

  shouldBeFinite: function (val) {
    return !_.isFinite(val);
  },
  shouldBeInfinite: function (val) {
    return _.isFinite(val);
  },

  shouldBeBoolean: function (val) {
    return !_.isBoolean(val);
  },
  shouldNotBeBoolean: function (val) {
    return _.isBoolean(val);
  },

  shouldBeDate: function (val) {
    return !_.isDate(val);
  },
  shouldNotBeDate: function (val) {
    return _.isDate(val);
  },

  shouldBeRegExp: function (val) {
    return !_.isRegExp(val);
  },
  shouldNotBeRegExp: function (val) {
    return _.isRegExp(val);
  },

  shouldBeFalsey: function (val) {
    return !!val;
  },
  shouldNotBeFalsey: function (val) {
    return !val;
  },

  checkArgument: function (val) {
    return !val;
  },
  checkState: function (val) {
    return !val;
  },

  checkElementIndex: function (index, size) {
    return (index < 0 || index >= size);
  },
  checkPositionIndex: function (index, size) {
    return (index < 0 || index > size);
  },
  checkPositionIndexes: function (start, end, size) {
    return ((end < start) || (start < 0 || end > size));
  }
};

module.exports = validate;
