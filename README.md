# Preconditions Library

[![view on npm](http://img.shields.io/npm/v/preconditions.svg)](https://www.npmjs.org/package/preconditions)
[![npm module downloads](http://img.shields.io/npm/dt/preconditions.svg)](https://www.npmjs.org/package/preconditions)
[![Build Status](https://travis-ci.org/corybill/preconditions.svg?branch=master)](https://travis-ci.org/corybill/preconditions)
[![Gitter](https://badges.gitter.im/corybill/preconditions.svg)](https://gitter.im/corybill/preconditions?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

#### Support for Guava like Precondition error checking in Node.js

<p>Ensuring a fail fast development environment can help developers find bugs quicker and easier.
Ensuring all invariants are true at an initial point of contact will help you ensure this fail fast environment.
The Preconditions library will assist you in doing just that by immediately throwing an Error
if any of your invariants fail.  You can mix and match standard Guava API with convenience functions both with
and without chaining.</p>

#### Version 2 Additions
<p>Version 2 adds a new entry point on the interface, 'errr'.  The errr interface decorates the errr node module
and helps to solve some important issues with Node, listed below. See https://www.npmjs.com/package/errr.</p>

1. When templating / generating an error message, we must not string concat strings that are never used.  Building an error message before it is needed, will take away cycles from more important tasks in the event queue.  There are great performance gains to be found here if you are templating error messages.
2. Appends Error stack traces together.  If you append errors at each layer of your code, and only print the stack trace at the top most layer of your code, you will have stack traces that paint a much clearer picture when debugging.  Allows you to get a more informative stack trace when using promise chains.
3. Add debug params to stack traces to assist with bug resolution.

### Install
<pre>npm install preconditions</pre>

### Preconditions Interface
There are three functions that are exposed from the library.
1. errr() - Verify a one value at a time while building an 'errr' object.  You can append errors together and add debug params to the stack trace. 
2. singleton() - Verify one value at a time with a chainable preconditions interface.
3. instance() - Create a testing suite passing in a single object.  Run a single, or multiple tests on the passed in object. Shouldn't be used in production code.
4. constructor() - Get the constructor function so you can extend the Preconditions library (see below for example). Shouldn't be used in production code.

### Examples Using the Errr Interface (.errr())

You can use a static instance to verify one value at a time and use the errr module.
<pre>
    <code>
        var preconditions = require("preconditions").errr();

        preconditions.shouldBeDefined(someObj.valueOne, "Custom error message.").test()
        preconditions.shouldBeDefined(someObj.valueTwo, "Error (%s:%s): Error Message.", [errType, errCode]).test();
        preconditions.shouldBeUndefined(someObj.valueThree, "Custom error message.").debug({param1: "someDebugParam"}).test()
        preconditions.checkPositionIndex(5, 10, "Custom error message.").appendTo(someErrorObj).test()
        preconditions.shouldBeDefined(someObj.valueTwo, "Error (%s:%s): Error Message.", [errType, errCode])
          .debug({param1: "someDebugParam"})
          .appendTo(someErrorObj)
          .test();
   </code>
</pre>

### Examples Using the Singleton Interface (.singleton())

You can use a static instance to verify one value at a time.
<pre>
    <code>
        var preconditions = require("preconditions").singleton();

        preconditions.shouldBeDefined(someObj.valueOne
            .shouldBeString(someObj.valueTwo, "Error (%s:%s): Error Message.", [errType, errCode]).test();
            .shouldBeUndefined(someObj.valueThree, "Custom error message.");
   </code>
</pre>

### Examples Using Instance Interface (.instance())
Should not be used in production code!

#### Setup Instance
<pre>
    <code>
        var preconditions = require("preconditions").instance(this);

        preconditions.shouldBeDefined("foo.deep.stringValue", "Custom error message.")
            .checkArguments("FOO" === "FOO");
            .shouldBeDefined("foo.deep.emptyArray")
            .shouldBeUndefined("foo.deep.someValue", "Custom error message.")
            .checkPositionIndex(5, 10, "Custom error message.")
            .shouldBeFunction("foo.deep.functionValue");
   </code>
</pre>

### Examples Using The Constructor (.constructor())
Should not be used in production code!

The Preconditions object itself is exposed so that you can extend the Preconditions class.
<pre>
    <code>
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

        this.childSut.shouldNotBeFalsey(stringValue)
              .shouldBeDefined(stringValue)
              .shouldBeString(stringValue)
              .shouldNotBeFalsey(numberValue)
              .shouldBeDefined(numberValue)
              .shouldBeNumber(numberValue)
              .checkPositionIndex(5, 10, "Custom error message.")
              .shouldBeTrue(false, "Value should be true (I am a custom error message).");
   </code>
</pre>

###Missing API or Bugs
Please reach out to me (Cory Parrish) if you would like a new precondition added or if you think you have found a bug.

###Known Issues
1. Release 1.0.2 has an npm install bug and has been deprecated!  Please update!
2. If you are using windows and are seeing npm install issues due to the '^' in the package.json, please update node to >= (v0.10.28).

### Releases
2.0.0 - Adds errr interface which decorates errr node module.
      - Allows templating in singleton interface.
      - Notes the poor performance in instance interface.  Should not be used in production code.
      - Redesign of code.
      - Now uses maddox for unit testing.
1.0.8 - Removed 'underscore' and added 'lodash'.
      - Added a .jshintrc file and a more extensive linting process
      - Separated dependencies and dev-dependencies to reduce installation load.
        - A big thanks to Esteban Ordano (eordano) for doing this work.

1.0.7 - First official public release.