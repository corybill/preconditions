"use strict";

const Preconditions = require("../../lib/preconditions"),
  constants = require("../../lib/constants"),
  random = require("../random");

const Maddox = require("maddox"),
  chai = require("chai");

const expect = chai.expect,
  Scenario = Maddox.functional.FromSynchronousScenario;

describe("preconditions - when using the errr builder", function () {
  let errorContext;

  beforeEach(function () {
    errorContext = {};

    errorContext.setupTest = function () {
      errorContext.out = {
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
      errorContext.inputParams = [];
      errorContext.customErrorMessage = "There was an error.";
      errorContext.sut = Preconditions.errr();
    };
  });

  describe("shouldBeDefined", function () {
    it("it should fail when value is not defined.", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldBeDefined(errorContext.out.foo.undefinedValue);
      };
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = constants.ShouldBeDefined;
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();
      errorContext.setupErrorMessages();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("it should fail when deeply nested value is not defined.", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldBeDefined(errorContext.out.foo.deep.undefinedValue);
      };
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = constants.ShouldBeDefined;
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();
      errorContext.setupErrorMessages();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("it should fail when value is not defined and return a custom error message.", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldBeDefined(errorContext.out.foo.undefinedValue, errorContext.customErrorMessage);
      };
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = errorContext.customErrorMessage;
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();
      errorContext.setupErrorMessages();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("it should fail with custom error message using template params.", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.customErrorMessage = "(%s): Error ID %s";
        errorContext.uniqueId1 = random.uniqueId();
        errorContext.uniqueId2 = random.uniqueId();
        errorContext.entryPointObject = errorContext.sut.shouldBeDefined(errorContext.out.foo.undefinedValue, errorContext.customErrorMessage, [errorContext.uniqueId1, errorContext.uniqueId2]);
      };
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = `(${errorContext.uniqueId1}): Error ID ${errorContext.uniqueId2}`;
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();
      errorContext.setupErrorMessages();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("it should pass when value is defined.", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldBeDefined(errorContext.out.foo.deep.stringValue);
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });
  describe("shouldBeUndefined", function () {
    it("it should fail when value is defined", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldBeUndefined(errorContext.out.foo);
      };
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = constants.ShouldBeUndefined;
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();
      errorContext.setupErrorMessages();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("it should pass when value is undefined", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldBeUndefined(errorContext.out.foo.undefinedValue);
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });

  describe("shouldBeArray", function () {
    it("it should fail when value is NOT array", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldBeArray(errorContext.out.foo.deep.undefinedValue);
      };
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = constants.ShouldBeArray;
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();
      errorContext.setupErrorMessages();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("it should pass when value is array", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldBeArray(errorContext.out.foo.deep.nonEmptyArray);
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });
  describe("shouldNotBeArray", function () {
    it("it should fail when value is array", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldNotBeArray(errorContext.out.foo.deep.nonEmptyArray);
      };
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = constants.ShouldNotBeArray;
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();
      errorContext.setupErrorMessages();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("it should pass when value is NOT array", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldNotBeArray(errorContext.out.foo.stringValue);
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });

  describe("shouldBeEmpty", function () {
    it("it should fail when value is NOT empty", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldBeEmpty(errorContext.out.foo.deep.nonEmptyArray);
      };
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = constants.ShouldBeEmpty;
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();
      errorContext.setupErrorMessages();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("it should pass when value is empty", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldBeEmpty(errorContext.out.foo.deep.emptyArray);
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });
  describe("shouldNotBeEmpty", function () {
    it("it should fail when value is empty", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldNotBeEmpty(errorContext.out.foo.deep.emptyArray);
      };
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = constants.ShouldNotBeEmpty;
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();
      errorContext.setupErrorMessages();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("it should pass when value is NOT empty", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldNotBeEmpty(errorContext.out.foo.deep.nonEmptyArray);
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });

  describe("shouldBeObject", function () {
    it("it should fail when value is NOT an Object", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldBeObject(errorContext.out.foo.deep.stringValue);
      };
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = constants.ShouldBeObject;
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();
      errorContext.setupErrorMessages();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("it should pass when value is an Object", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldBeObject(errorContext.out.foo.deep);
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });
  describe("shouldNotBeObject", function () {
    it("it should fail when value is an Object", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldNotBeObject(errorContext.out.foo.deep);
      };
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = constants.ShouldNotBeObject;
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();
      errorContext.setupErrorMessages();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("it should pass when value is NOT an Object", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldNotBeObject(errorContext.out.foo.deep.stringValue);
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });

  describe("shouldBeFunction", function () {
    it("it should fail when value is NOT a Function", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldBeFunction(errorContext.out.foo.deep.stringValue);
      };
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = constants.ShouldBeFunction;
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();
      errorContext.setupErrorMessages();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("it should pass when value is a Function", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldBeFunction(errorContext.out.foo.deep.functionValue);
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });
  describe("shouldNotBeFunction", function () {
    it("it should fail when value is a Function", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldNotBeFunction(errorContext.out.foo.deep.functionValue);
      };
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = constants.ShouldNotBeFunction;
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();
      errorContext.setupErrorMessages();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("it should pass when value is NOT a Function", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldNotBeFunction(errorContext.out.foo.undefinedValue);
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });

  describe("shouldBeString", function () {
    it("it should fail when value is NOT a String", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldBeString(errorContext.out.foo.deep.numberValue);
      };
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = constants.ShouldBeString;
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();
      errorContext.setupErrorMessages();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("it should pass when value is a String", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldBeString(errorContext.out.foo.deep.stringValue);
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });
  describe("shouldNotBeString", function () {
    it("it should fail when value is a String", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldNotBeString(errorContext.out.foo.deep.stringValue);
      };
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = constants.ShouldNotBeString;
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();
      errorContext.setupErrorMessages();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("it should pass when value is NOT a String", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldNotBeString(errorContext.out.foo.deep.undefinedValue);
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });

  describe("shouldBeNumber", function () {
    it("it should fail when value is NOT a Number", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldBeNumber(errorContext.out.foo.deep.stringValue);
      };
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = constants.ShouldBeNumber;
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();
      errorContext.setupErrorMessages();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("it should pass when value is a Number", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldBeNumber(errorContext.out.foo.deep.numberValue);
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });
  describe("shouldNotBeNumber", function () {
    it("it should fail when value is a Number", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldNotBeNumber(errorContext.out.foo.deep.numberValue);
      };
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = constants.ShouldNotBeNumber;
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();
      errorContext.setupErrorMessages();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("it should pass when value is NOT a Number", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldNotBeNumber(errorContext.out.foo.deep.stringValue);
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });

  describe("shouldBeFinite", function () {
    it("it should fail when value is NOT Finite", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldBeFinite(errorContext.out.foo.deep.infiniteValue);
      };
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = constants.ShouldBeFinite;
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();
      errorContext.setupErrorMessages();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("it should pass when value is Finite", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldBeFinite(errorContext.out.foo.deep.finiteValue);
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });
  describe("shouldBeInfinite", function () {
    it("it should fail when value is NOT Infinite", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldBeInfinite(errorContext.out.foo.deep.finiteValue);
      };
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = constants.ShouldBeInfinite;
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();
      errorContext.setupErrorMessages();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("it should pass when value is Infinite", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldBeInfinite(errorContext.out.foo.deep.infiniteValue);
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });

  describe("shouldBeBoolean", function () {
    it("it should fail when value is NOT a Boolean", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldBeBoolean(errorContext.out.foo.deep.numberValue);
      };
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = constants.ShouldBeBoolean;
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();
      errorContext.setupErrorMessages();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("it should pass when value is a Boolean", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldBeBoolean(errorContext.out.foo.deep.trueValue);
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });
  describe("shouldNotBeBoolean", function () {
    it("it should fail when value is a Boolean", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldNotBeBoolean(errorContext.out.foo.deep.trueValue);
      };
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = constants.ShouldNotBeBoolean;
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();
      errorContext.setupErrorMessages();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("it should pass when value is NOT a Boolean", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldNotBeBoolean(errorContext.out.foo.deep.numberValue);
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });

  describe("shouldBeDate", function () {
    it("it should fail when value is NOT a Date", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldBeDate(errorContext.out.foo.deep.numberValue);
      };
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = constants.ShouldBeDate;
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();
      errorContext.setupErrorMessages();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("it should pass when value is a Date", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldBeDate(errorContext.out.foo.deep.dateValue);
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });
  describe("shouldNotBeDate", function () {
    it("it should fail when value is a Date", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldNotBeDate(errorContext.out.foo.deep.dateValue);
      };
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = constants.ShouldNotBeDate;
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();
      errorContext.setupErrorMessages();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("it should pass when value is NOT a Date", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldNotBeDate(errorContext.out.foo.deep.numberValue);
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });

  describe("shouldBeRegExp", function () {
    it("it should fail when value is NOT a Regular Expression", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldBeRegExp(errorContext.out.foo.deep.numberValue);
      };
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = constants.ShouldBeRegExp;
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();
      errorContext.setupErrorMessages();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("it should pass when value is a Regular Expression", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldBeRegExp(errorContext.out.foo.deep.regExpValue);
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });
  describe("shouldNotBeRegExp", function () {
    it("it should fail when value is a Regular Expression", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldNotBeRegExp(errorContext.out.foo.deep.regExpValue);
      };
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = constants.ShouldNotBeRegExp;
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();
      errorContext.setupErrorMessages();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("it should pass when value is NOT a Regular Expression", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldNotBeRegExp(errorContext.out.foo.deep.numberValue);
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });

  describe("shouldBeFalsey", function () {
    it("it should fail when value is NOT falsey", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldBeFalsey(errorContext.out.foo.deep.trueValue);
      };
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = constants.ShouldBeFalsey;
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();
      errorContext.setupErrorMessages();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("it should pass when value is undefined", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldBeFalsey(errorContext.out.foo.deep.undefinedValue);
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
    it("it should pass when value is Nan", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldBeFalsey(errorContext.out.foo.deep.NaNValue);
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
    it("it should pass when value is null", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldBeFalsey(errorContext.out.foo.deep.nullValue);
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });
  describe("shouldBeFalsy", function () {
    it("it should fail when value is NOT falsey", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldBeFalsy(errorContext.out.foo.deep.trueValue);
      };
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = constants.ShouldBeFalsey;
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();
      errorContext.setupErrorMessages();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("it should pass when value is undefined", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldBeFalsy(errorContext.out.foo.deep.undefinedValue);
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
    it("it should pass when value is Nan", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldBeFalsy(errorContext.out.foo.deep.NaNValue);
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
    it("it should pass when value is null", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldBeFalsy(errorContext.out.foo.deep.nullValue);
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });

  describe("shouldNotBeFalsey", function () {
    it("it should fail when value is undefined", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldNotBeFalsey(errorContext.out.foo.deep.undefinedValue);
      };
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = constants.ShouldNotBeFalsey;
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();
      errorContext.setupErrorMessages();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });
    it("it should fail when value is Nan", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldNotBeFalsey(errorContext.out.foo.deep.NaNValue);
      };
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = constants.ShouldNotBeFalsey;
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();
      errorContext.setupErrorMessages();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });
    it("it should fail when value is null", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldNotBeFalsey(errorContext.out.foo.deep.nullValue);
      };
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = constants.ShouldNotBeFalsey;
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();
      errorContext.setupErrorMessages();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("it should pass when value is NOT falsey", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldNotBeFalsey(errorContext.out.foo.deep.trueValue);
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });
  describe("shouldNotBeFalsy", function () {
    it("it should fail when value is undefined", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldNotBeFalsy(errorContext.out.foo.deep.undefinedVallue);
      };
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = constants.ShouldNotBeFalsey;
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();
      errorContext.setupErrorMessages();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });
    it("it should fail when value is Nan", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldNotBeFalsy(errorContext.out.foo.deep.NaNValue);
      };
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = constants.ShouldNotBeFalsey;
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();
      errorContext.setupErrorMessages();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });
    it("it should fail when value is null", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldNotBeFalsy(errorContext.out.foo.deep.nullValue);
      };
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = constants.ShouldNotBeFalsey;
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();
      errorContext.setupErrorMessages();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("it should pass when value is NOT falsey", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldNotBeFalsy(errorContext.out.foo.deep.trueValue);
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });

  describe("shouldBeTruthy", function () {
    it("it should fail when value is undefined", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldBeTruthy(errorContext.out.foo.deep.undefinedValue);
      };
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = constants.ShouldNotBeFalsey;
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();
      errorContext.setupErrorMessages();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });
    it("it should fail when value is Nan", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldBeTruthy(errorContext.out.foo.deep.NaNValue);
      };
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = constants.ShouldNotBeFalsey;
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();
      errorContext.setupErrorMessages();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });
    it("it should fail when value is null", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldBeTruthy(errorContext.out.foo.deep.nullValue);
      };
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = constants.ShouldNotBeFalsey;
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();
      errorContext.setupErrorMessages();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("it should pass when value is truthy", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldBeTruthy(errorContext.out.foo.deep.trueValue);
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });
  describe("shouldNotBeTruthy", function () {
    it("it should fail when value is truthy", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldNotBeTruthy(errorContext.out.foo.deep.trueValue);
      };
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = constants.ShouldBeFalsey;
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();
      errorContext.setupErrorMessages();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("it should pass when value is undefined", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldNotBeTruthy(errorContext.out.foo.deep.undefinedValue);
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
    it("it should pass when value is Nan", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldNotBeTruthy(errorContext.out.foo.deep.NaNValue);
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
    it("it should pass when value is null", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.shouldNotBeTruthy(errorContext.out.foo.deep.nullValue);
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });

  describe("checkArgument", function () {
    it("it should fail when value is false (i.e. is an illegal argument)", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.checkArgument(errorContext.out.foo.deep.falseValue);
      };
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = constants.IllegalArgument;
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();
      errorContext.setupErrorMessages();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("it should pass when value is true", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.checkArgument(errorContext.out.foo.deep.trueValue);
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });

  describe("checkState", function () {
    it("it should fail when value is false (i.e. is an illegal argument)", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.checkState(errorContext.out.foo.deep.falseValue);
      };
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = constants.IllegalState;
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();
      errorContext.setupErrorMessages();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("it should pass when value is true", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.checkState(errorContext.out.foo.deep.trueValue);
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });

  describe("checkElementIndex", function () {
    it("it should fail when index is less than 0", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.checkElementIndex(-4, 5);
      };
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = constants.ShouldHaveValidIndex;
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();
      errorContext.setupErrorMessages();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });
    it("it should fail when index is greater than size", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.checkElementIndex(6, 5);
      };
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = constants.ShouldHaveValidIndex;
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();
      errorContext.setupErrorMessages();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });
    it("it should fail when index is equal to size", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.checkElementIndex(5, 5);
      };
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = constants.ShouldHaveValidIndex;
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();
      errorContext.setupErrorMessages();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("it should pass when value is greater than zero and less than size", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.checkElementIndex(4, 5);
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
    it("it should pass when value is equal to zero", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.checkElementIndex(0, 10);
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });

  describe("checkPositionIndex", function () {
    it("it should fail when index is less than 0", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.checkPositionIndex(-4, 10);
      };
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = constants.ShouldHaveValidPosition;
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();
      errorContext.setupErrorMessages();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });
    it("it should fail when index is greater than size", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.checkPositionIndex(12, 10);
      };
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = constants.ShouldHaveValidPosition;
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();
      errorContext.setupErrorMessages();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("it should pass when value is greater than zero and less than size", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.checkPositionIndex(8, 10);
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
    it("it should pass when value is equal to zero", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.checkPositionIndex(0, 10);
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
    it("it should pass when value is equal to size", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.checkPositionIndex(10, 10);
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });

  describe("checkPositionIndexes", function () {
    it("it should fail when start is less than 0", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.checkPositionIndexes(-4, 10, 12);
      };
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = constants.ShouldHaveValidPositions;
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();
      errorContext.setupErrorMessages();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });
    it("it should fail when end is less than start", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.checkPositionIndexes(5, 3, 12);
      };
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = constants.ShouldHaveValidPositions;
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();
      errorContext.setupErrorMessages();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });
    it("it should fail when end is greater than size", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.entryPointObject = errorContext.sut.checkPositionIndexes(3, 13, 12);
      };
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = constants.ShouldHaveValidPositions;
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();
      errorContext.setupErrorMessages();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    describe("start is greater than 0", function () {
      it("it should pass when end is less than size and greater than start", function () {
        errorContext.setupEntryPoint = function () {
          errorContext.entryPointObject = errorContext.sut.checkPositionIndexes(2, 10, 12);
        };

        errorContext.setupTest();
        errorContext.setupEntryPoint();

        new Scenario()
          .withEntryPoint(errorContext.entryPointObject, "test")
          .withInputParams(errorContext.inputParams)
          .test(function (err) {
            expect(err).to.be.undefined; // eslint-disable-line
          });
      });
      it("it should pass when end is equal to size and greater than start", function () {
        errorContext.setupEntryPoint = function () {
          errorContext.entryPointObject = errorContext.sut.checkPositionIndexes(2, 12, 12);
        };

        errorContext.setupTest();
        errorContext.setupEntryPoint();

        new Scenario()
          .withEntryPoint(errorContext.entryPointObject, "test")
          .withInputParams(errorContext.inputParams)
          .test(function (err) {
            expect(err).to.be.undefined; // eslint-disable-line
          });
      });
    });
    describe("start is equal 0", function () {
      it("it should pass when end is less than size and greater than start", function () {
        errorContext.setupEntryPoint = function () {
          errorContext.entryPointObject = errorContext.sut.checkPositionIndexes(0, 10, 12);
        };

        errorContext.setupTest();
        errorContext.setupEntryPoint();

        new Scenario()
          .withEntryPoint(errorContext.entryPointObject, "test")
          .withInputParams(errorContext.inputParams)
          .test(function (err) {
            expect(err).to.be.undefined; // eslint-disable-line
          });
      });
      it("it should pass when end is equal to size and greater than start", function () {
        errorContext.setupEntryPoint = function () {
          errorContext.entryPointObject = errorContext.sut.checkPositionIndexes(0, 12, 12);
        };

        errorContext.setupTest();
        errorContext.setupEntryPoint();

        new Scenario()
          .withEntryPoint(errorContext.entryPointObject, "test")
          .withInputParams(errorContext.inputParams)
          .test(function (err) {
            expect(err).to.be.undefined; // eslint-disable-line
          });
      });
    });
  });

  describe("and adding builder functions", function () {
    it("it should fail with debug params.", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.customErrorMessage = "(%s): Error ID %s";
        errorContext.uniqueId1 = random.uniqueId();
        errorContext.uniqueId2 = random.uniqueId();
        errorContext.debugParams = {myDebugParam: random.uniqueId()};
        errorContext.entryPointObject = errorContext.sut.shouldBeDefined(errorContext.out.foo.undefinedValue,
          errorContext.customErrorMessage,
          [errorContext.uniqueId1, errorContext.uniqueId2]).debug(errorContext.debugParams);
      };
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = `(${errorContext.uniqueId1}): Error ID ${errorContext.uniqueId2}`;
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();
      errorContext.setupErrorMessages();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.stack.split(errorContext.debugParams.myDebugParam).length).eql(2);
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });
    it("it should fail with appending to existing error.", function () {
      errorContext.setupEntryPoint = function () {
        errorContext.appendToError = new Error(random.uniqueId());
        errorContext.customErrorMessage = "(%s): Error ID %s";
        errorContext.uniqueId1 = random.uniqueId();
        errorContext.uniqueId2 = random.uniqueId();
        errorContext.debugParams = {myDebugParam: random.uniqueId()};
        errorContext.entryPointObject = errorContext.sut.shouldBeDefined(errorContext.out.foo.undefinedValue,
          errorContext.customErrorMessage,
          [errorContext.uniqueId1, errorContext.uniqueId2])
          .debug(errorContext.debugParams)
          .appendTo(errorContext.appendToError);
      };
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = `(${errorContext.uniqueId1}): Error ID ${errorContext.uniqueId2}`;
      };

      errorContext.setupTest();
      errorContext.setupEntryPoint();
      errorContext.setupErrorMessages();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "test")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.stack.split(errorContext.debugParams.myDebugParam).length).eql(2);
          expect(err.stack.split(errorContext.appendToError.message).length).eql(2);
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });
  });
});
