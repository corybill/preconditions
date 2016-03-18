# Preconditions Library

[![view on npm](http://img.shields.io/npm/v/preconditions.svg)](https://www.npmjs.org/package/preconditions)
[![npm module downloads](http://img.shields.io/npm/dt/preconditions.svg)](https://www.npmjs.org/package/preconditions)
[![Build Status](https://travis-ci.org/corybill/Preconditions.svg?branch=master)](https://travis-ci.org/corybill/Preconditions)
[![Gitter](https://badges.gitter.im/corybill/reconditions.svg)](https://gitter.im/corybill/preconditions?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

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
<pre><code>npm install guava-optional</code></pre>

### Preconditions Interface
There are four functions that are exposed from the library.

1. errr() - Verify a one value at a time while building an 'errr' object.  You can append errors together and add debug params to the stack trace. 
2. singleton() - Verify one value at a time with a chainable preconditions interface.
3. instance() - Create a testing suite passing in a single object.  Run a single, or multiple tests on the passed in object. Shouldn't be used in production code.
4. constructor() - Get the constructor function so you can extend the Preconditions library (see below for example). Shouldn't be used in production code.

### Examples Using the Errr Interface (.errr())

You can use a static instance to verify one value at a time while using the errr module to build an errr.  For more on the errr module see here https://github.com/corybill/Preconditions#errrdecorator and here https://github.com/corybill/errr#errr.
<pre>
  <code>
    var preconditions = require("preconditions").errr();
  
    preconditions.shouldBeDefined(someObj.valueOne).test();
    preconditions.shouldBeDefined(someObj.valueOne, "Custom error message.").test();
    preconditions.shouldBeDefined(someObj.valueOne, "Error (%s:%s): Error Message.", [errType, errCode]).test();
    preconditions.shouldBeDefined(someObj.valueOne, "Custom error message.").debug({param1: "someDebugParam"}).test();
    preconditions.shouldBeDefined(someObj.valueOne, "Custom error message.").appendTo(someErrorObj).test();
    preconditions.shouldBeDefined(someObj.valueTwo, "Error (%s:%s): Error Message.", [errType, errCode]);
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
  
    preconditions.shouldBeDefined(someObj.valueOne)
      .shouldBeDefined(someObj.valueTwo, "Error (%s:%s): Error Message.", [errType, errCode]).test();
      .shouldBeDefined(someObj.valueThree, "Custom error message.");
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

## NPM Scripts
1. npm run test - Run linter and unit tests.
2. npm run ut - Use Maddox to Run Unit Tests.
3. npm run perf - Use Maddox to Performance metrics.
3. npm run uap - Use Maddox to Unit Tests and Performance metrics.
4. npm run lint - Run linter.
5. npm run docs - Rebuild public API Docs.

### Missing API or Bugs
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

## API

### Preconditions Interface
<a name="preconditions"></a>

### Validate Using Errr Module
<a name="Validator"></a>
<a name="Decorator"></a>

### Validate Without Errr Module
<a name="singletonValidator"></a>
<a name="InstanceValidator"></a>

## preconditions
Preconditions interface.

**Kind**: global variable  

* [preconditions](#preconditions)
    * [.errr()](#preconditions.errr) ⇒
    * [.singleton()](#preconditions.singleton) ⇒
    * [.instance(objectUnderTest)](#preconditions.instance) ⇒
    * [.constructor()](#preconditions.constructor) ⇒

<a name="preconditions.errr"></a>

### preconditions.errr() ⇒
Validate single value with the buildable errr interface from the static errr Validation functionality.

**Kind**: static method of <code>[preconditions](#preconditions)</code>  
**Returns**: Error Validation Singleton.  
<a name="preconditions.singleton"></a>

### preconditions.singleton() ⇒
Validate single value with the chainable interface from the Error Validation Singleton.

**Kind**: static method of <code>[preconditions](#preconditions)</code>  
**Returns**: Error Validation Singleton.  
<a name="preconditions.instance"></a>

### preconditions.instance(objectUnderTest) ⇒
**Kind**: static method of <code>[preconditions](#preconditions)</code>  
**Returns**: Error Validation instance.  
**Warning**: This functionality has very poor performance.  Please use the 'singleton' or 'errr' functionality instead.

Validate values of a given JSON object with the preconditions object.  

| Param | Description |
| --- | --- |
| objectUnderTest | Object Under Test |

<a name="preconditions.constructor"></a>

### preconditions.constructor() ⇒
Gives ability to extend and add other preconditions to the Error Validation constructor.

**Kind**: static method of <code>[preconditions](#preconditions)</code>  
**Returns**: Error Validation constructor.  
**Warning**: This functionality only works with the 'instance' function which has very poor performance.

## Validator
Validate single value with a buildable interface on top of the errr node module.
Use this interface if you want to utilize the following functionality:
1. Error message templating. 2. Only templates error message if Validator fails which saves event queue cycles.
3. Gives ability to append Stack traces to an existing error. 4. Gives ability to append debug params to stack trace.

**Kind**: global class  

* [Validator](#Validator)
    * [.shouldBeDefined(val, [message], [template])](#Validator.shouldBeDefined) ⇒ <code>ErrrDecorator</code>
    * [.shouldBeUndefined(val, [message], [template])](#Validator.shouldBeUndefined) ⇒ <code>ErrrDecorator</code>
    * [.shouldBeArray(val, [message], [template])](#Validator.shouldBeArray) ⇒ <code>ErrrDecorator</code>
    * [.shouldNotBeArray(val, [message], [template])](#Validator.shouldNotBeArray) ⇒ <code>ErrrDecorator</code>
    * [.shouldBeObject(val, [message], [template])](#Validator.shouldBeObject) ⇒ <code>ErrrDecorator</code>
    * [.shouldNotBeObject(val, [message], [template])](#Validator.shouldNotBeObject) ⇒ <code>ErrrDecorator</code>
    * [.shouldBeEmpty(val, [message], [template])](#Validator.shouldBeEmpty) ⇒ <code>ErrrDecorator</code>
    * [.shouldNotBeEmpty(val, [message], [template])](#Validator.shouldNotBeEmpty) ⇒ <code>ErrrDecorator</code>
    * [.shouldBeFunction(val, [message], [template])](#Validator.shouldBeFunction) ⇒ <code>ErrrDecorator</code>
    * [.shouldNotBeFunction(val, [message], [template])](#Validator.shouldNotBeFunction) ⇒ <code>ErrrDecorator</code>
    * [.shouldBeString(val, [message], [template])](#Validator.shouldBeString) ⇒ <code>ErrrDecorator</code>
    * [.shouldNotBeString(val, [message], [template])](#Validator.shouldNotBeString) ⇒ <code>ErrrDecorator</code>
    * [.shouldBeNumber(val, [message], [template])](#Validator.shouldBeNumber) ⇒ <code>ErrrDecorator</code>
    * [.shouldNotBeNumber(val, [message], [template])](#Validator.shouldNotBeNumber) ⇒ <code>ErrrDecorator</code>
    * [.shouldBeFinite(val, [message], [template])](#Validator.shouldBeFinite) ⇒ <code>ErrrDecorator</code>
    * [.shouldBeInfinite(val, [message], [template])](#Validator.shouldBeInfinite) ⇒ <code>ErrrDecorator</code>
    * [.shouldBeBoolean(val, [message], [template])](#Validator.shouldBeBoolean) ⇒ <code>ErrrDecorator</code>
    * [.shouldNotBeBoolean(val, [message], [template])](#Validator.shouldNotBeBoolean) ⇒ <code>ErrrDecorator</code>
    * [.shouldBeDate(val, [message], [template])](#Validator.shouldBeDate) ⇒ <code>ErrrDecorator</code>
    * [.shouldNotBeDate(val, [message], [template])](#Validator.shouldNotBeDate) ⇒ <code>ErrrDecorator</code>
    * [.shouldBeRegExp(val, [message], [template])](#Validator.shouldBeRegExp) ⇒ <code>ErrrDecorator</code>
    * [.shouldNotBeRegExp(val, [message], [template])](#Validator.shouldNotBeRegExp) ⇒ <code>ErrrDecorator</code>
    * [.shouldBeFalsey(val, [message], [template])](#Validator.shouldBeFalsey) ⇒ <code>ErrrDecorator</code>
    * [.shouldNotBeFalsey(val, [message], [template])](#Validator.shouldNotBeFalsey) ⇒ <code>ErrrDecorator</code>
    * [.shouldBeFalsy(val, [message], [template])](#Validator.shouldBeFalsy) ⇒ <code>ErrrDecorator</code>
    * [.shouldNotBeFalsy(val, [message], [template])](#Validator.shouldNotBeFalsy) ⇒ <code>ErrrDecorator</code>
    * [.shouldBeTruthy(val, [message], [template])](#Validator.shouldBeTruthy) ⇒ <code>ErrrDecorator</code>
    * [.shouldNotBeTruthy(val, [message], [template])](#Validator.shouldNotBeTruthy) ⇒ <code>ErrrDecorator</code>
    * [.checkArgument(expression, [message], [template])](#Validator.checkArgument) ⇒ <code>ErrrDecorator</code>
    * [.checkState(expression, [message], [template])](#Validator.checkState) ⇒ <code>ErrrDecorator</code>
    * [.checkElementIndex(index, size, [message], [template])](#Validator.checkElementIndex) ⇒ <code>ErrrDecorator</code>
    * [.checkPositionIndex(index, size, [message], [template])](#Validator.checkPositionIndex) ⇒ <code>ErrrDecorator</code>
    * [.checkPositionIndexes(start, end, size, [message], [template])](#Validator.checkPositionIndexes) ⇒ <code>ErrrDecorator</code>

<a name="Validator.shouldBeDefined"></a>

### Validator.shouldBeDefined(val, [message], [template]) ⇒ <code>ErrrDecorator</code>
Throws an error if 'val' is not defined.

**Kind**: static method of <code>[Validator](#Validator)</code>  
**Returns**: <code>ErrrDecorator</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the Validator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="Validator.shouldBeUndefined"></a>

### Validator.shouldBeUndefined(val, [message], [template]) ⇒ <code>ErrrDecorator</code>
Throws an error if 'val' is defined.

**Kind**: static method of <code>[Validator](#Validator)</code>  
**Returns**: <code>ErrrDecorator</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the Validator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="Validator.shouldBeArray"></a>

### Validator.shouldBeArray(val, [message], [template]) ⇒ <code>ErrrDecorator</code>
Throws an error if 'val' is not of type Array.

**Kind**: static method of <code>[Validator](#Validator)</code>  
**Returns**: <code>ErrrDecorator</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the Validator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="Validator.shouldNotBeArray"></a>

### Validator.shouldNotBeArray(val, [message], [template]) ⇒ <code>ErrrDecorator</code>
Throws an error if 'val' is of type Array.

**Kind**: static method of <code>[Validator](#Validator)</code>  
**Returns**: <code>ErrrDecorator</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the Validator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="Validator.shouldBeObject"></a>

### Validator.shouldBeObject(val, [message], [template]) ⇒ <code>ErrrDecorator</code>
Throws an error if 'val' is not of type Object.

**Kind**: static method of <code>[Validator](#Validator)</code>  
**Returns**: <code>ErrrDecorator</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the Validator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="Validator.shouldNotBeObject"></a>

### Validator.shouldNotBeObject(val, [message], [template]) ⇒ <code>ErrrDecorator</code>
Throws an error if 'val' is of type Object.

**Kind**: static method of <code>[Validator](#Validator)</code>  
**Returns**: <code>ErrrDecorator</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the Validator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="Validator.shouldBeEmpty"></a>

### Validator.shouldBeEmpty(val, [message], [template]) ⇒ <code>ErrrDecorator</code>
Throws an error if 'val' is not empty.

**Kind**: static method of <code>[Validator](#Validator)</code>  
**Returns**: <code>ErrrDecorator</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the Validator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="Validator.shouldNotBeEmpty"></a>

### Validator.shouldNotBeEmpty(val, [message], [template]) ⇒ <code>ErrrDecorator</code>
Throws an error if 'val' is empty.

**Kind**: static method of <code>[Validator](#Validator)</code>  
**Returns**: <code>ErrrDecorator</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the Validator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="Validator.shouldBeFunction"></a>

### Validator.shouldBeFunction(val, [message], [template]) ⇒ <code>ErrrDecorator</code>
Throws an error if 'val' is not of type Function.

**Kind**: static method of <code>[Validator](#Validator)</code>  
**Returns**: <code>ErrrDecorator</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the Validator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="Validator.shouldNotBeFunction"></a>

### Validator.shouldNotBeFunction(val, [message], [template]) ⇒ <code>ErrrDecorator</code>
Throws an error if 'val' is of type Function.

**Kind**: static method of <code>[Validator](#Validator)</code>  
**Returns**: <code>ErrrDecorator</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the Validator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="Validator.shouldBeString"></a>

### Validator.shouldBeString(val, [message], [template]) ⇒ <code>ErrrDecorator</code>
Throws an error if 'val' is not of type String.

**Kind**: static method of <code>[Validator](#Validator)</code>  
**Returns**: <code>ErrrDecorator</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the Validator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="Validator.shouldNotBeString"></a>

### Validator.shouldNotBeString(val, [message], [template]) ⇒ <code>ErrrDecorator</code>
Throws an error if 'val' is of type String.

**Kind**: static method of <code>[Validator](#Validator)</code>  
**Returns**: <code>ErrrDecorator</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the Validator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="Validator.shouldBeNumber"></a>

### Validator.shouldBeNumber(val, [message], [template]) ⇒ <code>ErrrDecorator</code>
Throws an error if 'val' is not of type Number.

**Kind**: static method of <code>[Validator](#Validator)</code>  
**Returns**: <code>ErrrDecorator</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the Validator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="Validator.shouldNotBeNumber"></a>

### Validator.shouldNotBeNumber(val, [message], [template]) ⇒ <code>ErrrDecorator</code>
Throws an error if 'val' is of type Number.

**Kind**: static method of <code>[Validator](#Validator)</code>  
**Returns**: <code>ErrrDecorator</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the Validator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="Validator.shouldBeFinite"></a>

### Validator.shouldBeFinite(val, [message], [template]) ⇒ <code>ErrrDecorator</code>
Throws an error if 'val' is not finite.

**Kind**: static method of <code>[Validator](#Validator)</code>  
**Returns**: <code>ErrrDecorator</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the Validator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="Validator.shouldBeInfinite"></a>

### Validator.shouldBeInfinite(val, [message], [template]) ⇒ <code>ErrrDecorator</code>
Throws an error if 'val' is finite.

**Kind**: static method of <code>[Validator](#Validator)</code>  
**Returns**: <code>ErrrDecorator</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the Validator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="Validator.shouldBeBoolean"></a>

### Validator.shouldBeBoolean(val, [message], [template]) ⇒ <code>ErrrDecorator</code>
Throws an error if 'val' is not of type Boolean.

**Kind**: static method of <code>[Validator](#Validator)</code>  
**Returns**: <code>ErrrDecorator</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the Validator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="Validator.shouldNotBeBoolean"></a>

### Validator.shouldNotBeBoolean(val, [message], [template]) ⇒ <code>ErrrDecorator</code>
Throws an error if 'val' is of type Boolean.

**Kind**: static method of <code>[Validator](#Validator)</code>  
**Returns**: <code>ErrrDecorator</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the Validator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="Validator.shouldBeDate"></a>

### Validator.shouldBeDate(val, [message], [template]) ⇒ <code>ErrrDecorator</code>
Throws an error if 'val' is not of type Date.

**Kind**: static method of <code>[Validator](#Validator)</code>  
**Returns**: <code>ErrrDecorator</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the Validator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="Validator.shouldNotBeDate"></a>

### Validator.shouldNotBeDate(val, [message], [template]) ⇒ <code>ErrrDecorator</code>
Throws an error if 'val' is of type Date.

**Kind**: static method of <code>[Validator](#Validator)</code>  
**Returns**: <code>ErrrDecorator</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the Validator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="Validator.shouldBeRegExp"></a>

### Validator.shouldBeRegExp(val, [message], [template]) ⇒ <code>ErrrDecorator</code>
Throws an error if 'val' is not a Regular Expression.

**Kind**: static method of <code>[Validator](#Validator)</code>  
**Returns**: <code>ErrrDecorator</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the Validator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="Validator.shouldNotBeRegExp"></a>

### Validator.shouldNotBeRegExp(val, [message], [template]) ⇒ <code>ErrrDecorator</code>
Throws an error if 'val' is a Regular Expression.

**Kind**: static method of <code>[Validator](#Validator)</code>  
**Returns**: <code>ErrrDecorator</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the Validator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="Validator.shouldBeFalsey"></a>

### Validator.shouldBeFalsey(val, [message], [template]) ⇒ <code>ErrrDecorator</code>
Throws an error if 'val' is not falsey.

**Kind**: static method of <code>[Validator](#Validator)</code>  
**Returns**: <code>ErrrDecorator</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the Validator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="Validator.shouldNotBeFalsey"></a>

### Validator.shouldNotBeFalsey(val, [message], [template]) ⇒ <code>ErrrDecorator</code>
Throws an error if 'val' is falsey.

**Kind**: static method of <code>[Validator](#Validator)</code>  
**Returns**: <code>ErrrDecorator</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the Validator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="Validator.shouldBeFalsy"></a>

### Validator.shouldBeFalsy(val, [message], [template]) ⇒ <code>ErrrDecorator</code>
Synonym for shouldBeFalsey.

**Kind**: static method of <code>[Validator](#Validator)</code>  
**Returns**: <code>ErrrDecorator</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the Validator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="Validator.shouldNotBeFalsy"></a>

### Validator.shouldNotBeFalsy(val, [message], [template]) ⇒ <code>ErrrDecorator</code>
Synonym for shouldNotBeFalsey.

**Kind**: static method of <code>[Validator](#Validator)</code>  
**Returns**: <code>ErrrDecorator</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the Validator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="Validator.shouldBeTruthy"></a>

### Validator.shouldBeTruthy(val, [message], [template]) ⇒ <code>ErrrDecorator</code>
Synonym for shouldNotBeFalsey.

**Kind**: static method of <code>[Validator](#Validator)</code>  
**Returns**: <code>ErrrDecorator</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the Validator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="Validator.shouldNotBeTruthy"></a>

### Validator.shouldNotBeTruthy(val, [message], [template]) ⇒ <code>ErrrDecorator</code>
Synonym for shouldBeFalsey.

**Kind**: static method of <code>[Validator](#Validator)</code>  
**Returns**: <code>ErrrDecorator</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the Validator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="Validator.checkArgument"></a>

### Validator.checkArgument(expression, [message], [template]) ⇒ <code>ErrrDecorator</code>
Ensures the truth of an expression involving one or more parameters to the calling method.

**Kind**: static method of <code>[Validator](#Validator)</code>  
**Returns**: <code>ErrrDecorator</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| expression | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the Validator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="Validator.checkState"></a>

### Validator.checkState(expression, [message], [template]) ⇒ <code>ErrrDecorator</code>
Ensures the truth of an expression involving the state of the calling instance, but not involving any parameters to the calling method.

**Kind**: static method of <code>[Validator](#Validator)</code>  
**Returns**: <code>ErrrDecorator</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| expression | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the Validator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="Validator.checkElementIndex"></a>

### Validator.checkElementIndex(index, size, [message], [template]) ⇒ <code>ErrrDecorator</code>
Ensures that index specifies a valid element in an array, list or string of size size.

**Kind**: static method of <code>[Validator](#Validator)</code>  
**Returns**: <code>ErrrDecorator</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>Number</code> |  |
| size | <code>Number</code> |  |
| [message] | <code>String</code> | The error message or the error template string to use if the Validator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="Validator.checkPositionIndex"></a>

### Validator.checkPositionIndex(index, size, [message], [template]) ⇒ <code>ErrrDecorator</code>
Ensures that index specifies a valid position in an array, list or string of size size.

**Kind**: static method of <code>[Validator](#Validator)</code>  
**Returns**: <code>ErrrDecorator</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>Number</code> |  |
| size | <code>Number</code> |  |
| [message] | <code>String</code> | The error message or the error template string to use if the Validator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="Validator.checkPositionIndexes"></a>

### Validator.checkPositionIndexes(start, end, size, [message], [template]) ⇒ <code>ErrrDecorator</code>
Ensures that start and end specify a valid positions in an array, list or string of size size, and are in order.

**Kind**: static method of <code>[Validator](#Validator)</code>  
**Returns**: <code>ErrrDecorator</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| start | <code>Number</code> |  |
| end | <code>Number</code> |  |
| size | <code>Number</code> |  |
| [message] | <code>String</code> | The error message or the error template string to use if the Validator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

## Decorator
Error Builder allows you to use optional functions to build an error object.  The error can have appended stack traces and debug params to assist with debugging.

**Kind**: global class  

* [Decorator](#Decorator)
    * [new Decorator([message], [template])](#new_Decorator_new)
    * [.debug(params, [shouldDebug])](#Decorator+debug) ⇒ <code>ErrorBuilder</code>
    * [.appendTo(err)](#Decorator+appendTo) ⇒ <code>ErrorBuilder</code>
    * [.test()](#Decorator+test)
    * [.t()](#Decorator+t)

<a name="new_Decorator_new"></a>

### new Decorator([message], [template])
Provides an interface to build an error.  Then allows you to get or throw the error.


| Param | Type | Description |
| --- | --- | --- |
| [message] | <code>String</code> | Error message that will supplied to Error Object. |
| [template] | <code>Array</code> | Array of parameters.  If given, util.format(message, template) will be applied to the message string. |

<a name="Decorator+debug"></a>

### decorator.debug(params, [shouldDebug]) ⇒ <code>ErrorBuilder</code>
Decorated function from 'errr' module. Add parameters to the stack trace that will make it easier to debug the problem.

**Kind**: instance method of <code>[Decorator](#Decorator)</code>  
**Returns**: <code>ErrorBuilder</code> - - Returns the instance of errorBuilder to allow chainability.  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> | Object Map of key value parameters that will make it easier to debug the error. |
| [shouldDebug] | <code>Boolean</code> | If shouldDebug === false, then debug params will not print.  Any other value (including undefined), and the debug params will be printed. Useful if you want to only print debugParams given an Environment Variable. |

<a name="Decorator+appendTo"></a>

### decorator.appendTo(err) ⇒ <code>ErrorBuilder</code>
Decorated function from 'errr' module. Append the error being built, to the end of this error's stack trace.

**Kind**: instance method of <code>[Decorator](#Decorator)</code>  
**Returns**: <code>ErrorBuilder</code> - - Returns the instance of errorBuilder to allow chainability.  

| Param | Type | Description |
| --- | --- | --- |
| err | <code>Error</code> | The stack trace of the error being built, will be appended to this error's stack trace. |

<a name="Decorator+test"></a>

### decorator.test()
Validate preconditions check and throw an errr if it fails.

**Kind**: instance method of <code>[Decorator](#Decorator)</code>  
<a name="Decorator+t"></a>

### decorator.t()
Synonym for the test function.

**Kind**: instance method of <code>[Decorator](#Decorator)</code>

## singletonValidator
Validate single value with a chainable interface.
Use this interface if you want to utilize the following functionality:
1. Error message templating. 2. Only templates error message if validation fails which saves event queue cycles.
3. Chain together precondition validations.

**Kind**: global variable  

* [singletonValidator](#singletonValidator)
    * [.shouldBeDefined(val, [message], [template])](#singletonValidator.shouldBeDefined) ⇒ <code>this</code>
    * [.shouldBeUndefined(val, [message], [template])](#singletonValidator.shouldBeUndefined) ⇒ <code>this</code>
    * [.shouldBeArray(val, [message], [template])](#singletonValidator.shouldBeArray) ⇒ <code>this</code>
    * [.shouldNotBeArray(val, [message], [template])](#singletonValidator.shouldNotBeArray) ⇒ <code>this</code>
    * [.shouldBeObject(val, [message], [template])](#singletonValidator.shouldBeObject) ⇒ <code>this</code>
    * [.shouldNotBeObject(val, [message], [template])](#singletonValidator.shouldNotBeObject) ⇒ <code>this</code>
    * [.shouldBeEmpty(val, [message], [template])](#singletonValidator.shouldBeEmpty) ⇒ <code>this</code>
    * [.shouldNotBeEmpty(val, [message], [template])](#singletonValidator.shouldNotBeEmpty) ⇒ <code>this</code>
    * [.shouldBeFunction(val, [message], [template])](#singletonValidator.shouldBeFunction) ⇒ <code>this</code>
    * [.shouldNotBeFunction(val, [message], [template])](#singletonValidator.shouldNotBeFunction) ⇒ <code>this</code>
    * [.shouldBeString(val, [message], [template])](#singletonValidator.shouldBeString) ⇒ <code>this</code>
    * [.shouldNotBeString(val, [message], [template])](#singletonValidator.shouldNotBeString) ⇒ <code>this</code>
    * [.shouldBeNumber(val, [message], [template])](#singletonValidator.shouldBeNumber) ⇒ <code>this</code>
    * [.shouldNotBeNumber(val, [message], [template])](#singletonValidator.shouldNotBeNumber) ⇒ <code>this</code>
    * [.shouldBeFinite(val, [message], [template])](#singletonValidator.shouldBeFinite) ⇒ <code>this</code>
    * [.shouldBeInfinite(val, [message], [template])](#singletonValidator.shouldBeInfinite) ⇒ <code>this</code>
    * [.shouldBeBoolean(val, [message], [template])](#singletonValidator.shouldBeBoolean) ⇒ <code>this</code>
    * [.shouldNotBeBoolean(val, [message], [template])](#singletonValidator.shouldNotBeBoolean) ⇒ <code>this</code>
    * [.shouldBeDate(val, [message], [template])](#singletonValidator.shouldBeDate) ⇒ <code>this</code>
    * [.shouldNotBeDate(val, [message], [template])](#singletonValidator.shouldNotBeDate) ⇒ <code>this</code>
    * [.shouldBeRegExp(val, [message], [template])](#singletonValidator.shouldBeRegExp) ⇒ <code>this</code>
    * [.shouldNotBeRegExp(val, [message], [template])](#singletonValidator.shouldNotBeRegExp) ⇒ <code>this</code>
    * [.shouldBeFalsey(val, [message], [template])](#singletonValidator.shouldBeFalsey) ⇒ <code>this</code>
    * [.shouldNotBeFalsey(val, [message], [template])](#singletonValidator.shouldNotBeFalsey) ⇒ <code>this</code>
    * [.shouldBeFalsy(val, [message], [template])](#singletonValidator.shouldBeFalsy) ⇒ <code>this</code>
    * [.shouldNotBeFalsy(val, [message], [template])](#singletonValidator.shouldNotBeFalsy) ⇒ <code>this</code>
    * [.shouldBeTruthy(val, [message], [template])](#singletonValidator.shouldBeTruthy) ⇒ <code>this</code>
    * [.shouldNotBeTruthy(val, [message], [template])](#singletonValidator.shouldNotBeTruthy) ⇒ <code>this</code>
    * [.checkArgument(expression, [message], [template])](#singletonValidator.checkArgument) ⇒ <code>this</code>
    * [.checkState(expression, [message], [template])](#singletonValidator.checkState) ⇒ <code>this</code>
    * [.checkElementIndex(index, size, [message], [template])](#singletonValidator.checkElementIndex) ⇒ <code>this</code>
    * [.checkPositionIndex(index, size, [message], [template])](#singletonValidator.checkPositionIndex) ⇒ <code>this</code>
    * [.checkPositionIndexes(start, end, size, [message], [template])](#singletonValidator.checkPositionIndexes) ⇒ <code>this</code>

<a name="singletonValidator.shouldBeDefined"></a>

### singletonValidator.shouldBeDefined(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is not defined.

**Kind**: static method of <code>[singletonValidator](#singletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="singletonValidator.shouldBeUndefined"></a>

### singletonValidator.shouldBeUndefined(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is defined.

**Kind**: static method of <code>[singletonValidator](#singletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="singletonValidator.shouldBeArray"></a>

### singletonValidator.shouldBeArray(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is not of type Array.

**Kind**: static method of <code>[singletonValidator](#singletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="singletonValidator.shouldNotBeArray"></a>

### singletonValidator.shouldNotBeArray(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is of type Array.

**Kind**: static method of <code>[singletonValidator](#singletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="singletonValidator.shouldBeObject"></a>

### singletonValidator.shouldBeObject(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is not of type Object.

**Kind**: static method of <code>[singletonValidator](#singletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="singletonValidator.shouldNotBeObject"></a>

### singletonValidator.shouldNotBeObject(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is of type Object.

**Kind**: static method of <code>[singletonValidator](#singletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="singletonValidator.shouldBeEmpty"></a>

### singletonValidator.shouldBeEmpty(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is not empty.

**Kind**: static method of <code>[singletonValidator](#singletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="singletonValidator.shouldNotBeEmpty"></a>

### singletonValidator.shouldNotBeEmpty(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is empty.

**Kind**: static method of <code>[singletonValidator](#singletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="singletonValidator.shouldBeFunction"></a>

### singletonValidator.shouldBeFunction(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is not of type Function.

**Kind**: static method of <code>[singletonValidator](#singletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="singletonValidator.shouldNotBeFunction"></a>

### singletonValidator.shouldNotBeFunction(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is of type Function.

**Kind**: static method of <code>[singletonValidator](#singletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="singletonValidator.shouldBeString"></a>

### singletonValidator.shouldBeString(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is not of type String.

**Kind**: static method of <code>[singletonValidator](#singletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="singletonValidator.shouldNotBeString"></a>

### singletonValidator.shouldNotBeString(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is of type String.

**Kind**: static method of <code>[singletonValidator](#singletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="singletonValidator.shouldBeNumber"></a>

### singletonValidator.shouldBeNumber(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is not of type Number.

**Kind**: static method of <code>[singletonValidator](#singletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="singletonValidator.shouldNotBeNumber"></a>

### singletonValidator.shouldNotBeNumber(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is of type Number.

**Kind**: static method of <code>[singletonValidator](#singletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="singletonValidator.shouldBeFinite"></a>

### singletonValidator.shouldBeFinite(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is not finite.

**Kind**: static method of <code>[singletonValidator](#singletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="singletonValidator.shouldBeInfinite"></a>

### singletonValidator.shouldBeInfinite(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is not infinite.

**Kind**: static method of <code>[singletonValidator](#singletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="singletonValidator.shouldBeBoolean"></a>

### singletonValidator.shouldBeBoolean(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is not of type Boolean.

**Kind**: static method of <code>[singletonValidator](#singletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="singletonValidator.shouldNotBeBoolean"></a>

### singletonValidator.shouldNotBeBoolean(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is of type Boolean.

**Kind**: static method of <code>[singletonValidator](#singletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="singletonValidator.shouldBeDate"></a>

### singletonValidator.shouldBeDate(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is not of type Date.

**Kind**: static method of <code>[singletonValidator](#singletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="singletonValidator.shouldNotBeDate"></a>

### singletonValidator.shouldNotBeDate(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is of type Date.

**Kind**: static method of <code>[singletonValidator](#singletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="singletonValidator.shouldBeRegExp"></a>

### singletonValidator.shouldBeRegExp(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is not a Regular Expression.

**Kind**: static method of <code>[singletonValidator](#singletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="singletonValidator.shouldNotBeRegExp"></a>

### singletonValidator.shouldNotBeRegExp(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is a Regular Expression.

**Kind**: static method of <code>[singletonValidator](#singletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="singletonValidator.shouldBeFalsey"></a>

### singletonValidator.shouldBeFalsey(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is not falsey.

**Kind**: static method of <code>[singletonValidator](#singletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="singletonValidator.shouldNotBeFalsey"></a>

### singletonValidator.shouldNotBeFalsey(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is falsey.

**Kind**: static method of <code>[singletonValidator](#singletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="singletonValidator.shouldBeFalsy"></a>

### singletonValidator.shouldBeFalsy(val, [message], [template]) ⇒ <code>this</code>
Synonym for shouldBeFalsey.

**Kind**: static method of <code>[singletonValidator](#singletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="singletonValidator.shouldNotBeFalsy"></a>

### singletonValidator.shouldNotBeFalsy(val, [message], [template]) ⇒ <code>this</code>
Synonym for shouldNotBeFalsey.

**Kind**: static method of <code>[singletonValidator](#singletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="singletonValidator.shouldBeTruthy"></a>

### singletonValidator.shouldBeTruthy(val, [message], [template]) ⇒ <code>this</code>
Synonym for shouldNotBeFalsey.

**Kind**: static method of <code>[singletonValidator](#singletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="singletonValidator.shouldNotBeTruthy"></a>

### singletonValidator.shouldNotBeTruthy(val, [message], [template]) ⇒ <code>this</code>
Synonym for shouldBeFalsey.

**Kind**: static method of <code>[singletonValidator](#singletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="singletonValidator.checkArgument"></a>

### singletonValidator.checkArgument(expression, [message], [template]) ⇒ <code>this</code>
Ensures the truth of an expression involving one or more parameters to the calling method.

**Kind**: static method of <code>[singletonValidator](#singletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| expression | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="singletonValidator.checkState"></a>

### singletonValidator.checkState(expression, [message], [template]) ⇒ <code>this</code>
Ensures the truth of an expression involving the state of the calling instance, but not involving any parameters to the calling method.

**Kind**: static method of <code>[singletonValidator](#singletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| expression | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="singletonValidator.checkElementIndex"></a>

### singletonValidator.checkElementIndex(index, size, [message], [template]) ⇒ <code>this</code>
Ensures that index specifies a valid element in an array, list or string of size size.

**Kind**: static method of <code>[singletonValidator](#singletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>Number</code> |  |
| size | <code>Number</code> |  |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="singletonValidator.checkPositionIndex"></a>

### singletonValidator.checkPositionIndex(index, size, [message], [template]) ⇒ <code>this</code>
Ensures that index specifies a valid position in an array, list or string of size size.

**Kind**: static method of <code>[singletonValidator](#singletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>Number</code> |  |
| size | <code>Number</code> |  |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="singletonValidator.checkPositionIndexes"></a>

### singletonValidator.checkPositionIndexes(start, end, size, [message], [template]) ⇒ <code>this</code>
Ensures that start and end specify a valid positions in an array, list or string of size size, and are in order.

**Kind**: static method of <code>[singletonValidator](#singletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| start | <code>Number</code> |  |
| end | <code>Number</code> |  |
| size | <code>Number</code> |  |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

## InstanceValidator
**Kind**: global class  
**Warning**: - This interface will not perform as well 'singleton' or 'errr' interfaces.  Please use those if possible.

Validate values in a nested object using a dot notation structure (e.g. .shouldBeString("Person.Address.Street.zip"))
System will validate the the Person, Person.Address, and Person.Address.Street objects exist, and will validate that zip is a String.

Use this interface if you want to utilize the following functionality:
1. Nested object validation using a dot notation.  

* [InstanceValidator](#InstanceValidator)
    * [new InstanceValidator(objectUnderTest)](#new_InstanceValidator_new)
    * [.shouldBeDefined(configPath, [message])](#InstanceValidator+shouldBeDefined) ⇒ <code>this</code>
    * [.shouldBeUndefined(configPath, [message])](#InstanceValidator+shouldBeUndefined) ⇒ <code>this</code>
    * [.shouldBeNonEmptyArray(configPath, [message])](#InstanceValidator+shouldBeNonEmptyArray) ⇒ <code>this</code>
    * [.shouldBeArray(configPath, [message])](#InstanceValidator+shouldBeArray) ⇒ <code>this</code>
    * [.shouldNotBeArray(configPath, [message])](#InstanceValidator+shouldNotBeArray) ⇒ <code>this</code>
    * [.shouldBeObject(configPath, [message])](#InstanceValidator+shouldBeObject) ⇒ <code>this</code>
    * [.shouldNotBeObject(configPath, [message])](#InstanceValidator+shouldNotBeObject) ⇒ <code>this</code>
    * [.shouldBeEmpty(configPath, [message])](#InstanceValidator+shouldBeEmpty) ⇒ <code>this</code>
    * [.shouldNotBeEmpty(configPath, [message])](#InstanceValidator+shouldNotBeEmpty) ⇒ <code>this</code>
    * [.shouldBeFunction(configPath, [message])](#InstanceValidator+shouldBeFunction) ⇒ <code>this</code>
    * [.shouldNotBeFunction(configPath, [message])](#InstanceValidator+shouldNotBeFunction) ⇒ <code>this</code>
    * [.shouldBeString(configPath, [message])](#InstanceValidator+shouldBeString) ⇒ <code>this</code>
    * [.shouldNotBeString(configPath, [message])](#InstanceValidator+shouldNotBeString) ⇒ <code>this</code>
    * [.shouldBeNumber(configPath, [message])](#InstanceValidator+shouldBeNumber) ⇒ <code>this</code>
    * [.shouldNotBeNumber(configPath, [message])](#InstanceValidator+shouldNotBeNumber) ⇒ <code>this</code>
    * [.shouldBeFinite(configPath, [message])](#InstanceValidator+shouldBeFinite) ⇒ <code>this</code>
    * [.shouldBeInfinite(configPath, [message])](#InstanceValidator+shouldBeInfinite) ⇒ <code>this</code>
    * [.shouldBeBoolean(configPath, [message])](#InstanceValidator+shouldBeBoolean) ⇒ <code>this</code>
    * [.shouldNotBeBoolean(configPath, [message])](#InstanceValidator+shouldNotBeBoolean) ⇒ <code>this</code>
    * [.shouldBeDate(configPath, [message])](#InstanceValidator+shouldBeDate) ⇒ <code>this</code>
    * [.shouldNotBeDate(configPath, [message])](#InstanceValidator+shouldNotBeDate) ⇒ <code>this</code>
    * [.shouldBeRegExp(configPath, [message])](#InstanceValidator+shouldBeRegExp) ⇒ <code>this</code>
    * [.shouldNotBeRegExp(configPath, [message])](#InstanceValidator+shouldNotBeRegExp) ⇒ <code>this</code>
    * [.shouldBeFalsey(configPath, [message])](#InstanceValidator+shouldBeFalsey) ⇒ <code>this</code>
    * [.shouldNotBeFalsey(configPath, [message])](#InstanceValidator+shouldNotBeFalsey) ⇒ <code>this</code>
    * [.shouldBeFalsy(configPath, [message])](#InstanceValidator+shouldBeFalsy) ⇒ <code>this</code>
    * [.shouldNotBeFalsy(configPath, [message])](#InstanceValidator+shouldNotBeFalsy) ⇒ <code>this</code>
    * [.shouldBeTruthy(configPath, [message])](#InstanceValidator+shouldBeTruthy) ⇒ <code>this</code>
    * [.shouldNotBeTruthy(configPath, [message])](#InstanceValidator+shouldNotBeTruthy) ⇒ <code>this</code>
    * [.checkArgument(expression, [message], [template])](#InstanceValidator+checkArgument) ⇒ <code>this</code>
    * [.checkState(expression, [message])](#InstanceValidator+checkState) ⇒ <code>this</code>
    * [.checkElementIndex(index, size, [message])](#InstanceValidator+checkElementIndex) ⇒ <code>this</code>
    * [.checkPositionIndex(index, size, [message])](#InstanceValidator+checkPositionIndex) ⇒ <code>this</code>
    * [.checkPositionIndexes(start, end, size, [message])](#InstanceValidator+checkPositionIndexes) ⇒ <code>this</code>

<a name="new_InstanceValidator_new"></a>

### new InstanceValidator(objectUnderTest)

| Param | Type | Description |
| --- | --- | --- |
| objectUnderTest | <code>Object</code> | Object to run validations against. |

<a name="InstanceValidator+shouldBeDefined"></a>

### instanceValidator.shouldBeDefined(configPath, [message]) ⇒ <code>this</code>
Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is defined.

**Kind**: instance method of <code>[InstanceValidator](#InstanceValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="InstanceValidator+shouldBeUndefined"></a>

### instanceValidator.shouldBeUndefined(configPath, [message]) ⇒ <code>this</code>
Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is not defined.

**Kind**: instance method of <code>[InstanceValidator](#InstanceValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="InstanceValidator+shouldBeNonEmptyArray"></a>

### instanceValidator.shouldBeNonEmptyArray(configPath, [message]) ⇒ <code>this</code>
Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is not an array or is an empty array.

**Kind**: instance method of <code>[InstanceValidator](#InstanceValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="InstanceValidator+shouldBeArray"></a>

### instanceValidator.shouldBeArray(configPath, [message]) ⇒ <code>this</code>
Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is an array.

**Kind**: instance method of <code>[InstanceValidator](#InstanceValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="InstanceValidator+shouldNotBeArray"></a>

### instanceValidator.shouldNotBeArray(configPath, [message]) ⇒ <code>this</code>
Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is not an array.

**Kind**: instance method of <code>[InstanceValidator](#InstanceValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="InstanceValidator+shouldBeObject"></a>

### instanceValidator.shouldBeObject(configPath, [message]) ⇒ <code>this</code>
Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is of type Object.

**Kind**: instance method of <code>[InstanceValidator](#InstanceValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="InstanceValidator+shouldNotBeObject"></a>

### instanceValidator.shouldNotBeObject(configPath, [message]) ⇒ <code>this</code>
Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is not of type Object.

**Kind**: instance method of <code>[InstanceValidator](#InstanceValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="InstanceValidator+shouldBeEmpty"></a>

### instanceValidator.shouldBeEmpty(configPath, [message]) ⇒ <code>this</code>
Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is not empty.

**Kind**: instance method of <code>[InstanceValidator](#InstanceValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="InstanceValidator+shouldNotBeEmpty"></a>

### instanceValidator.shouldNotBeEmpty(configPath, [message]) ⇒ <code>this</code>
Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is empty.

**Kind**: instance method of <code>[InstanceValidator](#InstanceValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="InstanceValidator+shouldBeFunction"></a>

### instanceValidator.shouldBeFunction(configPath, [message]) ⇒ <code>this</code>
Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is not of type Function.

**Kind**: instance method of <code>[InstanceValidator](#InstanceValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="InstanceValidator+shouldNotBeFunction"></a>

### instanceValidator.shouldNotBeFunction(configPath, [message]) ⇒ <code>this</code>
Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is of type Function.

**Kind**: instance method of <code>[InstanceValidator](#InstanceValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="InstanceValidator+shouldBeString"></a>

### instanceValidator.shouldBeString(configPath, [message]) ⇒ <code>this</code>
Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is not of type String.

**Kind**: instance method of <code>[InstanceValidator](#InstanceValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="InstanceValidator+shouldNotBeString"></a>

### instanceValidator.shouldNotBeString(configPath, [message]) ⇒ <code>this</code>
Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is of type String.

**Kind**: instance method of <code>[InstanceValidator](#InstanceValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="InstanceValidator+shouldBeNumber"></a>

### instanceValidator.shouldBeNumber(configPath, [message]) ⇒ <code>this</code>
Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is not of type Number.

**Kind**: instance method of <code>[InstanceValidator](#InstanceValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="InstanceValidator+shouldNotBeNumber"></a>

### instanceValidator.shouldNotBeNumber(configPath, [message]) ⇒ <code>this</code>
Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is of type Number.

**Kind**: instance method of <code>[InstanceValidator](#InstanceValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="InstanceValidator+shouldBeFinite"></a>

### instanceValidator.shouldBeFinite(configPath, [message]) ⇒ <code>this</code>
Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is not finite.

**Kind**: instance method of <code>[InstanceValidator](#InstanceValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="InstanceValidator+shouldBeInfinite"></a>

### instanceValidator.shouldBeInfinite(configPath, [message]) ⇒ <code>this</code>
Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is not infinte.

**Kind**: instance method of <code>[InstanceValidator](#InstanceValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="InstanceValidator+shouldBeBoolean"></a>

### instanceValidator.shouldBeBoolean(configPath, [message]) ⇒ <code>this</code>
Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is not of type Boolean.

**Kind**: instance method of <code>[InstanceValidator](#InstanceValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="InstanceValidator+shouldNotBeBoolean"></a>

### instanceValidator.shouldNotBeBoolean(configPath, [message]) ⇒ <code>this</code>
Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is of type Boolean.

**Kind**: instance method of <code>[InstanceValidator](#InstanceValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="InstanceValidator+shouldBeDate"></a>

### instanceValidator.shouldBeDate(configPath, [message]) ⇒ <code>this</code>
Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is not of type Date.

**Kind**: instance method of <code>[InstanceValidator](#InstanceValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="InstanceValidator+shouldNotBeDate"></a>

### instanceValidator.shouldNotBeDate(configPath, [message]) ⇒ <code>this</code>
Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is of type Date.

**Kind**: instance method of <code>[InstanceValidator](#InstanceValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="InstanceValidator+shouldBeRegExp"></a>

### instanceValidator.shouldBeRegExp(configPath, [message]) ⇒ <code>this</code>
Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is not a Regular Expression.

**Kind**: instance method of <code>[InstanceValidator](#InstanceValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="InstanceValidator+shouldNotBeRegExp"></a>

### instanceValidator.shouldNotBeRegExp(configPath, [message]) ⇒ <code>this</code>
Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is a Regular Expression.

**Kind**: instance method of <code>[InstanceValidator](#InstanceValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="InstanceValidator+shouldBeFalsey"></a>

### instanceValidator.shouldBeFalsey(configPath, [message]) ⇒ <code>this</code>
Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is not falsey.

**Kind**: instance method of <code>[InstanceValidator](#InstanceValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="InstanceValidator+shouldNotBeFalsey"></a>

### instanceValidator.shouldNotBeFalsey(configPath, [message]) ⇒ <code>this</code>
Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is falsey.

**Kind**: instance method of <code>[InstanceValidator](#InstanceValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="InstanceValidator+shouldBeFalsy"></a>

### instanceValidator.shouldBeFalsy(configPath, [message]) ⇒ <code>this</code>
Synonym for shouldBeFalsey.

**Kind**: instance method of <code>[InstanceValidator](#InstanceValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="InstanceValidator+shouldNotBeFalsy"></a>

### instanceValidator.shouldNotBeFalsy(configPath, [message]) ⇒ <code>this</code>
Synonym for shouldNotBeFalsey.

**Kind**: instance method of <code>[InstanceValidator](#InstanceValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="InstanceValidator+shouldBeTruthy"></a>

### instanceValidator.shouldBeTruthy(configPath, [message]) ⇒ <code>this</code>
Synonym for shouldNotBeFalsey.

**Kind**: instance method of <code>[InstanceValidator](#InstanceValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="InstanceValidator+shouldNotBeTruthy"></a>

### instanceValidator.shouldNotBeTruthy(configPath, [message]) ⇒ <code>this</code>
Synonym for shouldBeFalsey.

**Kind**: instance method of <code>[InstanceValidator](#InstanceValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="InstanceValidator+checkArgument"></a>

### instanceValidator.checkArgument(expression, [message], [template]) ⇒ <code>this</code>
Ensures the truth of an expression involving one or more parameters to the calling method.

**Kind**: instance method of <code>[InstanceValidator](#InstanceValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| expression | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="InstanceValidator+checkState"></a>

### instanceValidator.checkState(expression, [message]) ⇒ <code>this</code>
Ensures the truth of an expression involving the state of the calling InstanceValidator, but not involving any parameters to the calling method.

**Kind**: instance method of <code>[InstanceValidator](#InstanceValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| expression | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="InstanceValidator+checkElementIndex"></a>

### instanceValidator.checkElementIndex(index, size, [message]) ⇒ <code>this</code>
Ensures that index specifies a valid element in an array, list or string of size size.

**Kind**: instance method of <code>[InstanceValidator](#InstanceValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>Number</code> |  |
| size | <code>Number</code> |  |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="InstanceValidator+checkPositionIndex"></a>

### instanceValidator.checkPositionIndex(index, size, [message]) ⇒ <code>this</code>
Ensures that index specifies a valid position in an array, list or string of size size.

**Kind**: instance method of <code>[InstanceValidator](#InstanceValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>Number</code> |  |
| size | <code>Number</code> |  |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="InstanceValidator+checkPositionIndexes"></a>

### instanceValidator.checkPositionIndexes(start, end, size, [message]) ⇒ <code>this</code>
Ensures that start and end specify a valid positions in an array, list or string of size size, and are in order.

**Kind**: instance method of <code>[InstanceValidator](#InstanceValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| start | <code>Number</code> |  |
| end | <code>Number</code> |  |
| size | <code>Number</code> |  |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

