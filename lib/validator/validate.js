import * as typeChecks from "../util/type-checks.js";

const validate = {
  shouldBeDefined(val) {
    return typeChecks.isUndefined(val);
  },
  shouldBeUndefined(val) {
    return !typeChecks.isUndefined(val);
  },

  shouldBeArray(val) {
    return !typeChecks.isArray(val);
  },
  shouldNotBeArray(val) {
    return typeChecks.isArray(val);
  },

  shouldBeObject(val) {
    return !(val !== null && (typeof val === "object" || typeof val === "function"));
  },
  shouldNotBeObject(val) {
    return (val !== null && (typeof val === "object" || typeof val === "function"));
  },

  shouldBeEmpty(val) {
    return !typeChecks.isEmpty(val);
  },
  shouldNotBeEmpty(val) {
    return typeChecks.isEmpty(val);
  },

  shouldBeFunction(val) {
    return !typeChecks.isFunction(val);
  },
  shouldNotBeFunction(val) {
    return typeChecks.isFunction(val);
  },

  shouldBeString(val) {
    return !typeChecks.isString(val);
  },
  shouldNotBeString(val) {
    return typeChecks.isString(val);
  },

  shouldBeNumber(val) {
    return !typeChecks.isNumber(val);
  },
  shouldNotBeNumber(val) {
    return typeChecks.isNumber(val);
  },

  shouldBeFinite(val) {
    return !typeChecks.isFinite(val);
  },
  shouldBeInfinite(val) {
    return typeChecks.isFinite(val);
  },

  shouldBeBoolean(val) {
    return !typeChecks.isBoolean(val);
  },
  shouldNotBeBoolean(val) {
    return typeChecks.isBoolean(val);
  },

  shouldBeDate(val) {
    return !typeChecks.isDate(val);
  },
  shouldNotBeDate(val) {
    return typeChecks.isDate(val);
  },

  shouldBeRegExp(val) {
    return !typeChecks.isRegExp(val);
  },
  shouldNotBeRegExp(val) {
    return typeChecks.isRegExp(val);
  },

  shouldBeFalsey(val) {
    return !!val;
  },
  shouldNotBeFalsey(val) {
    return !val;
  },

  checkArgument(val) {
    return !val;
  },
  checkState(val) {
    return !val;
  },

  checkElementIndex(index, size) {
    return (index < 0 || index >= size);
  },
  checkPositionIndex(index, size) {
    return (index < 0 || index > size);
  },
  checkPositionIndexes(start, end, size) {
    return ((end < start) || (start < 0 || end > size));
  }
};

export default validate;
