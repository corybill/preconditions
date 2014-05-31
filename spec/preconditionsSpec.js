"use strict";

var builder = require("./../src/preconditions");
var constants = require("./../src/constants");

describe("preconditions", function () {

  beforeEach(function () {
    this.getFilePathInfo = function (configPath) {
      return " {" + configPath + "}";
    };

    this.sut = builder.build({
      foo: {
        deep: {
          stringValue: "FOO",
          numberValue: 10,
          functionValue: function () {},
          nonEmptyArray: ["some", "values"],
          emptyArray: [],
          finiteValue: -100,
          infiniteValue: Infinity,
          trueValue: true,
          falseValue: false,
          NaNValue: NaN,
          nullValue: null,
          regExpValue: /moe/,
          dateValue: new Date()
        }
      }
    });
  });

  describe("shouldBeDefined", function () {
    it("should fail when passing in an undefined value", function () {
      var value = "foo.badValue";
      expect(function () {this.sut.shouldBeDefined(value);}.bind(this)).toThrow(new Error(constants.ShouldBeDefined + this.getFilePathInfo(value)));
    });
    it("should fail when passing in an deep undefined value", function () {
      var value = "bad.value.foo.bad";
      expect(function () {this.sut.shouldBeDefined(value);}.bind(this)).toThrow(new Error(constants.ShouldBeDefined + this.getFilePathInfo(value)));
    });

    it("should pass when passing in a defined value", function () {
      var value = "foo";
      expect(this.sut.shouldBeDefined(value));
    });
    it("should pass when passing in a defined value", function () {
      var value = "foo.deep.stringValue";
      expect(this.sut.shouldBeDefined(value));
    });
  });
  describe("shouldBeUndefined", function () {
    it("should fail when value is defined", function () {
      var value = "foo.deep.stringValue";
      expect(function () {this.sut.shouldBeUndefined(value);}.bind(this)).toThrow(new Error(constants.ShouldBeUndefined + this.getFilePathInfo(value)));
    });

    it("should pass when value is a Boolean", function () {
      var value = "foo.deep.undefinedValue";
      expect(this.sut.shouldBeUndefined(value));
    });
  });

  describe("shouldBeNonEmptyArray", function () {
    it("should fail when value is NOT an array", function () {
      var value = "foo.deep.stringValue";
      expect(function () {this.sut.shouldBeNonEmptyArray(value);}.bind(this)).toThrow(new Error(constants.ShouldBeArray + this.getFilePathInfo(value)));
    });
    it("should fail when value has length of zero", function () {
      var value = "foo.deep.emptyArray";
      expect(function () {this.sut.shouldBeNonEmptyArray(value);}.bind(this)).toThrow(new Error(constants.ShouldNotBeEmpty + this.getFilePathInfo(value)));
    });

    it("should pass when value is non empty array", function () {
      var value = "foo.deep.nonEmptyArray";
      expect(this.sut.shouldBeNonEmptyArray(value));
    });
  });

  describe("shouldBeArray", function () {
    it("should fail when value is NOT array", function () {
      var value = "foo.deep.stringValue";
      expect(function () {this.sut.shouldBeArray(value);}.bind(this)).toThrow(new Error(constants.ShouldBeArray + this.getFilePathInfo(value)));
    });

    it("should pass when value is array", function () {
      var value = "foo.deep.emptyArray";
      expect(this.sut.shouldBeArray(value));
    });
  });
  describe("shouldNotBeArray", function () {
    it("should fail when value is array", function () {
      var value = "foo.deep.emptyArray";
      expect(function () {this.sut.shouldNotBeArray(value);}.bind(this)).toThrow(new Error(constants.ShouldNotBeArray + this.getFilePathInfo(value)));
    });

    it("should pass when value is NOT array", function () {
      var value = "foo.deep.stringValue";
      expect(this.sut.shouldNotBeArray(value));
    });
  });

  describe("shouldBeEmpty", function () {
    it("should fail when value is NOT empty", function () {
      var value = "foo.deep.nonEmptyArray";
      expect(function () {this.sut.shouldBeEmpty(value);}.bind(this)).toThrow(new Error(constants.ShouldBeEmpty + this.getFilePathInfo(value)));
    });

    it("should pass when value is empty", function () {
      var value = "foo.deep.emptyArray";
      expect(this.sut.shouldBeEmpty(value));
    });
  });

  describe("shouldNotBeEmpty", function () {
    it("should fail when value is empty", function () {
      var value = "foo.deep.emptyArray";
      expect(function () {this.sut.shouldNotBeEmpty(value);}.bind(this)).toThrow(new Error(constants.ShouldNotBeEmpty + this.getFilePathInfo(value)));
    });

    it("should pass when value is NOT empty", function () {
      var value = "foo.deep.nonEmptyArray";
      expect(this.sut.shouldNotBeEmpty(value));
    });
  });

  describe("shouldBeObject", function () {
    it("should fail when value is NOT an Object", function () {
      var value = "foo.deep.stringValue";
      expect(function () {this.sut.shouldBeObject(value);}.bind(this)).toThrow(new Error(constants.ShouldBeObject + this.getFilePathInfo(value)));
    });

    it("should pass when value is an Object", function () {
      var value = "foo.deep";
      expect(this.sut.shouldBeObject(value));
    });
  });
  describe("shouldNotBeObject", function () {
    it("should fail when value is an Object", function () {
      var value = "foo.deep";
      expect(function () {this.sut.shouldNotBeObject(value);}.bind(this)).toThrow(new Error(constants.ShouldNotBeObject + this.getFilePathInfo(value)));
    });

    it("should pass when value is NOT an Object", function () {
      var value = "foo.deep.stringValue";
      expect(this.sut.shouldNotBeObject(value));
    });
  });

  describe("shouldBeFunction", function () {
    it("should fail when value is NOT a Function", function () {
      var value = "foo.deep.numberValue";
      expect(function () {this.sut.shouldBeFunction(value);}.bind(this)).toThrow(new Error(constants.ShouldBeFunction + this.getFilePathInfo(value)));
    });

    it("should pass when value is a Function", function () {
      var value = "foo.deep.functionValue";
      expect(this.sut.shouldBeFunction(value));
    });
  });
  describe("shouldNotBeFunction", function () {
    it("should fail when value is a Function", function () {
      var value = "foo.deep.functionValue";
      expect(function () {this.sut.shouldNotBeFunction(value);}.bind(this)).toThrow(new Error(constants.ShouldNotBeFunction + this.getFilePathInfo(value)));
    });

    it("should pass when value is NOT a Function", function () {
      var value = "foo.deep.numberValue";
      expect(this.sut.shouldNotBeFunction(value));
    });
  });

  describe("shouldBeString", function () {
    it("should fail when value is NOT a String", function () {
      var value = "foo.deep.numberValue";
      expect(function () {this.sut.shouldBeString(value);}.bind(this)).toThrow(new Error(constants.ShouldBeString + this.getFilePathInfo(value)));
    });

    it("should pass when value is a String", function () {
      var value = "foo.deep.stringValue";
      expect(this.sut.shouldBeString(value));
    });
  });
  describe("shouldNotBeString", function () {
    it("should fail when value is a String", function () {
      var value = "foo.deep.stringValue";
      expect(function () {this.sut.shouldNotBeString(value);}.bind(this)).toThrow(new Error(constants.ShouldNotBeString + this.getFilePathInfo(value)));
    });

    it("should pass when value is NOT a String", function () {
      var value = "foo.deep.numberValue";
      expect(this.sut.shouldNotBeString(value));
    });
  });

  describe("shouldBeNumber", function () {
    it("should fail when value is NOT a Number", function () {
      var value = "foo.deep.stringValue";
      expect(function () {this.sut.shouldBeNumber(value);}.bind(this)).toThrow(new Error(constants.ShouldBeNumber + this.getFilePathInfo(value)));
    });

    it("should pass when value is a Number", function () {
      var value = "foo.deep.numberValue";
      expect(this.sut.shouldBeNumber(value));
    });
  });
  describe("shouldNotBeNumber", function () {
    it("should fail when value is a Number", function () {
      var value = "foo.deep.numberValue";
      expect(function () {this.sut.shouldNotBeNumber(value);}.bind(this)).toThrow(new Error(constants.ShouldNotBeNumber + this.getFilePathInfo(value)));
    });

    it("should pass when value is NOT a Number", function () {
      var value = "foo.deep.stringValue";
      expect(this.sut.shouldNotBeNumber(value));
    });
  });

  describe("shouldBeFinite", function () {
    it("should fail when value is NOT Finite", function () {
      var value = "foo.deep.infiniteValue";
      expect(function () {this.sut.shouldBeFinite(value);}.bind(this)).toThrow(new Error(constants.ShouldBeFinite + this.getFilePathInfo(value)));
    });

    it("should pass when value is Finite", function () {
      var value = "foo.deep.finiteValue";
      expect(this.sut.shouldBeFinite(value));
    });
  });
  describe("shouldBeInfinite", function () {
    it("should fail when value is NOT Infinite", function () {
      var value = "foo.deep.finiteValue";
      expect(function () {this.sut.shouldBeInfinite(value);}.bind(this)).toThrow(new Error(constants.ShouldBeInfinite + this.getFilePathInfo(value)));
    });

    it("should pass when value is Infinite", function () {
      var value = "foo.deep.infiniteValue";
      expect(this.sut.shouldBeInfinite(value));
    });
  });

  describe("shouldBeBoolean", function () {
    it("should fail when value is NOT a Boolean", function () {
      var value = "foo.deep.stringValue";
      expect(function () {this.sut.shouldBeBoolean(value);}.bind(this)).toThrow(new Error(constants.ShouldBeBoolean + this.getFilePathInfo(value)));
    });

    it("should pass when value is a Boolean", function () {
      var value = "foo.deep.falseValue";
      expect(this.sut.shouldBeBoolean(value));
    });
  });
  describe("shouldNotBeBoolean", function () {
    it("should fail when value is a Boolean", function () {
      var value = "foo.deep.falseValue";
      expect(function () {this.sut.shouldNotBeBoolean(value);}.bind(this)).toThrow(new Error(constants.ShouldNotBeBoolean + this.getFilePathInfo(value)));
    });

    it("should pass when value is NOT a Boolean", function () {
      var value = "foo.deep.stringValue";
      expect(this.sut.shouldNotBeBoolean(value));
    });
  });

  describe("shouldBeDate", function () {
    it("should fail when value is NOT a Date", function () {
      var value = "foo.deep.stringValue";
      expect(function () {this.sut.shouldBeDate(value);}.bind(this)).toThrow(new Error(constants.ShouldBeDate + this.getFilePathInfo(value)));
    });

    it("should pass when value is a Date", function () {
      var value = "foo.deep.dateValue";
      expect(this.sut.shouldBeDate(value));
    });
  });
  describe("shouldNotBeDate", function () {
    it("should fail when value is a Date", function () {
      var value = "foo.deep.dateValue";
      expect(function () {this.sut.shouldNotBeDate(value);}.bind(this)).toThrow(new Error(constants.ShouldNotBeDate + this.getFilePathInfo(value)));
    });

    it("should pass when value is NOT a Date", function () {
      var value = "foo.deep.stringValue";
      expect(this.sut.shouldNotBeDate(value));
    });
  });

  describe("shouldBeRegExp", function () {
    it("should fail when value is NOT a Regular Expression", function () {
      var value = "foo.deep.stringValue";
      expect(function () {this.sut.shouldBeRegExp(value);}.bind(this)).toThrow(new Error(constants.ShouldBeRegExp + this.getFilePathInfo(value)));
    });

    it("should pass when value is a Regular Expression", function () {
      var value = "foo.deep.regExpValue";
      expect(this.sut.shouldBeRegExp(value));
    });
  });
  describe("shouldNotBeRegExp", function () {
    it("should fail when value is a Regular Expression", function () {
      var value = "foo.deep.regExpValue";
      expect(function () {this.sut.shouldNotBeRegExp(value);}.bind(this)).toThrow(new Error(constants.ShouldNotBeRegExp + this.getFilePathInfo(value)));
    });

    it("should pass when value is NOT a Regular Expression", function () {
      var value = "foo.deep.stringValue";
      expect(this.sut.shouldNotBeRegExp(value));
    });
  });

  describe("shouldBeFalsey", function () {
    it("should fail when value is NOT falsey", function () {
      var value = "foo.deep.stringValue";
      expect(function () {this.sut.shouldBeFalsey(value);}.bind(this)).toThrow(new Error(constants.ShouldBeFalsey + this.getFilePathInfo(value)));
    });

    it("should pass when value is undefined", function () {
      var value = "foo.deep.undefinedValue";
      expect(this.sut.shouldBeFalsey(value));
    });
    it("should pass when value is Nan", function () {
      var value = "foo.deep.NaNValue";
      expect(this.sut.shouldBeFalsey(value));
    });
    it("should pass when value is null", function () {
      var value = "foo.deep.nullValue";
      expect(this.sut.shouldBeFalsey(value));
    });
  });
  describe("shouldNotBeFalsey", function () {
    it("should fail when value is undefined", function () {
      var value = "foo.deep.undefinedValue";
      expect(function () {this.sut.shouldNotBeFalsey(value);}.bind(this)).toThrow(new Error(constants.ShouldNotBeFalsey + this.getFilePathInfo(value)));
    });
    it("should fail when value is Nan", function () {
      var value = "foo.deep.NaNValue";
      expect(function () {this.sut.shouldNotBeFalsey(value);}.bind(this)).toThrow(new Error(constants.ShouldNotBeFalsey + this.getFilePathInfo(value)));
    });
    it("should fail when value is null", function () {
      var value = "foo.deep.nullValue";
      expect(function () {this.sut.shouldNotBeFalsey(value);}.bind(this)).toThrow(new Error(constants.ShouldNotBeFalsey + this.getFilePathInfo(value)));
    });

    it("should pass when value is NOT falsey", function () {
      var value = "foo.deep.stringValue";
      expect(this.sut.shouldNotBeFalsey(value));
    });
  });
});