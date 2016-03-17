"use strict";

const Preconditions = require("./../../lib/preconditions"),
  constants = require("./../../lib/constants");

const Maddox = require("maddox"),
  chai = require("chai");

const expect = chai.expect,
  Scenario = Maddox.functional.FromSynchronousScenario;

describe("preconditions - when using singleton instance", function () {
  let errorContext;

  beforeEach(function () {
    errorContext = {};

    errorContext.setupTest = function () {
      errorContext.out = {
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
      errorContext.customErrorMessage = "There was an error.";
      errorContext.sut = Preconditions.singleton();
      errorContext.entryPointObject = errorContext.sut;
    };
  });

  describe("shouldBeDefined", function () {
    it("should fail when passing in an undefined value", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldBeDefined).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.badValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldBeDefined")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("should fail when passing in a deep undefined value", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldBeDefined).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.badValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldBeDefined")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("should return my custom error message", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(errorContext.customErrorMessage).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.badValue, errorContext.customErrorMessage];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldBeDefined")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("should pass when passing in a defined value", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(errorContext.customErrorMessage).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldBeDefined")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });
  describe("shouldBeUndefined", function () {
    it("should fail when value is defined", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldBeUndefined).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.stringValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldBeUndefined")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("should pass when value is undefined", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldBeUndefined).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.undefinedValue, this.customErrorMessage];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldBeUndefined")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });

  describe("shouldBeArray", function () {
    it("should fail when value is NOT array", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldBeArray).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.stringValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldBeArray")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("should pass when value is array", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldBeArray).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.emptyArray];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldBeArray")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });
  describe("shouldNotBeArray", function () {
    it("should fail when value is array", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldNotBeArray).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.emptyArray];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldNotBeArray")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("should pass when value is NOT array", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldNotBeArray).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.stringValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldNotBeArray")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });

  describe("shouldBeEmpty", function () {
    it("should fail when value is NOT empty", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldBeEmpty).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.nonEmptyArray];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldBeEmpty")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("should pass when value is empty", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldBeEmpty).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.emptyArray];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldBeEmpty")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });
  describe("shouldNotBeEmpty", function () {
    it("should fail when value is empty", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldNotBeEmpty).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.emptyArray];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldNotBeEmpty")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("should pass when value is NOT empty", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldBeEmpty).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.nonEmptyArray];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldNotBeEmpty")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });

  describe("shouldBeObject", function () {
    it("should fail when value is NOT an Object", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldBeObject).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.stringValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldBeObject")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("should pass when value is an Object", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldBeObject).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldBeObject")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });
  describe("shouldNotBeObject", function () {
    it("should fail when value is an Object", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldNotBeObject).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldNotBeObject")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("should pass when value is NOT an Object", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldNotBeObject).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.stringValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldNotBeObject")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });

  describe("shouldBeFunction", function () {
    it("should fail when value is NOT a Function", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldBeFunction).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.numberValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldBeFunction")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("should pass when value is a Function", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldBeFunction).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.functionValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldBeFunction")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });
  describe("shouldNotBeFunction", function () {
    it("should fail when value is a Function", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldNotBeFunction).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.functionValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldNotBeFunction")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("should pass when value is NOT a Function", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldNotBeFunction).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.numberValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldNotBeFunction")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });

  describe("shouldBeString", function () {
    it("should fail when value is NOT a String", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldBeString).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.numberValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldBeString")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("should pass when value is a String", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldBeString).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.stringValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldBeString")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });
  describe("shouldNotBeString", function () {
    it("should fail when value is a String", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldNotBeString).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.stringValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldNotBeString")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("should pass when value is NOT a String", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldNotBeString).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.numberValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldNotBeString")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });

  describe("shouldBeNumber", function () {
    it("should fail when value is NOT a Number", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldBeNumber).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.stringValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldBeNumber")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("should pass when value is a Number", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldBeNumber).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.numberValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldBeNumber")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });
  describe("shouldNotBeNumber", function () {
    it("should fail when value is a Number", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldNotBeNumber).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.numberValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldNotBeNumber")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("should pass when value is NOT a Number", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldNotBeNumber).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.stringValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldNotBeNumber")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });

  describe("shouldBeFinite", function () {
    it("should fail when value is NOT Finite", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldBeFinite).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.infiniteValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldBeFinite")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("should pass when value is Finite", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldBeFinite).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.finiteValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldBeFinite")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });
  describe("shouldBeInfinite", function () {
    it("should fail when value is NOT Infinite", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldBeInfinite).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.finiteValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldBeInfinite")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("should pass when value is Infinite", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldBeInfinite).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.infiniteValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldBeInfinite")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });

  describe("shouldBeBoolean", function () {
    it("should fail when value is NOT a Boolean", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldBeBoolean).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.stringValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldBeBoolean")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("should pass when value is a Boolean", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldBeBoolean).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.falseValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldBeBoolean")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });
  describe("shouldNotBeBoolean", function () {
    it("should fail when value is a Boolean", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldNotBeBoolean).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.falseValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldNotBeBoolean")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("should pass when value is NOT a Boolean", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldNotBeBoolean).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.stringValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldNotBeBoolean")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });

  describe("shouldBeDate", function () {
    it("should fail when value is NOT a Date", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldBeDate).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.stringValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldBeDate")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("should pass when value is a Date", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldBeDate).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.dateValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldBeDate")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });
  describe("shouldNotBeDate", function () {
    it("should fail when value is a Date", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldNotBeDate).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.dateValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldNotBeDate")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("should pass when value is NOT a Date", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldNotBeDate).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.stringValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldNotBeDate")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });

  describe("shouldBeRegExp", function () {
    it("should fail when value is NOT a Regular Expression", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldBeRegExp).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.stringValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldBeRegExp")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("should pass when value is a Regular Expression", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldBeRegExp).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.regExpValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldBeRegExp")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });
  describe("shouldNotBeRegExp", function () {
    it("should fail when value is a Regular Expression", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldNotBeRegExp).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.regExpValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldNotBeRegExp")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("should pass when value is NOT a Regular Expression", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldNotBeRegExp).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.stringValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldNotBeRegExp")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });

  describe("shouldBeFalsey", function () {
    it("should fail when value is NOT falsey", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldBeFalsey).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.stringValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldBeFalsey")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("should pass when value is undefined", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldBeFalsey).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.undefinedValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldBeFalsey")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
    it("should pass when value is Nan", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldBeFalsey).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.NanValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldBeFalsey")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
    it("should pass when value is null", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldBeFalsey).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.nullValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldBeFalsey")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });
  describe("shouldNotBeFalsey", function () {
    it("should fail when value is undefined", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldNotBeFalsey).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.undefinedValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldNotBeFalsey")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });
    it("should fail when value is Nan", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldNotBeFalsey).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.NanValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldNotBeFalsey")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });
    it("should fail when value is null", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldNotBeFalsey).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.nullValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldNotBeFalsey")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("should pass when value is NOT falsey", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldNotBeFalsey).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.stringValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldNotBeFalsey")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });

  describe("shouldBeFalsy", function () {
    it("should fail when value is NOT falsy", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldBeFalsey).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.stringValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldBeFalsy")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("should pass when value is undefined", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldBeFalsey).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.undefinedValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldBeFalsy")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
    it("should pass when value is Nan", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldBeFalsey).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.NanValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldBeFalsy")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
    it("should pass when value is null", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldBeFalsey).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.nullValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldBeFalsy")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });
  describe("shouldNotBeFalsy", function () {
    it("should fail when value is undefined", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldNotBeFalsey).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.undefinedValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldNotBeFalsy")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });
    it("should fail when value is Nan", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldNotBeFalsey).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.NanValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldNotBeFalsy")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });
    it("should fail when value is null", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldNotBeFalsey).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.nullValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldNotBeFalsy")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("should pass when value is NOT falsy", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldNotBeFalsey).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.stringValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldNotBeFalsy")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });

  describe("shouldBeTruthy", function () {
    it("should fail when value is undefined", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldNotBeFalsey).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.undefinedValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldBeTruthy")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });
    it("should fail when value is Nan", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldNotBeFalsey).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.NanValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldBeTruthy")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });
    it("should fail when value is null", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldNotBeFalsey).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.nullValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldBeTruthy")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("should pass when value is truthy", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldNotBeFalsey).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.stringValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldBeTruthy")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });
  describe("shouldNotBeTruthy", function () {
    it("should fail when value is truthy", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldBeFalsey).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.stringValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldNotBeTruthy")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("should pass when value is undefined", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldBeFalsey).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.undefinedValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldNotBeTruthy")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
    it("should pass when value is Nan", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldBeFalsey).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.NanValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldNotBeTruthy")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
    it("should pass when value is null", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldBeFalsey).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.nullValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldNotBeTruthy")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });

  describe("checkArgument", function () {
    it("should fail when value is false (i.e. is an illegal argument)", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.IllegalArgument).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [false];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "checkArgument")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("should pass when value is true", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.IllegalArgument).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [true];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "checkArgument")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });

  describe("checkState", function () {
    it("should fail when value is false (i.e. is an illegal argument)", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.IllegalState).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [false];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "checkState")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("should pass when value is true", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.IllegalState).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [true];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "checkState")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });

  describe("checkElementIndex", function () {
    it("should fail when index is less than 0", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldHaveValidIndex).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [-4, 10];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "checkElementIndex")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });
    it("should fail when index is greater than size", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldHaveValidIndex).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [12, 10];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "checkElementIndex")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });
    it("should fail when index is equal to size", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldHaveValidIndex).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [10, 10];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "checkElementIndex")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("should pass when value is greater than zero and less than size", function () {
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [8, 10];
      };

      errorContext.setupTest();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "checkElementIndex")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
    it("should pass when value is equal to zero", function () {
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [0, 10];
      };

      errorContext.setupTest();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "checkElementIndex")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });

  describe("checkPositionIndex", function () {
    it("should fail when index is less than 0", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldHaveValidPosition).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [-4, 10];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "checkPositionIndex")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });
    it("should fail when index is greater than size", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldHaveValidPosition).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [12, 10];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "checkPositionIndex")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    it("should pass when value is greater than zero and less than size", function () {
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [8, 10];
      };

      errorContext.setupTest();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "checkPositionIndex")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
    it("should pass when value is equal to zero", function () {
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [0, 10];
      };

      errorContext.setupTest();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "checkPositionIndex")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
    it("should pass when value is equal to size", function () {
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [10, 10];
      };

      errorContext.setupTest();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "checkPositionIndex")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });
  });

  describe("checkPositionIndexes", function () {
    it("should fail when start is less than 0", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldHaveValidPositions).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [-4, 10, 12];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "checkPositionIndexes")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });
    it("should fail when end is less than start", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldHaveValidPositions).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [5, 3, 12];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "checkPositionIndexes")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });
    it("should fail when end is greater than size", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldHaveValidPositions).message;
      };
      errorContext.setupInputParams = function () {
        errorContext.inputParams = [3, 13, 12];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "checkPositionIndexes")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });

    describe("start is greater than 0", function () {
      it("should pass when end is less than size and greater than start", function () {
        errorContext.setupInputParams = function () {
          errorContext.inputParams = [2, 10, 12];
        };

        errorContext.setupTest();
        errorContext.setupInputParams();

        new Scenario()
          .withEntryPoint(errorContext.entryPointObject, "checkPositionIndexes")
          .withInputParams(errorContext.inputParams)
          .test(function (err) {
            expect(err).to.be.undefined; // eslint-disable-line
          });
      });
      it("should pass when end is equal to size and greater than start", function () {
        errorContext.setupInputParams = function () {
          errorContext.inputParams = [2, 12, 12];
        };

        errorContext.setupTest();
        errorContext.setupInputParams();

        new Scenario()
          .withEntryPoint(errorContext.entryPointObject, "checkPositionIndexes")
          .withInputParams(errorContext.inputParams)
          .test(function (err) {
            expect(err).to.be.undefined; // eslint-disable-line
          });
      });
    });
    describe("start is equal 0", function () {
      it("should pass when end is less than size and greater than start", function () {
        errorContext.setupInputParams = function () {
          errorContext.inputParams = [0, 10, 12];
        };

        errorContext.setupTest();
        errorContext.setupInputParams();

        new Scenario()
          .withEntryPoint(errorContext.entryPointObject, "checkPositionIndexes")
          .withInputParams(errorContext.inputParams)
          .test(function (err) {
            expect(err).to.be.undefined; // eslint-disable-line
          });
      });
      it("should pass when end is equal to size and greater than start", function () {
        errorContext.setupInputParams = function () {
          errorContext.inputParams = [0, 12, 12];
        };

        errorContext.setupTest();
        errorContext.setupInputParams();

        new Scenario()
          .withEntryPoint(errorContext.entryPointObject, "checkPositionIndexes")
          .withInputParams(errorContext.inputParams)
          .test(function (err) {
            expect(err).to.be.undefined; // eslint-disable-line
          });
      });
    });
  });

  describe("when chaining commands", function () {

    it("should work using chaining commands for success", function () {
      errorContext.setupChain = function () {
        let stringValue = errorContext.out.foo.deep.stringValue;
        let numberValue = errorContext.out.foo.deep.numberValue;

        errorContext.entryPointObject = errorContext.sut.shouldNotBeFalsey(stringValue)
          .shouldBeDefined(stringValue)
          .shouldBeString(stringValue)
          .shouldNotBeFalsey(numberValue)
          .shouldBeDefined(numberValue);
      };

      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.numberValue];
      };

      errorContext.setupTest();
      errorContext.setupInputParams();
      errorContext.setupChain();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldBeNumber")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err).to.be.undefined; // eslint-disable-line
        });
    });

    it("should work using chaining commands when fail at end of chain", function () {
      errorContext.setupErrorMessages = function () {
        errorContext.expectedErrorMessage = new Error(constants.ShouldBeNumber).message;
      };
      errorContext.setupChain = function () {
        let stringValue = errorContext.out.foo.deep.stringValue;
        let numberValue = errorContext.out.foo.deep.numberValue;

        errorContext.entryPointObject = errorContext.sut.shouldNotBeFalsey(stringValue)
          .shouldBeDefined(stringValue)
          .shouldBeString(stringValue)
          .shouldNotBeFalsey(numberValue)
          .shouldBeDefined(numberValue);
      };

      errorContext.setupInputParams = function () {
        errorContext.inputParams = [errorContext.out.foo.deep.stringValue];
      };

      errorContext.setupTest();
      errorContext.setupErrorMessages();
      errorContext.setupInputParams();
      errorContext.setupChain();

      new Scenario()
        .withEntryPoint(errorContext.entryPointObject, "shouldBeNumber")
        .withInputParams(errorContext.inputParams)
        .test(function (err) {
          expect(err.message).eql(errorContext.expectedErrorMessage);
        });
    });
  });
});
