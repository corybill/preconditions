"use strict";

var constants = require("./constants");
var _ = require("underscore");

var validatorFunctions = {
  getFilePathInfo: function (configPath) {
    return " {" + configPath + "}";
  },
  shouldBeDefined: function (val, configPath) {
    if(_.isUndefined(val)) {
      throw new Error(constants.ShouldBeDefined + this.getFilePathInfo(configPath));
    }
  },
  shouldBeUndefined: function (val, configPath) {
    if(!_.isUndefined(val)) {
      throw new Error(constants.ShouldBeUndefined + this.getFilePathInfo(configPath));
    }
  },

  shouldBeArray: function (val, configPath) {
    if(!_.isArray(val)) {
      throw new Error(constants.ShouldBeArray + this.getFilePathInfo(configPath));
    }
  },
  shouldNotBeArray: function (val, configPath) {
    if(_.isArray(val)) {
      throw new Error(constants.ShouldNotBeArray + this.getFilePathInfo(configPath));
    }
  },

  shouldBeObject: function (val, configPath) {
    if(!_.isObject(val)) {
      throw new Error(constants.ShouldBeObject + this.getFilePathInfo(configPath));
    }
  },
  shouldNotBeObject: function (val, configPath) {
    if(_.isObject(val)) {
      throw new Error(constants.ShouldNotBeObject + this.getFilePathInfo(configPath));
    }
  },

  shouldBeEmpty: function (val, configPath) {
    if(!_.isEmpty(val)) {
      throw new Error(constants.ShouldBeEmpty + this.getFilePathInfo(configPath));
    }
  },
  shouldNotBeEmpty: function (val, configPath) {
    if(_.isEmpty(val)) {
      throw new Error(constants.ShouldNotBeEmpty + this.getFilePathInfo(configPath));
    }
  },

  shouldBeFunction: function (val, configPath) {
    if(!_.isFunction(val)) {
      throw new Error(constants.ShouldBeFunction + this.getFilePathInfo(configPath));
    }
  },
  shouldNotBeFunction: function (val, configPath) {
    if(_.isFunction(val)) {
      throw new Error(constants.ShouldNotBeFunction + this.getFilePathInfo(configPath));
    }
  },

  shouldBeString: function (val, configPath) {
    if(!_.isString(val)) {
      throw new Error(constants.ShouldBeString + this.getFilePathInfo(configPath));
    }
  },
  shouldNotBeString: function (val, configPath) {
    if(_.isString(val)) {
      throw new Error(constants.ShouldNotBeString + this.getFilePathInfo(configPath));
    }
  },

  shouldBeNumber: function (val, configPath) {
    if(!_.isNumber(val)) {
      throw new Error(constants.ShouldBeNumber + this.getFilePathInfo(configPath));
    }
  },
  shouldNotBeNumber: function (val, configPath) {
    if(_.isNumber(val)) {
      throw new Error(constants.ShouldNotBeNumber + this.getFilePathInfo(configPath));
    }
  },

  shouldBeFinite: function (val, configPath) {
    if(!_.isFinite(val)) {
      throw new Error(constants.ShouldBeFinite + this.getFilePathInfo(configPath));
    }
  },
  shouldBeInfinite: function (val, configPath) {
    if(_.isFinite(val)) {
      throw new Error(constants.ShouldBeInfinite + this.getFilePathInfo(configPath));
    }
  },

  shouldBeBoolean: function (val, configPath) {
    if(!_.isBoolean(val)) {
      throw new Error(constants.ShouldBeBoolean + this.getFilePathInfo(configPath));
    }
  },
  shouldNotBeBoolean: function (val, configPath) {
    if(_.isBoolean(val)) {
      throw new Error(constants.ShouldNotBeBoolean + this.getFilePathInfo(configPath));
    }
  },

  shouldBeDate: function (val, configPath) {
    if(!_.isDate(val)) {
      throw new Error(constants.ShouldBeDate + this.getFilePathInfo(configPath));
    }
  },
  shouldNotBeDate: function (val, configPath) {
    if(_.isDate(val)) {
      throw new Error(constants.ShouldNotBeDate + this.getFilePathInfo(configPath));
    }
  },

  shouldBeRegExp: function (val, configPath) {
    if(!_.isRegExp(val)) {
      throw new Error(constants.ShouldBeRegExp + this.getFilePathInfo(configPath));
    }
  },
  shouldNotBeRegExp: function (val, configPath) {
    if(_.isRegExp(val)) {
      throw new Error(constants.ShouldNotBeRegExp + this.getFilePathInfo(configPath));
    }
  },

  shouldBeFalsey: function (val, configPath) {
    if(!_.isNaN(val) && !_.isNull(val) && !_.isUndefined(val)) {
      throw new Error(constants.ShouldBeFalsey + this.getFilePathInfo(configPath));
    }
  },
  shouldNotBeFalsey: function (val, configPath) {
    if(_.isNaN(val) || _.isNull(val) || _.isUndefined(val)) {
      throw new Error(constants.ShouldNotBeFalsey + this.getFilePathInfo(configPath));
    }
  }
};

module.exports = validatorFunctions;