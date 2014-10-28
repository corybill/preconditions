"use strict";

var builder = require("./../src/preconditions");
var constants = require("./../src/constants");

describe("preconditions", function () {

  beforeEach(function () {
    this.customErrorMessage = "There was an error.";

    this.out = {
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
    };
    this.sut = builder.instance(this.out);
  });

  describe("shouldBeDefined", function () {
    it("should fail when passing in an undefined value", function () {
      var value = "foo.badValue";
      expect(function () {this.sut.shouldBeDefined(value);}.bind(this)).toThrow(new Error(constants.ShouldBeDefined));
    });
    it("should fail when passing in a deep undefined value", function () {
      var value = "bad.value.foo.bad";
      expect(function () {this.sut.shouldBeDefined(value);}.bind(this)).toThrow(new Error(constants.ShouldBeDefined));
    });
    it("should return my custom error message", function () {
      var value = "bad.value.foo.bad";
      expect(function () {this.sut.shouldBeDefined(value, this.customErrorMessage);}.bind(this)).toThrow(new Error(this.customErrorMessage));
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
      expect(function () {this.sut.shouldBeUndefined(value);}.bind(this)).toThrow(new Error(constants.ShouldBeUndefined));
    });
    it("should fail when value is defined", function () {
      var value = "foo.deep.stringValue";
      expect(function () {this.sut.shouldBeUndefined(value, this.customErrorMessage);}.bind(this)).toThrow(new Error(this.customErrorMessage));
    });

    it("should pass when value is a Boolean", function () {
      var value = "foo.deep.undefinedValue";
      expect(this.sut.shouldBeUndefined(value));
    });
  });

  describe("shouldBeNonEmptyArray", function () {
    it("should fail when value is NOT an array", function () {
      var value = "foo.deep.stringValue";
      expect(function () {this.sut.shouldBeNonEmptyArray(value);}.bind(this)).toThrow(new Error(constants.ShouldBeArray));
    });
    it("should fail when value has length of zero", function () {
      var value = "foo.deep.emptyArray";
      expect(function () {this.sut.shouldBeNonEmptyArray(value);}.bind(this)).toThrow(new Error(constants.ShouldNotBeEmpty));
    });

    it("should pass when value is non empty array", function () {
      var value = "foo.deep.nonEmptyArray";
      expect(this.sut.shouldBeNonEmptyArray(value));
    });
  });

  describe("shouldBeArray", function () {
    it("should fail when value is NOT array", function () {
      var value = "foo.deep.stringValue";
      expect(function () {this.sut.shouldBeArray(value);}.bind(this)).toThrow(new Error(constants.ShouldBeArray));
    });

    it("should pass when value is array", function () {
      var value = "foo.deep.emptyArray";
      expect(this.sut.shouldBeArray(value));
    });
  });
  describe("shouldNotBeArray", function () {
    it("should fail when value is array", function () {
      var value = "foo.deep.emptyArray";
      expect(function () {this.sut.shouldNotBeArray(value);}.bind(this)).toThrow(new Error(constants.ShouldNotBeArray));
    });

    it("should pass when value is NOT array", function () {
      var value = "foo.deep.stringValue";
      expect(this.sut.shouldNotBeArray(value));
    });
  });

  describe("shouldBeEmpty", function () {
    it("should fail when value is NOT empty", function () {
      var value = "foo.deep.nonEmptyArray";
      expect(function () {this.sut.shouldBeEmpty(value);}.bind(this)).toThrow(new Error(constants.ShouldBeEmpty));
    });

    it("should pass when value is empty", function () {
      var value = "foo.deep.emptyArray";
      expect(this.sut.shouldBeEmpty(value));
    });
  });

  describe("shouldNotBeEmpty", function () {
    it("should fail when value is empty", function () {
      var value = "foo.deep.emptyArray";
      expect(function () {this.sut.shouldNotBeEmpty(value);}.bind(this)).toThrow(new Error(constants.ShouldNotBeEmpty));
    });

    it("should pass when value is NOT empty", function () {
      var value = "foo.deep.nonEmptyArray";
      expect(this.sut.shouldNotBeEmpty(value));
    });
  });

  describe("shouldBeObject", function () {
    it("should fail when value is NOT an Object", function () {
      var value = "foo.deep.stringValue";
      expect(function () {this.sut.shouldBeObject(value);}.bind(this)).toThrow(new Error(constants.ShouldBeObject));
    });

    it("should pass when value is an Object", function () {
      var value = "foo.deep";
      expect(this.sut.shouldBeObject(value));
    });
  });
  describe("shouldNotBeObject", function () {
    it("should fail when value is an Object", function () {
      var value = "foo.deep";
      expect(function () {this.sut.shouldNotBeObject(value);}.bind(this)).toThrow(new Error(constants.ShouldNotBeObject));
    });

    it("should pass when value is NOT an Object", function () {
      var value = "foo.deep.stringValue";
      expect(this.sut.shouldNotBeObject(value));
    });
  });

  describe("shouldBeFunction", function () {
    it("should fail when value is NOT a Function", function () {
      var value = "foo.deep.numberValue";
      expect(function () {this.sut.shouldBeFunction(value);}.bind(this)).toThrow(new Error(constants.ShouldBeFunction));
    });

    it("should pass when value is a Function", function () {
      var value = "foo.deep.functionValue";
      expect(this.sut.shouldBeFunction(value));
    });
  });
  describe("shouldNotBeFunction", function () {
    it("should fail when value is a Function", function () {
      var value = "foo.deep.functionValue";
      expect(function () {this.sut.shouldNotBeFunction(value);}.bind(this)).toThrow(new Error(constants.ShouldNotBeFunction));
    });

    it("should pass when value is NOT a Function", function () {
      var value = "foo.deep.numberValue";
      expect(this.sut.shouldNotBeFunction(value));
    });
  });

  describe("shouldBeString", function () {
    it("should fail when value is NOT a String", function () {
      var value = "foo.deep.numberValue";
      expect(function () {this.sut.shouldBeString(value);}.bind(this)).toThrow(new Error(constants.ShouldBeString));
    });

    it("should pass when value is a String", function () {
      var value = "foo.deep.stringValue";
      expect(this.sut.shouldBeString(value));
    });
  });
  describe("shouldNotBeString", function () {
    it("should fail when value is a String", function () {
      var value = "foo.deep.stringValue";
      expect(function () {this.sut.shouldNotBeString(value);}.bind(this)).toThrow(new Error(constants.ShouldNotBeString));
    });

    it("should pass when value is NOT a String", function () {
      var value = "foo.deep.numberValue";
      expect(this.sut.shouldNotBeString(value));
    });
  });

  describe("shouldBeNumber", function () {
    it("should fail when value is NOT a Number", function () {
      var value = "foo.deep.stringValue";
      expect(function () {this.sut.shouldBeNumber(value);}.bind(this)).toThrow(new Error(constants.ShouldBeNumber));
    });

    it("should pass when value is a Number", function () {
      var value = "foo.deep.numberValue";
      expect(this.sut.shouldBeNumber(value));
    });
  });
  describe("shouldNotBeNumber", function () {
    it("should fail when value is a Number", function () {
      var value = "foo.deep.numberValue";
      expect(function () {this.sut.shouldNotBeNumber(value);}.bind(this)).toThrow(new Error(constants.ShouldNotBeNumber));
    });

    it("should pass when value is NOT a Number", function () {
      var value = "foo.deep.stringValue";
      expect(this.sut.shouldNotBeNumber(value));
    });
  });

  describe("shouldBeFinite", function () {
    it("should fail when value is NOT Finite", function () {
      var value = "foo.deep.infiniteValue";
      expect(function () {this.sut.shouldBeFinite(value);}.bind(this)).toThrow(new Error(constants.ShouldBeFinite));
    });

    it("should pass when value is Finite", function () {
      var value = "foo.deep.finiteValue";
      expect(this.sut.shouldBeFinite(value));
    });
  });
  describe("shouldBeInfinite", function () {
    it("should fail when value is NOT Infinite", function () {
      var value = "foo.deep.finiteValue";
      expect(function () {this.sut.shouldBeInfinite(value);}.bind(this)).toThrow(new Error(constants.ShouldBeInfinite));
    });

    it("should pass when value is Infinite", function () {
      var value = "foo.deep.infiniteValue";
      expect(this.sut.shouldBeInfinite(value));
    });
  });

  describe("shouldBeBoolean", function () {
    it("should fail when value is NOT a Boolean", function () {
      var value = "foo.deep.stringValue";
      expect(function () {this.sut.shouldBeBoolean(value);}.bind(this)).toThrow(new Error(constants.ShouldBeBoolean));
    });

    it("should pass when value is a Boolean", function () {
      var value = "foo.deep.falseValue";
      expect(this.sut.shouldBeBoolean(value));
    });
  });
  describe("shouldNotBeBoolean", function () {
    it("should fail when value is a Boolean", function () {
      var value = "foo.deep.falseValue";
      expect(function () {this.sut.shouldNotBeBoolean(value);}.bind(this)).toThrow(new Error(constants.ShouldNotBeBoolean));
    });

    it("should pass when value is NOT a Boolean", function () {
      var value = "foo.deep.stringValue";
      expect(this.sut.shouldNotBeBoolean(value));
    });
  });

  describe("shouldBeDate", function () {
    it("should fail when value is NOT a Date", function () {
      var value = "foo.deep.stringValue";
      expect(function () {this.sut.shouldBeDate(value);}.bind(this)).toThrow(new Error(constants.ShouldBeDate));
    });

    it("should pass when value is a Date", function () {
      var value = "foo.deep.dateValue";
      expect(this.sut.shouldBeDate(value));
    });
  });
  describe("shouldNotBeDate", function () {
    it("should fail when value is a Date", function () {
      var value = "foo.deep.dateValue";
      expect(function () {this.sut.shouldNotBeDate(value);}.bind(this)).toThrow(new Error(constants.ShouldNotBeDate));
    });

    it("should pass when value is NOT a Date", function () {
      var value = "foo.deep.stringValue";
      expect(this.sut.shouldNotBeDate(value));
    });
  });

  describe("shouldBeRegExp", function () {
    it("should fail when value is NOT a Regular Expression", function () {
      var value = "foo.deep.stringValue";
      expect(function () {this.sut.shouldBeRegExp(value);}.bind(this)).toThrow(new Error(constants.ShouldBeRegExp));
    });

    it("should pass when value is a Regular Expression", function () {
      var value = "foo.deep.regExpValue";
      expect(this.sut.shouldBeRegExp(value));
    });
  });
  describe("shouldNotBeRegExp", function () {
    it("should fail when value is a Regular Expression", function () {
      var value = "foo.deep.regExpValue";
      expect(function () {this.sut.shouldNotBeRegExp(value);}.bind(this)).toThrow(new Error(constants.ShouldNotBeRegExp));
    });

    it("should pass when value is NOT a Regular Expression", function () {
      var value = "foo.deep.stringValue";
      expect(this.sut.shouldNotBeRegExp(value));
    });
  });

  describe("shouldBeFalsey", function () {
    it("should fail when value is NOT falsey", function () {
      var value = "foo.deep.stringValue";
      expect(function () {this.sut.shouldBeFalsey(value);}.bind(this)).toThrow(new Error(constants.ShouldBeFalsey));
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
      expect(function () {this.sut.shouldNotBeFalsey(value);}.bind(this)).toThrow(new Error(constants.ShouldNotBeFalsey));
    });
    it("should fail when value is Nan", function () {
      var value = "foo.deep.NaNValue";
      expect(function () {this.sut.shouldNotBeFalsey(value);}.bind(this)).toThrow(new Error(constants.ShouldNotBeFalsey));
    });
    it("should fail when value is null", function () {
      var value = "foo.deep.nullValue";
      expect(function () {this.sut.shouldNotBeFalsey(value);}.bind(this)).toThrow(new Error(constants.ShouldNotBeFalsey));
    });

    it("should pass when value is NOT falsey", function () {
      var value = "foo.deep.stringValue";
      expect(this.sut.shouldNotBeFalsey(value));
    });
  });

  it("should work using chaining commands for success", function () {
    var stringValue = "foo.deep.stringValue";
    var numberValue = "foo.deep.numberValue";

    expect(this.sut.shouldNotBeFalsey(stringValue)
        .shouldBeDefined(stringValue)
        .shouldBeString(stringValue)
        .shouldNotBeFalsey(numberValue)
        .shouldBeDefined(numberValue)
        .shouldBeNumber(numberValue));
  });
  it("should work using chaining commands when fail at end of chain", function () {
    var stringValue = "foo.deep.stringValue";
    var numberValue = "foo.deep.numberValue";

    expect(function () {
      this.sut.shouldNotBeFalsey(stringValue)
          .shouldBeDefined(stringValue)
          .shouldBeString(stringValue)
          .shouldNotBeFalsey(numberValue)
          .shouldBeDefined(numberValue)
          .shouldBeNumber(stringValue);
    }.bind(this)).toThrow(new Error(constants.ShouldBeNumber));
  });
  it("should work using chaining commands when fail at middle of chain", function () {
    var stringValue = "foo.deep.stringValue";
    var numberValue = "foo.deep.numberValue";
    var NaNValue = "foo.deep.NaNValue";

    expect(function () {
      this.sut.shouldNotBeFalsey(stringValue)
        .shouldBeDefined(stringValue)
        .shouldBeString(NaNValue, this.customErrorMessage)
        .shouldNotBeFalsey(numberValue)
        .shouldBeDefined(numberValue)
        .shouldBeNumber(stringValue);
    }.bind(this)).toThrow(new Error(this.customErrorMessage));
  });

  describe("when extending Preconditions", function () {
    beforeEach(function () {
      var Preconditions = builder.constructor();

      function ChildClass(someObjectToTest) {
        Preconditions.call(this, someObjectToTest);
      }
      ChildClass.prototype = Object.create(Preconditions.prototype);
      ChildClass.prototype.shouldBeTrue = function (value, message) {
        var msg = message || this.ShouldBeTrue;
        if (value !== true) {
          throw new Error(msg);
        }
      };

      this.ShouldBeTrue = "ShouldBeTrue";
      this.childSut = new ChildClass(this.out);
    });

    it("should chain and pass successfully", function () {
      var stringValue = "foo.deep.stringValue";
      var numberValue = "foo.deep.numberValue";

      expect(this.childSut.shouldNotBeFalsey(stringValue)
        .shouldBeDefined(stringValue)
        .shouldBeString(stringValue)
        .shouldNotBeFalsey(numberValue)
        .shouldBeDefined(numberValue)
        .shouldBeNumber(numberValue)
        .checkPositionIndex(5, 10, "Custom error message.")
        .shouldBeTrue(true));
    });
    it("should chain correctly but fail on bad value at end with custom error message", function () {
      var stringValue = "foo.deep.stringValue";
      var numberValue = "foo.deep.numberValue";

      expect(
        function () {
          this.childSut.shouldNotBeFalsey(stringValue)
            .shouldBeDefined(stringValue)
            .shouldBeString(stringValue)
            .shouldNotBeFalsey(numberValue)
            .shouldBeDefined(numberValue)
            .shouldBeNumber(numberValue)
            .checkPositionIndex(5, 10, "Custom error message.")
            .shouldBeTrue(false, this.customErrorMessage);
        }.bind(this)).toThrow(new Error(this.customErrorMessage));
    });
  });

  describe("checkArgument", function () {
    it("should fail when value is false (i.e. is an illegal argument)", function () {
      var value = this.out.foo.deep.stringValue === "FOOFOO";
      expect(function () {this.sut.checkArgument(value);}.bind(this)).toThrow(new Error(constants.IllegalArgument));
    });

    it("should pass when value is true", function () {
      var value = this.out.foo.deep.stringValue === "FOO";
      expect(this.sut.checkArgument(value));
    });
  });
  describe("checkState", function () {
    it("should fail when value is false (i.e. has an illegal state)", function () {
      var value = this.out.foo.deep.stringValue === "FOOFOO";
      expect(function () {this.sut.checkState(value);}.bind(this)).toThrow(new Error(constants.IllegalState));
    });

    it("should pass when value is true", function () {
      var value = this.out.foo.deep.stringValue === "FOO";
      expect(this.sut.checkState(value));
    });
  });

  describe("checkElementIndex", function () {
    it("should fail when index is less than 0", function () {
      var index = -4;
      var size = 10;
      expect(function () {this.sut.checkElementIndex(index, size);}.bind(this)).toThrow(new Error(constants.ShouldHaveValidIndex));
    });
    it("should fail when index is greater than size", function () {
      var index = 12;
      var size = 10;
      expect(function () {this.sut.checkElementIndex(index, size);}.bind(this)).toThrow(new Error(constants.ShouldHaveValidIndex));
    });
    it("should fail when index is equal to size", function () {
      var index = 10;
      var size = 10;
      expect(function () {this.sut.checkElementIndex(index, size);}.bind(this)).toThrow(new Error(constants.ShouldHaveValidIndex));
    });

    it("should pass when value is greater than zero and less than size", function () {
      var index = 8;
      var size = 10;
      expect(this.sut.checkElementIndex(index, size));
    });
    it("should pass when value is equal to zero", function () {
      var index = 0;
      var size = 10;
      expect(this.sut.checkElementIndex(index, size));
    });
  });

  describe("checkPositionIndex", function () {
    it("should fail when index is less than 0", function () {
      var index = -4;
      var size = 10;
      expect(function () {this.sut.checkPositionIndex(index, size);}.bind(this)).toThrow(new Error(constants.ShouldHaveValidPosition));
    });
    it("should fail when index is greater than size", function () {
      var index = 12;
      var size = 10;
      expect(function () {this.sut.checkPositionIndex(index, size);}.bind(this)).toThrow(new Error(constants.ShouldHaveValidPosition));
    });

    it("should pass when value is greater than zero and less than size", function () {
      var index = 8;
      var size = 10;
      expect(this.sut.checkPositionIndex(index, size));
    });
    it("should pass when value is equal to zero", function () {
      var index = 0;
      var size = 10;
      expect(this.sut.checkPositionIndex(index, size));
    });
    it("should pass when value is equal to size", function () {
      var index = 10;
      var size = 10;
      expect(this.sut.checkPositionIndex(index, size));
    });
  });

  describe("checkPositionIndexes", function () {
    it("should fail when start is less than 0", function () {
      var start = -4;
      var end = 10;
      var size = 12;
      expect(function () {this.sut.checkPositionIndexes(start, end, size);}.bind(this)).toThrow(new Error(constants.ShouldHaveValidPositions));
    });
    it("should fail when end is less than start", function () {
      var start = 5;
      var end = 3;
      var size = 12;
      expect(function () {this.sut.checkPositionIndexes(start, end, size);}.bind(this)).toThrow(new Error(constants.StartBeforeEnd));
    });
    it("should fail when end is greater than size", function () {
      var start = 3;
      var end = 13;
      var size = 12;
      expect(function () {this.sut.checkPositionIndexes(start, end, size);}.bind(this)).toThrow(new Error(constants.ShouldHaveValidPositions));
    });

    describe("start is greater than 0", function () {
      it("should pass when end is less than size and greater than start", function () {
        var start = 2;
        var end = 10;
        var size = 12;
        expect(this.sut.checkPositionIndexes(start, end, size));
      });
      it("should pass when end is equal to size and greater than start", function () {
        var start = 2;
        var end = 12;
        var size = 12;
        expect(this.sut.checkPositionIndexes(start, end, size));
      });
    });
    describe("start is equal 0", function () {
      it("should pass when end is less than size and greater than start", function () {
        var start = 0;
        var end = 10;
        var size = 12;
        expect(this.sut.checkPositionIndexes(start, end, size));
      });
      it("should pass when end is equal to size and greater than start", function () {
        var start = 0;
        var end = 12;
        var size = 12;
        expect(this.sut.checkPositionIndexes(start, end, size));
      });
    });
  });
});