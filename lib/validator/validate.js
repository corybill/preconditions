"use strict";

var CoreUtilIs = require("core-util-is");

var validate = {
  shouldBeDefined: function (val) {
    return CoreUtilIs.isUndefined(val);
  },
  shouldBeUndefined: function (val) {
    return !CoreUtilIs.isUndefined(val);
  },

  shouldBeArray: function (val) {
    return !CoreUtilIs.isArray(val);
  },
  shouldNotBeArray: function (val) {
    return CoreUtilIs.isArray(val);
  },

  shouldBeObject: function (val) {
    return !(val !== null && (typeof val === "object" || typeof val === "function"));
  },
  shouldNotBeObject: function (val) {
    return (val !== null && (typeof val === "object" || typeof val === "function"));
  },

  shouldBeEmpty: function (val) {
    return !CoreUtilIs.isEmpty(val);
  },
  shouldNotBeEmpty: function (val) {
    return CoreUtilIs.isEmpty(val);
  },

  shouldBeFunction: function (val) {
    return !CoreUtilIs.isFunction(val);
  },
  shouldNotBeFunction: function (val) {
    return CoreUtilIs.isFunction(val);
  },

  shouldBeString: function (val) {
    return !CoreUtilIs.isString(val);
  },
  shouldNotBeString: function (val) {
    return CoreUtilIs.isString(val);
  },

  shouldBeNumber: function (val) {
    return !CoreUtilIs.isNumber(val);
  },
  shouldNotBeNumber: function (val) {
    return CoreUtilIs.isNumber(val);
  },

  shouldBeFinite: function (val) {
    return !CoreUtilIs.isFinite(val);
  },
  shouldBeInfinite: function (val) {
    return CoreUtilIs.isFinite(val);
  },

  shouldBeBoolean: function (val) {
    return !CoreUtilIs.isBoolean(val);
  },
  shouldNotBeBoolean: function (val) {
    return CoreUtilIs.isBoolean(val);
  },

  shouldBeDate: function (val) {
    return !CoreUtilIs.isDate(val);
  },
  shouldNotBeDate: function (val) {
    return CoreUtilIs.isDate(val);
  },

  shouldBeRegExp: function (val) {
    return !CoreUtilIs.isRegExp(val);
  },
  shouldNotBeRegExp: function (val) {
    return CoreUtilIs.isRegExp(val);
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
