"use strict";

const Preconditions = require("../../lib/preconditions"),
  constants = require("../../lib/constants"),
  random = require("../random");

const Maddox = require("maddox");

const Scenario = Maddox.functional.FromSynchronousScenario;

describe("preconditions - when using the errr builder", function () {
  let context;

  beforeEach(function () {
    context = {};

    context.setupTest = function () {
      context.out = {
        foo: {
          deep: {
            stringValue: "FOO",
            numberValue: 10,
            functionValue: function () {
            },
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
      context.inputParams = [];
      context.customErrorMessage = "There was an error.";
      context.sut = Preconditions.errr();
    };
  });

  describe("shouldBeDefined", function () {
    it("it should fail when value is not defined.", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldBeDefined(context.out.foo.undefinedValue);
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = constants.ShouldBeDefined;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
        });
    });

    it("it should fail when deeply nested value is not defined.", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldBeDefined(context.out.foo.deep.undefinedValue);
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = constants.ShouldBeDefined;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
        });
    });

    it("it should fail when value is not defined and return a custom error message.", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldBeDefined(context.out.foo.undefinedValue, context.customErrorMessage);
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = context.customErrorMessage;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
        });
    });

    it("it should fail with custom error message using template params.", function () {
      context.setupEntryPoint = function () {
        context.customErrorMessage = "(%s): Error ID %s";
        context.uniqueId1 = random.uniqueId();
        context.uniqueId2 = random.uniqueId();
        context.entryPointObject = context.sut.shouldBeDefined(context.out.foo.undefinedValue, context.customErrorMessage, [context.uniqueId1, context.uniqueId2]);
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = `(${context.uniqueId1}): Error ID ${context.uniqueId2}`;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
        });
    });

    it("it should pass when value is defined.", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldBeDefined(context.out.foo.deep.stringValue);
      };

      context.setupTest();
      context.setupEntryPoint();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err, actual: undefined });
        });
    });
  });
  describe("shouldBeUndefined", function () {
    it("it should fail when value is defined", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldBeUndefined(context.out.foo);
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = constants.ShouldBeUndefined;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
        });
    });

    it("it should pass when value is undefined", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldBeUndefined(context.out.foo.undefinedValue);
      };

      context.setupTest();
      context.setupEntryPoint();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err, actual: undefined });
        });
    });
  });

  describe("shouldBeArray", function () {
    it("it should fail when value is NOT array", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldBeArray(context.out.foo.deep.undefinedValue);
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = constants.ShouldBeArray;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
        });
    });

    it("it should pass when value is array", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldBeArray(context.out.foo.deep.nonEmptyArray);
      };

      context.setupTest();
      context.setupEntryPoint();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err, actual: undefined });
        });
    });
  });
  describe("shouldNotBeArray", function () {
    it("it should fail when value is array", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldNotBeArray(context.out.foo.deep.nonEmptyArray);
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = constants.ShouldNotBeArray;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
        });
    });

    it("it should pass when value is NOT array", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldNotBeArray(context.out.foo.stringValue);
      };

      context.setupTest();
      context.setupEntryPoint();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err, actual: undefined });
        });
    });
  });

  describe("shouldBeEmpty", function () {
    it("it should fail when value is NOT empty", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldBeEmpty(context.out.foo.deep.nonEmptyArray);
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = constants.ShouldBeEmpty;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
        });
    });

    it("it should pass when value is empty", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldBeEmpty(context.out.foo.deep.emptyArray);
      };

      context.setupTest();
      context.setupEntryPoint();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err, actual: undefined });
        });
    });
  });
  describe("shouldNotBeEmpty", function () {
    it("it should fail when value is empty", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldNotBeEmpty(context.out.foo.deep.emptyArray);
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = constants.ShouldNotBeEmpty;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
        });
    });

    it("it should pass when value is NOT empty", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldNotBeEmpty(context.out.foo.deep.nonEmptyArray);
      };

      context.setupTest();
      context.setupEntryPoint();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err, actual: undefined });
        });
    });
  });

  describe("shouldBeObject", function () {
    it("it should fail when value is NOT an Object", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldBeObject(context.out.foo.deep.stringValue);
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = constants.ShouldBeObject;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
        });
    });

    it("it should pass when value is an Object", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldBeObject(context.out.foo.deep);
      };

      context.setupTest();
      context.setupEntryPoint();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err, actual: undefined });
        });
    });
  });
  describe("shouldNotBeObject", function () {
    it("it should fail when value is an Object", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldNotBeObject(context.out.foo.deep);
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = constants.ShouldNotBeObject;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
        });
    });

    it("it should pass when value is NOT an Object", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldNotBeObject(context.out.foo.deep.stringValue);
      };

      context.setupTest();
      context.setupEntryPoint();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err, actual: undefined });
        });
    });
  });

  describe("shouldBeFunction", function () {
    it("it should fail when value is NOT a Function", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldBeFunction(context.out.foo.deep.stringValue);
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = constants.ShouldBeFunction;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
        });
    });

    it("it should pass when value is a Function", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldBeFunction(context.out.foo.deep.functionValue);
      };

      context.setupTest();
      context.setupEntryPoint();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err, actual: undefined });
        });
    });
  });
  describe("shouldNotBeFunction", function () {
    it("it should fail when value is a Function", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldNotBeFunction(context.out.foo.deep.functionValue);
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = constants.ShouldNotBeFunction;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
        });
    });

    it("it should pass when value is NOT a Function", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldNotBeFunction(context.out.foo.undefinedValue);
      };

      context.setupTest();
      context.setupEntryPoint();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err, actual: undefined });
        });
    });
  });

  describe("shouldBeString", function () {
    it("it should fail when value is NOT a String", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldBeString(context.out.foo.deep.numberValue);
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = constants.ShouldBeString;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
        });
    });

    it("it should pass when value is a String", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldBeString(context.out.foo.deep.stringValue);
      };

      context.setupTest();
      context.setupEntryPoint();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err, actual: undefined });
        });
    });
  });
  describe("shouldNotBeString", function () {
    it("it should fail when value is a String", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldNotBeString(context.out.foo.deep.stringValue);
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = constants.ShouldNotBeString;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
        });
    });

    it("it should pass when value is NOT a String", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldNotBeString(context.out.foo.deep.undefinedValue);
      };

      context.setupTest();
      context.setupEntryPoint();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err, actual: undefined });
        });
    });
  });

  describe("shouldBeNumber", function () {
    it("it should fail when value is NOT a Number", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldBeNumber(context.out.foo.deep.stringValue);
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = constants.ShouldBeNumber;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
        });
    });

    it("it should pass when value is a Number", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldBeNumber(context.out.foo.deep.numberValue);
      };

      context.setupTest();
      context.setupEntryPoint();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err, actual: undefined });
        });
    });
  });
  describe("shouldNotBeNumber", function () {
    it("it should fail when value is a Number", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldNotBeNumber(context.out.foo.deep.numberValue);
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = constants.ShouldNotBeNumber;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
        });
    });

    it("it should pass when value is NOT a Number", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldNotBeNumber(context.out.foo.deep.stringValue);
      };

      context.setupTest();
      context.setupEntryPoint();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err, actual: undefined });
        });
    });
  });

  describe("shouldBeFinite", function () {
    it("it should fail when value is NOT Finite", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldBeFinite(context.out.foo.deep.infiniteValue);
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = constants.ShouldBeFinite;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
        });
    });

    it("it should pass when value is Finite", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldBeFinite(context.out.foo.deep.finiteValue);
      };

      context.setupTest();
      context.setupEntryPoint();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err, actual: undefined });
        });
    });
  });
  describe("shouldBeInfinite", function () {
    it("it should fail when value is NOT Infinite", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldBeInfinite(context.out.foo.deep.finiteValue);
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = constants.ShouldBeInfinite;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
        });
    });

    it("it should pass when value is Infinite", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldBeInfinite(context.out.foo.deep.infiniteValue);
      };

      context.setupTest();
      context.setupEntryPoint();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err, actual: undefined });
        });
    });
  });

  describe("shouldBeBoolean", function () {
    it("it should fail when value is NOT a Boolean", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldBeBoolean(context.out.foo.deep.numberValue);
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = constants.ShouldBeBoolean;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
        });
    });

    it("it should pass when value is a Boolean", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldBeBoolean(context.out.foo.deep.trueValue);
      };

      context.setupTest();
      context.setupEntryPoint();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err, actual: undefined });
        });
    });
  });
  describe("shouldNotBeBoolean", function () {
    it("it should fail when value is a Boolean", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldNotBeBoolean(context.out.foo.deep.trueValue);
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = constants.ShouldNotBeBoolean;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
        });
    });

    it("it should pass when value is NOT a Boolean", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldNotBeBoolean(context.out.foo.deep.numberValue);
      };

      context.setupTest();
      context.setupEntryPoint();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err, actual: undefined });
        });
    });
  });

  describe("shouldBeDate", function () {
    it("it should fail when value is NOT a Date", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldBeDate(context.out.foo.deep.numberValue);
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = constants.ShouldBeDate;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
        });
    });

    it("it should pass when value is a Date", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldBeDate(context.out.foo.deep.dateValue);
      };

      context.setupTest();
      context.setupEntryPoint();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err, actual: undefined });
        });
    });
  });
  describe("shouldNotBeDate", function () {
    it("it should fail when value is a Date", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldNotBeDate(context.out.foo.deep.dateValue);
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = constants.ShouldNotBeDate;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
        });
    });

    it("it should pass when value is NOT a Date", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldNotBeDate(context.out.foo.deep.numberValue);
      };

      context.setupTest();
      context.setupEntryPoint();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err, actual: undefined });
        });
    });
  });

  describe("shouldBeRegExp", function () {
    it("it should fail when value is NOT a Regular Expression", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldBeRegExp(context.out.foo.deep.numberValue);
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = constants.ShouldBeRegExp;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
        });
    });

    it("it should pass when value is a Regular Expression", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldBeRegExp(context.out.foo.deep.regExpValue);
      };

      context.setupTest();
      context.setupEntryPoint();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err, actual: undefined });
        });
    });
  });
  describe("shouldNotBeRegExp", function () {
    it("it should fail when value is a Regular Expression", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldNotBeRegExp(context.out.foo.deep.regExpValue);
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = constants.ShouldNotBeRegExp;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
        });
    });

    it("it should pass when value is NOT a Regular Expression", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldNotBeRegExp(context.out.foo.deep.numberValue);
      };

      context.setupTest();
      context.setupEntryPoint();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err, actual: undefined });
        });
    });
  });

  describe("shouldBeFalsey", function () {
    it("it should fail when value is NOT falsey", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldBeFalsey(context.out.foo.deep.trueValue);
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = constants.ShouldBeFalsey;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
        });
    });

    it("it should pass when value is undefined", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldBeFalsey(context.out.foo.deep.undefinedValue);
      };

      context.setupTest();
      context.setupEntryPoint();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err, actual: undefined });
        });
    });
    it("it should pass when value is Nan", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldBeFalsey(context.out.foo.deep.NaNValue);
      };

      context.setupTest();
      context.setupEntryPoint();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err, actual: undefined });
        });
    });
    it("it should pass when value is null", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldBeFalsey(context.out.foo.deep.nullValue);
      };

      context.setupTest();
      context.setupEntryPoint();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err, actual: undefined });
        });
    });
  });
  describe("shouldBeFalsy", function () {
    it("it should fail when value is NOT falsey", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldBeFalsy(context.out.foo.deep.trueValue);
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = constants.ShouldBeFalsey;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
        });
    });

    it("it should pass when value is undefined", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldBeFalsy(context.out.foo.deep.undefinedValue);
      };

      context.setupTest();
      context.setupEntryPoint();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err, actual: undefined });
        });
    });
    it("it should pass when value is Nan", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldBeFalsy(context.out.foo.deep.NaNValue);
      };

      context.setupTest();
      context.setupEntryPoint();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err, actual: undefined });
        });
    });
    it("it should pass when value is null", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldBeFalsy(context.out.foo.deep.nullValue);
      };

      context.setupTest();
      context.setupEntryPoint();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err, actual: undefined });
        });
    });
  });

  describe("shouldNotBeFalsey", function () {
    it("it should fail when value is undefined", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldNotBeFalsey(context.out.foo.deep.undefinedValue);
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = constants.ShouldNotBeFalsey;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
        });
    });
    it("it should fail when value is Nan", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldNotBeFalsey(context.out.foo.deep.NaNValue);
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = constants.ShouldNotBeFalsey;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
        });
    });
    it("it should fail when value is null", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldNotBeFalsey(context.out.foo.deep.nullValue);
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = constants.ShouldNotBeFalsey;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
        });
    });

    it("it should pass when value is NOT falsey", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldNotBeFalsey(context.out.foo.deep.trueValue);
      };

      context.setupTest();
      context.setupEntryPoint();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err, actual: undefined });
        });
    });
  });
  describe("shouldNotBeFalsy", function () {
    it("it should fail when value is undefined", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldNotBeFalsy(context.out.foo.deep.undefinedVallue);
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = constants.ShouldNotBeFalsey;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
        });
    });
    it("it should fail when value is Nan", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldNotBeFalsy(context.out.foo.deep.NaNValue);
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = constants.ShouldNotBeFalsey;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
        });
    });
    it("it should fail when value is null", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldNotBeFalsy(context.out.foo.deep.nullValue);
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = constants.ShouldNotBeFalsey;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
        });
    });

    it("it should pass when value is NOT falsey", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldNotBeFalsy(context.out.foo.deep.trueValue);
      };

      context.setupTest();
      context.setupEntryPoint();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err, actual: undefined });
        });
    });
  });

  describe("shouldBeTruthy", function () {
    it("it should fail when value is undefined", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldBeTruthy(context.out.foo.deep.undefinedValue);
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = constants.ShouldNotBeFalsey;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
        });
    });
    it("it should fail when value is Nan", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldBeTruthy(context.out.foo.deep.NaNValue);
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = constants.ShouldNotBeFalsey;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
        });
    });
    it("it should fail when value is null", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldBeTruthy(context.out.foo.deep.nullValue);
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = constants.ShouldNotBeFalsey;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
        });
    });

    it("it should pass when value is truthy", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldBeTruthy(context.out.foo.deep.trueValue);
      };

      context.setupTest();
      context.setupEntryPoint();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err, actual: undefined });
        });
    });
  });
  describe("shouldNotBeTruthy", function () {
    it("it should fail when value is truthy", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldNotBeTruthy(context.out.foo.deep.trueValue);
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = constants.ShouldBeFalsey;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
        });
    });

    it("it should pass when value is undefined", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldNotBeTruthy(context.out.foo.deep.undefinedValue);
      };

      context.setupTest();
      context.setupEntryPoint();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err, actual: undefined });
        });
    });
    it("it should pass when value is Nan", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldNotBeTruthy(context.out.foo.deep.NaNValue);
      };

      context.setupTest();
      context.setupEntryPoint();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err, actual: undefined });
        });
    });
    it("it should pass when value is null", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.shouldNotBeTruthy(context.out.foo.deep.nullValue);
      };

      context.setupTest();
      context.setupEntryPoint();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err, actual: undefined });
        });
    });
  });

  describe("checkArgument", function () {
    it("it should fail when value is false (i.e. is an illegal argument)", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.checkArgument(context.out.foo.deep.falseValue);
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = constants.IllegalArgument;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
        });
    });

    it("it should pass when value is true", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.checkArgument(context.out.foo.deep.trueValue);
      };

      context.setupTest();
      context.setupEntryPoint();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err, actual: undefined });
        });
    });
  });

  describe("checkState", function () {
    it("it should fail when value is false (i.e. is an illegal argument)", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.checkState(context.out.foo.deep.falseValue);
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = constants.IllegalState;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
        });
    });

    it("it should pass when value is true", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.checkState(context.out.foo.deep.trueValue);
      };

      context.setupTest();
      context.setupEntryPoint();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err, actual: undefined });
        });
    });
  });

  describe("checkElementIndex", function () {
    it("it should fail when index is less than 0", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.checkElementIndex(-4, 5);
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = constants.ShouldHaveValidIndex;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
        });
    });
    it("it should fail when index is greater than size", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.checkElementIndex(6, 5);
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = constants.ShouldHaveValidIndex;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
        });
    });
    it("it should fail when index is equal to size", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.checkElementIndex(5, 5);
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = constants.ShouldHaveValidIndex;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
        });
    });

    it("it should pass when value is greater than zero and less than size", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.checkElementIndex(4, 5);
      };

      context.setupTest();
      context.setupEntryPoint();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err, actual: undefined });
        });
    });
    it("it should pass when value is equal to zero", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.checkElementIndex(0, 10);
      };

      context.setupTest();
      context.setupEntryPoint();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err, actual: undefined });
        });
    });
  });

  describe("checkPositionIndex", function () {
    it("it should fail when index is less than 0", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.checkPositionIndex(-4, 10);
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = constants.ShouldHaveValidPosition;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
        });
    });
    it("it should fail when index is greater than size", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.checkPositionIndex(12, 10);
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = constants.ShouldHaveValidPosition;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
        });
    });

    it("it should pass when value is greater than zero and less than size", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.checkPositionIndex(8, 10);
      };

      context.setupTest();
      context.setupEntryPoint();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err, actual: undefined });
        });
    });
    it("it should pass when value is equal to zero", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.checkPositionIndex(0, 10);
      };

      context.setupTest();
      context.setupEntryPoint();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err, actual: undefined });
        });
    });
    it("it should pass when value is equal to size", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.checkPositionIndex(10, 10);
      };

      context.setupTest();
      context.setupEntryPoint();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err, actual: undefined });
        });
    });
  });

  describe("checkPositionIndexes", function () {
    it("it should fail when start is less than 0", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.checkPositionIndexes(-4, 10, 12);
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = constants.ShouldHaveValidPositions;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
        });
    });
    it("it should fail when end is less than start", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.checkPositionIndexes(5, 3, 12);
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = constants.ShouldHaveValidPositions;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
        });
    });
    it("it should fail when end is greater than size", function () {
      context.setupEntryPoint = function () {
        context.entryPointObject = context.sut.checkPositionIndexes(3, 13, 12);
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = constants.ShouldHaveValidPositions;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
        });
    });

    describe("start is greater than 0", function () {
      it("it should pass when end is less than size and greater than start", function () {
        context.setupEntryPoint = function () {
          context.entryPointObject = context.sut.checkPositionIndexes(2, 10, 12);
        };

        context.setupTest();
        context.setupEntryPoint();

        new Scenario()
          .withEntryPoint(context.entryPointObject, "test")
          .withInputParams(context.inputParams)
          .test(function (err) {
            Maddox.compare.shouldEqual({ expected: err, actual: undefined });
          });
      });
      it("it should pass when end is equal to size and greater than start", function () {
        context.setupEntryPoint = function () {
          context.entryPointObject = context.sut.checkPositionIndexes(2, 12, 12);
        };

        context.setupTest();
        context.setupEntryPoint();

        new Scenario()
          .withEntryPoint(context.entryPointObject, "test")
          .withInputParams(context.inputParams)
          .test(function (err) {
            Maddox.compare.shouldEqual({ expected: err, actual: undefined });
          });
      });
    });
    describe("start is equal 0", function () {
      it("it should pass when end is less than size and greater than start", function () {
        context.setupEntryPoint = function () {
          context.entryPointObject = context.sut.checkPositionIndexes(0, 10, 12);
        };

        context.setupTest();
        context.setupEntryPoint();

        new Scenario()
          .withEntryPoint(context.entryPointObject, "test")
          .withInputParams(context.inputParams)
          .test(function (err) {
            Maddox.compare.shouldEqual({ expected: err, actual: undefined });
          });
      });
      it("it should pass when end is equal to size and greater than start", function () {
        context.setupEntryPoint = function () {
          context.entryPointObject = context.sut.checkPositionIndexes(0, 12, 12);
        };

        context.setupTest();
        context.setupEntryPoint();

        new Scenario()
          .withEntryPoint(context.entryPointObject, "test")
          .withInputParams(context.inputParams)
          .test(function (err) {
            Maddox.compare.shouldEqual({ expected: err, actual: undefined });
          });
      });
    });
  });

  describe("and adding builder functions", function () {
    it("it should fail with debug params.", function () {
      context.setupEntryPoint = function () {
        context.customErrorMessage = "(%s): Error ID %s";
        context.uniqueId1 = random.uniqueId();
        context.uniqueId2 = random.uniqueId();
        context.debugParams = { myDebugParam: random.uniqueId() };
        context.entryPointObject = context.sut.shouldBeDefined(context.out.foo.undefinedValue, context.customErrorMessage, [context.uniqueId1, context.uniqueId2])
          .debug(context.debugParams);
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = `(${context.uniqueId1}): Error ID ${context.uniqueId2}`;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ value: err.stack.split(context.debugParams.myDebugParam).length === 2 });
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
        });
    });

    it("it should fail with appending to existing error.", function () {
      context.setupEntryPoint = function () {
        context.appendToError = new Error(random.uniqueId());
        context.customErrorMessage = "(%s): Error ID %s";
        context.uniqueId1 = random.uniqueId();
        context.uniqueId2 = random.uniqueId();
        context.debugParams = { myDebugParam: random.uniqueId() };
        context.entryPointObject = context.sut.shouldBeDefined(context.out.foo.undefinedValue, context.customErrorMessage, [context.uniqueId1, context.uniqueId2])
          .debug(context.debugParams)
          .appendTo(context.appendToError);
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = `(${context.uniqueId1}): Error ID ${context.uniqueId2}`;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ value: err.stack.split(context.debugParams.myDebugParam).length === 2 });
          Maddox.compare.shouldEqual({ value: err.stack.split(context.appendToError.message).length === 2 });
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
        });
    });

    it("it should fail with immutable values from set.", function () {
      context.setupEntryPoint = function () {
        context.customErrorMessage = "(%s): Error ID %s";
        context.uniqueId1 = random.uniqueId();
        context.uniqueId2 = random.uniqueId();
        context.debugParams = { myDebugParam: random.uniqueId() };
        context.setValue1 = random.uniqueId();
        context.setValue2 = random.uniqueId();

        context.entryPointObject = context.sut.shouldBeDefined(context.out.foo.undefinedValue, context.customErrorMessage, [context.uniqueId1, context.uniqueId2])
          .debug(context.debugParams)
          .set("setKey1", context.setValue1)
          .set("setKey2", context.setValue2);
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = `(${context.uniqueId1}): Error ID ${context.uniqueId2}`;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldBeTruthy({ value: err.stack.split(context.debugParams.myDebugParam).length === 2 });
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
          Maddox.compare.shouldEqual({ expected: err.setKey2, actual: context.setValue2 });
        });
    });

    it("it should fail with immutable values from setAll.", function () {
      context.setupEntryPoint = function () {
        context.customErrorMessage = "(%s): Error ID %s";
        context.uniqueId1 = random.uniqueId();
        context.uniqueId2 = random.uniqueId();
        context.debugParams = { myDebugParam: random.uniqueId() };
        context.setValue1 = random.uniqueId();
        context.setValue2 = random.uniqueId();

        context.entryPointObject = context.sut.shouldBeDefined(context.out.foo.undefinedValue, context.customErrorMessage, [context.uniqueId1, context.uniqueId2])
          .debug(context.debugParams)
          .setAll({ setKey1: context.setValue1, setKey2: context.setValue2 });
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = `(${context.uniqueId1}): Error ID ${context.uniqueId2}`;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ value: err.stack.split(context.debugParams.myDebugParam).length === 2 });
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
          Maddox.compare.shouldEqual({ expected: err.setKey1, actual: context.setValue1 });
          Maddox.compare.shouldEqual({ expected: err.setKey2, actual: context.setValue2 });
        });
    });

    it("it should fail with immutable values from setAll and set.", function () {
      context.setupEntryPoint = function () {
        context.customErrorMessage = "(%s): Error ID %s";
        context.uniqueId1 = random.uniqueId();
        context.uniqueId2 = random.uniqueId();
        context.debugParams = { myDebugParam: random.uniqueId() };
        context.setValue1 = random.uniqueId();
        context.setValue2 = random.uniqueId();
        context.setValue3 = random.uniqueId();
        context.setValue4 = random.uniqueId();

        context.entryPointObject = context.sut.shouldBeDefined(context.out.foo.undefinedValue,
          context.customErrorMessage,
          [context.uniqueId1, context.uniqueId2])
          .debug(context.debugParams)
          .set("setKey1", context.setValue1)
          .setAll({ setKey1: context.setValue3, setKey2: context.setValue4 })
          .set("setKey2", context.setValue2);
      };
      context.setupErrorMessages = function () {
        context.expectedErrorMessage = `(${context.uniqueId1}): Error ID ${context.uniqueId2}`;
      };

      context.setupTest();
      context.setupEntryPoint();
      context.setupErrorMessages();

      new Scenario()
        .withEntryPoint(context.entryPointObject, "test")
        .withInputParams(context.inputParams)
        .test(function (err) {
          Maddox.compare.shouldEqual({ value: err.stack.split(context.debugParams.myDebugParam).length === 2 });
          Maddox.compare.shouldEqual({ expected: err.message, actual: context.expectedErrorMessage });
          Maddox.compare.shouldEqual({ expected: err.setKey1, actual: context.setValue1 });
          Maddox.compare.shouldEqual({ expected: err.setKey2, actual: context.setValue4 });
        });
    });
  });
});
