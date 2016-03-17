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
  var preconditions = require("preconditions").errr();
    
  preconditions.shouldBeDefined(someObj.valueOne, "Custom error message.").test();
  preconditions.shouldBeDefined(someObj.valueTwo, "Error (%s:%s): Error Message.", [errType, errCode]).test();
  preconditions.shouldBeUndefined(someObj.valueThree, "Custom error message.").debug({param1: "someDebugParam"}).test();
  preconditions.checkPositionIndex(5, 10, "Custom error message.").appendTo(someErrorObj).test();
  preconditions.shouldBeDefined(someObj.valueTwo, "Error (%s:%s): Error Message.", [errType, errCode]);
    .debug({param1: "someDebugParam"})
    .appendTo(someErrorObj)
    .test();  
</pre>

### Examples Using the Singleton Interface (.singleton())

You can use a static instance to verify one value at a time.
<pre>
  var preconditions = require("preconditions").singleton();

  preconditions.shouldBeDefined(someObj.valueOne
    .shouldBeString(someObj.valueTwo, "Error (%s:%s): Error Message.", [errType, errCode]).test();
    .shouldBeUndefined(someObj.valueThree, "Custom error message.");
</pre>

### Examples Using Instance Interface (.instance())
Should not be used in production code!

#### Setup Instance
<pre>
  var preconditions = require("preconditions").instance(this);
  
  preconditions.shouldBeDefined("foo.deep.stringValue", "Custom error message.")
    .checkArguments("FOO" === "FOO");
    .shouldBeDefined("foo.deep.emptyArray")
    .shouldBeUndefined("foo.deep.someValue", "Custom error message.")
    .checkPositionIndex(5, 10, "Custom error message.")
    .shouldBeFunction("foo.deep.functionValue");
</pre>

### Examples Using The Constructor (.constructor())
Should not be used in production code!

The Preconditions object itself is exposed so that you can extend the Preconditions class.
<pre>
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

## API

<dl>
<dt><a href="#ErrInstanceValidation">ErrInstanceValidation</a></dt>
<dd></dd>
<dt><a href="#ErrrDecorator">ErrrDecorator</a></dt>
<dd><p>Error Builder allows you to use optional functions to build an error object.  The error can have appended stack traces and debug params to assist with debugging.</p>
</dd>
</dl>

## Members

<dl>
<dt><a href="#errSingletonValidation">errSingletonValidation</a></dt>
<dd><p>Validate single value with a chainable interface.
Use this interface if you want to utilize the following functionality:</p>
<ol>
<li>Error message templating. 2. Only templates error message if validation fails which saves event queue cycles.</li>
<li>Chain together precondition validations.</li>
</ol>
</dd>
<dt><a href="#ErrrFactory">ErrrFactory</a></dt>
<dd><p>Validate single value with a buildable interface on top of the errr node module.
Use this interface if you want to utilize the following functionality:</p>
<ol>
<li>Error message templating. 2. Only templates error message if validation fails which saves event queue cycles.</li>
<li>Gives ability to append Stack traces to an existing error. 4. Gives ability to append debug params to stack trace.</li>
</ol>
</dd>
</dl>

<a name="ErrInstanceValidation"></a>

## ErrInstanceValidation
**Kind**: global class  
**Warning**: - This interface will not perform as well 'singleton' or 'errr' interfaces.  Please use those if possible.

Validate values in a nested object using a dot notation structure (e.g. .shouldBeString("Person.Address.Street.zip"))
System will validate the the Person, Person.Address, and Person.Address.Street objects exist, and will validate that zip is a String.

Use this interface if you want to utilize the following functionality:
1. Nested object validation using a dot notation.  

* [ErrInstanceValidation](#ErrInstanceValidation)
    * [new ErrInstanceValidation(objectUnderTest)](#new_ErrInstanceValidation_new)
    * [.shouldBeDefined(configPath, [message])](#ErrInstanceValidation+shouldBeDefined) ⇒ <code>this</code>
    * [.shouldBeUndefined(configPath, [message])](#ErrInstanceValidation+shouldBeUndefined) ⇒ <code>this</code>
    * [.shouldBeNonEmptyArray(configPath, [message])](#ErrInstanceValidation+shouldBeNonEmptyArray) ⇒ <code>this</code>
    * [.shouldBeArray(configPath, [message])](#ErrInstanceValidation+shouldBeArray) ⇒ <code>this</code>
    * [.shouldNotBeArray(configPath, [message])](#ErrInstanceValidation+shouldNotBeArray) ⇒ <code>this</code>
    * [.shouldBeObject(configPath, [message])](#ErrInstanceValidation+shouldBeObject) ⇒ <code>this</code>
    * [.shouldNotBeObject(configPath, [message])](#ErrInstanceValidation+shouldNotBeObject) ⇒ <code>this</code>
    * [.shouldBeEmpty(configPath, [message])](#ErrInstanceValidation+shouldBeEmpty) ⇒ <code>this</code>
    * [.shouldNotBeEmpty(configPath, [message])](#ErrInstanceValidation+shouldNotBeEmpty) ⇒ <code>this</code>
    * [.shouldBeFunction(configPath, [message])](#ErrInstanceValidation+shouldBeFunction) ⇒ <code>this</code>
    * [.shouldNotBeFunction(configPath, [message])](#ErrInstanceValidation+shouldNotBeFunction) ⇒ <code>this</code>
    * [.shouldBeString(configPath, [message])](#ErrInstanceValidation+shouldBeString) ⇒ <code>this</code>
    * [.shouldNotBeString(configPath, [message])](#ErrInstanceValidation+shouldNotBeString) ⇒ <code>this</code>
    * [.shouldBeNumber(configPath, [message])](#ErrInstanceValidation+shouldBeNumber) ⇒ <code>this</code>
    * [.shouldNotBeNumber(configPath, [message])](#ErrInstanceValidation+shouldNotBeNumber) ⇒ <code>this</code>
    * [.shouldBeFinite(configPath, [message])](#ErrInstanceValidation+shouldBeFinite) ⇒ <code>this</code>
    * [.shouldBeInfinite(configPath, [message])](#ErrInstanceValidation+shouldBeInfinite) ⇒ <code>this</code>
    * [.shouldBeBoolean(configPath, [message])](#ErrInstanceValidation+shouldBeBoolean) ⇒ <code>this</code>
    * [.shouldNotBeBoolean(configPath, [message])](#ErrInstanceValidation+shouldNotBeBoolean) ⇒ <code>this</code>
    * [.shouldBeDate(configPath, [message])](#ErrInstanceValidation+shouldBeDate) ⇒ <code>this</code>
    * [.shouldNotBeDate(configPath, [message])](#ErrInstanceValidation+shouldNotBeDate) ⇒ <code>this</code>
    * [.shouldBeRegExp(configPath, [message])](#ErrInstanceValidation+shouldBeRegExp) ⇒ <code>this</code>
    * [.shouldNotBeRegExp(configPath, [message])](#ErrInstanceValidation+shouldNotBeRegExp) ⇒ <code>this</code>
    * [.shouldBeFalsey(configPath, [message])](#ErrInstanceValidation+shouldBeFalsey) ⇒ <code>this</code>
    * [.shouldNotBeFalsey(configPath, [message])](#ErrInstanceValidation+shouldNotBeFalsey) ⇒ <code>this</code>
    * [.shouldBeFalsy(configPath, [message])](#ErrInstanceValidation+shouldBeFalsy) ⇒ <code>this</code>
    * [.shouldNotBeFalsy(configPath, [message])](#ErrInstanceValidation+shouldNotBeFalsy) ⇒ <code>this</code>
    * [.shouldBeTruthy(configPath, [message])](#ErrInstanceValidation+shouldBeTruthy) ⇒ <code>this</code>
    * [.shouldNotBeTruthy(configPath, [message])](#ErrInstanceValidation+shouldNotBeTruthy) ⇒ <code>this</code>
    * [.checkArgument(expression, [message], [template])](#ErrInstanceValidation+checkArgument) ⇒ <code>this</code>
    * [.checkState(expression, [message])](#ErrInstanceValidation+checkState) ⇒ <code>this</code>
    * [.checkElementIndex(index, size, [message])](#ErrInstanceValidation+checkElementIndex) ⇒ <code>this</code>
    * [.checkPositionIndex(index, size, [message])](#ErrInstanceValidation+checkPositionIndex) ⇒ <code>this</code>
    * [.checkPositionIndexes(start, end, size, [message])](#ErrInstanceValidation+checkPositionIndexes) ⇒ <code>this</code>

<a name="new_ErrInstanceValidation_new"></a>

### new ErrInstanceValidation(objectUnderTest)

| Param | Type | Description |
| --- | --- | --- |
| objectUnderTest | <code>Object</code> | Object to run validations against. |

<a name="ErrInstanceValidation+shouldBeDefined"></a>

### errInstanceValidation.shouldBeDefined(configPath, [message]) ⇒ <code>this</code>
Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is defined.

**Kind**: instance method of <code>[ErrInstanceValidation](#ErrInstanceValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="ErrInstanceValidation+shouldBeUndefined"></a>

### errInstanceValidation.shouldBeUndefined(configPath, [message]) ⇒ <code>this</code>
Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is not defined.

**Kind**: instance method of <code>[ErrInstanceValidation](#ErrInstanceValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="ErrInstanceValidation+shouldBeNonEmptyArray"></a>

### errInstanceValidation.shouldBeNonEmptyArray(configPath, [message]) ⇒ <code>this</code>
Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is not an array or is an empty array.

**Kind**: instance method of <code>[ErrInstanceValidation](#ErrInstanceValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="ErrInstanceValidation+shouldBeArray"></a>

### errInstanceValidation.shouldBeArray(configPath, [message]) ⇒ <code>this</code>
Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is an array.

**Kind**: instance method of <code>[ErrInstanceValidation](#ErrInstanceValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="ErrInstanceValidation+shouldNotBeArray"></a>

### errInstanceValidation.shouldNotBeArray(configPath, [message]) ⇒ <code>this</code>
Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is not an array.

**Kind**: instance method of <code>[ErrInstanceValidation](#ErrInstanceValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="ErrInstanceValidation+shouldBeObject"></a>

### errInstanceValidation.shouldBeObject(configPath, [message]) ⇒ <code>this</code>
Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is of type Object.

**Kind**: instance method of <code>[ErrInstanceValidation](#ErrInstanceValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="ErrInstanceValidation+shouldNotBeObject"></a>

### errInstanceValidation.shouldNotBeObject(configPath, [message]) ⇒ <code>this</code>
Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is not of type Object.

**Kind**: instance method of <code>[ErrInstanceValidation](#ErrInstanceValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="ErrInstanceValidation+shouldBeEmpty"></a>

### errInstanceValidation.shouldBeEmpty(configPath, [message]) ⇒ <code>this</code>
Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is not empty.

**Kind**: instance method of <code>[ErrInstanceValidation](#ErrInstanceValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="ErrInstanceValidation+shouldNotBeEmpty"></a>

### errInstanceValidation.shouldNotBeEmpty(configPath, [message]) ⇒ <code>this</code>
Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is empty.

**Kind**: instance method of <code>[ErrInstanceValidation](#ErrInstanceValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="ErrInstanceValidation+shouldBeFunction"></a>

### errInstanceValidation.shouldBeFunction(configPath, [message]) ⇒ <code>this</code>
Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is not of type Function.

**Kind**: instance method of <code>[ErrInstanceValidation](#ErrInstanceValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="ErrInstanceValidation+shouldNotBeFunction"></a>

### errInstanceValidation.shouldNotBeFunction(configPath, [message]) ⇒ <code>this</code>
Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is of type Function.

**Kind**: instance method of <code>[ErrInstanceValidation](#ErrInstanceValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="ErrInstanceValidation+shouldBeString"></a>

### errInstanceValidation.shouldBeString(configPath, [message]) ⇒ <code>this</code>
Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is not of type String.

**Kind**: instance method of <code>[ErrInstanceValidation](#ErrInstanceValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="ErrInstanceValidation+shouldNotBeString"></a>

### errInstanceValidation.shouldNotBeString(configPath, [message]) ⇒ <code>this</code>
Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is of type String.

**Kind**: instance method of <code>[ErrInstanceValidation](#ErrInstanceValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="ErrInstanceValidation+shouldBeNumber"></a>

### errInstanceValidation.shouldBeNumber(configPath, [message]) ⇒ <code>this</code>
Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is not of type Number.

**Kind**: instance method of <code>[ErrInstanceValidation](#ErrInstanceValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="ErrInstanceValidation+shouldNotBeNumber"></a>

### errInstanceValidation.shouldNotBeNumber(configPath, [message]) ⇒ <code>this</code>
Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is of type Number.

**Kind**: instance method of <code>[ErrInstanceValidation](#ErrInstanceValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="ErrInstanceValidation+shouldBeFinite"></a>

### errInstanceValidation.shouldBeFinite(configPath, [message]) ⇒ <code>this</code>
Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is not finite.

**Kind**: instance method of <code>[ErrInstanceValidation](#ErrInstanceValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="ErrInstanceValidation+shouldBeInfinite"></a>

### errInstanceValidation.shouldBeInfinite(configPath, [message]) ⇒ <code>this</code>
Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is not infinte.

**Kind**: instance method of <code>[ErrInstanceValidation](#ErrInstanceValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="ErrInstanceValidation+shouldBeBoolean"></a>

### errInstanceValidation.shouldBeBoolean(configPath, [message]) ⇒ <code>this</code>
Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is not of type Boolean.

**Kind**: instance method of <code>[ErrInstanceValidation](#ErrInstanceValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="ErrInstanceValidation+shouldNotBeBoolean"></a>

### errInstanceValidation.shouldNotBeBoolean(configPath, [message]) ⇒ <code>this</code>
Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is of type Boolean.

**Kind**: instance method of <code>[ErrInstanceValidation](#ErrInstanceValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="ErrInstanceValidation+shouldBeDate"></a>

### errInstanceValidation.shouldBeDate(configPath, [message]) ⇒ <code>this</code>
Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is not of type Date.

**Kind**: instance method of <code>[ErrInstanceValidation](#ErrInstanceValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="ErrInstanceValidation+shouldNotBeDate"></a>

### errInstanceValidation.shouldNotBeDate(configPath, [message]) ⇒ <code>this</code>
Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is of type Date.

**Kind**: instance method of <code>[ErrInstanceValidation](#ErrInstanceValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="ErrInstanceValidation+shouldBeRegExp"></a>

### errInstanceValidation.shouldBeRegExp(configPath, [message]) ⇒ <code>this</code>
Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is not a Regular Expression.

**Kind**: instance method of <code>[ErrInstanceValidation](#ErrInstanceValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="ErrInstanceValidation+shouldNotBeRegExp"></a>

### errInstanceValidation.shouldNotBeRegExp(configPath, [message]) ⇒ <code>this</code>
Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is a Regular Expression.

**Kind**: instance method of <code>[ErrInstanceValidation](#ErrInstanceValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="ErrInstanceValidation+shouldBeFalsey"></a>

### errInstanceValidation.shouldBeFalsey(configPath, [message]) ⇒ <code>this</code>
Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is not falsey.

**Kind**: instance method of <code>[ErrInstanceValidation](#ErrInstanceValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="ErrInstanceValidation+shouldNotBeFalsey"></a>

### errInstanceValidation.shouldNotBeFalsey(configPath, [message]) ⇒ <code>this</code>
Throws an error if any value does not exist in the objectToTest, from configPath. Throws an error if the last key from configPath is falsey.

**Kind**: instance method of <code>[ErrInstanceValidation](#ErrInstanceValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="ErrInstanceValidation+shouldBeFalsy"></a>

### errInstanceValidation.shouldBeFalsy(configPath, [message]) ⇒ <code>this</code>
Synonym for shouldBeFalsey.

**Kind**: instance method of <code>[ErrInstanceValidation](#ErrInstanceValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="ErrInstanceValidation+shouldNotBeFalsy"></a>

### errInstanceValidation.shouldNotBeFalsy(configPath, [message]) ⇒ <code>this</code>
Synonym for shouldNotBeFalsey.

**Kind**: instance method of <code>[ErrInstanceValidation](#ErrInstanceValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="ErrInstanceValidation+shouldBeTruthy"></a>

### errInstanceValidation.shouldBeTruthy(configPath, [message]) ⇒ <code>this</code>
Synonym for shouldNotBeFalsey.

**Kind**: instance method of <code>[ErrInstanceValidation](#ErrInstanceValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="ErrInstanceValidation+shouldNotBeTruthy"></a>

### errInstanceValidation.shouldNotBeTruthy(configPath, [message]) ⇒ <code>this</code>
Synonym for shouldBeFalsey.

**Kind**: instance method of <code>[ErrInstanceValidation](#ErrInstanceValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| configPath | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="ErrInstanceValidation+checkArgument"></a>

### errInstanceValidation.checkArgument(expression, [message], [template]) ⇒ <code>this</code>
Ensures the truth of an expression involving one or more parameters to the calling method.

**Kind**: instance method of <code>[ErrInstanceValidation](#ErrInstanceValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| expression | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrInstanceValidation+checkState"></a>

### errInstanceValidation.checkState(expression, [message]) ⇒ <code>this</code>
Ensures the truth of an expression involving the state of the calling instance, but not involving any parameters to the calling method.

**Kind**: instance method of <code>[ErrInstanceValidation](#ErrInstanceValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| expression | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="ErrInstanceValidation+checkElementIndex"></a>

### errInstanceValidation.checkElementIndex(index, size, [message]) ⇒ <code>this</code>
Ensures that index specifies a valid element in an array, list or string of size size.

**Kind**: instance method of <code>[ErrInstanceValidation](#ErrInstanceValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>Number</code> |  |
| size | <code>Number</code> |  |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="ErrInstanceValidation+checkPositionIndex"></a>

### errInstanceValidation.checkPositionIndex(index, size, [message]) ⇒ <code>this</code>
Ensures that index specifies a valid position in an array, list or string of size size.

**Kind**: instance method of <code>[ErrInstanceValidation](#ErrInstanceValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>Number</code> |  |
| size | <code>Number</code> |  |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="ErrInstanceValidation+checkPositionIndexes"></a>

### errInstanceValidation.checkPositionIndexes(start, end, size, [message]) ⇒ <code>this</code>
Ensures that start and end specify a valid positions in an array, list or string of size size, and are in order.

**Kind**: instance method of <code>[ErrInstanceValidation](#ErrInstanceValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| start | <code>Number</code> |  |
| end | <code>Number</code> |  |
| size | <code>Number</code> |  |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |

<a name="ErrrDecorator"></a>

## ErrrDecorator
Error Builder allows you to use optional functions to build an error object.  The error can have appended stack traces and debug params to assist with debugging.

**Kind**: global class  

* [ErrrDecorator](#ErrrDecorator)
    * [new ErrrDecorator([message], [template])](#new_ErrrDecorator_new)
    * [.debug(params, [shouldDebug])](#ErrrDecorator+debug) ⇒ <code>ErrorBuilder</code>
    * [.appendTo(err)](#ErrrDecorator+appendTo) ⇒ <code>ErrorBuilder</code>
    * [.test()](#ErrrDecorator+test)
    * [.t()](#ErrrDecorator+t)

<a name="new_ErrrDecorator_new"></a>

### new ErrrDecorator([message], [template])
Provides an interface to build an error.  Then allows you to get or throw the error.


| Param | Type | Description |
| --- | --- | --- |
| [message] | <code>String</code> | Error message that will supplied to Error Object. |
| [template] | <code>Array</code> | Array of parameters.  If given, util.format(message, template) will be applied to the message string. |

<a name="ErrrDecorator+debug"></a>

### errrDecorator.debug(params, [shouldDebug]) ⇒ <code>ErrorBuilder</code>
Decorated function from 'errr' module. Add parameters to the stack trace that will make it easier to debug the problem.

**Kind**: instance method of <code>[ErrrDecorator](#ErrrDecorator)</code>  
**Returns**: <code>ErrorBuilder</code> - - Returns the instance of errorBuilder to allow chainability.  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> | Object Map of key value parameters that will make it easier to debug the error. |
| [shouldDebug] | <code>Boolean</code> | If shouldDebug === false, then debug params will not print.  Any other value (including undefined), and the debug params will be printed. Useful if you want to only print debugParams given an Environment Variable. |

<a name="ErrrDecorator+appendTo"></a>

### errrDecorator.appendTo(err) ⇒ <code>ErrorBuilder</code>
Decorated function from 'errr' module. Append the error being built, to the end of this error's stack trace.

**Kind**: instance method of <code>[ErrrDecorator](#ErrrDecorator)</code>  
**Returns**: <code>ErrorBuilder</code> - - Returns the instance of errorBuilder to allow chainability.  

| Param | Type | Description |
| --- | --- | --- |
| err | <code>Error</code> | The stack trace of the error being built, will be appended to this error's stack trace. |

<a name="ErrrDecorator+test"></a>

### errrDecorator.test()
Validate preconditions check and throw an errr if it fails.

**Kind**: instance method of <code>[ErrrDecorator](#ErrrDecorator)</code>  
<a name="ErrrDecorator+t"></a>

### errrDecorator.t()
Synonym for the test function.

**Kind**: instance method of <code>[ErrrDecorator](#ErrrDecorator)</code>  
<a name="errSingletonValidation"></a>

## errSingletonValidation
Validate single value with a chainable interface.
Use this interface if you want to utilize the following functionality:
1. Error message templating. 2. Only templates error message if validation fails which saves event queue cycles.
3. Chain together precondition validations.

**Kind**: global variable  

* [errSingletonValidation](#errSingletonValidation)
    * [.shouldBeDefined(val, [message], [template])](#errSingletonValidation.shouldBeDefined) ⇒ <code>this</code>
    * [.shouldBeUndefined(val, [message], [template])](#errSingletonValidation.shouldBeUndefined) ⇒ <code>this</code>
    * [.shouldBeArray(val, [message], [template])](#errSingletonValidation.shouldBeArray) ⇒ <code>this</code>
    * [.shouldNotBeArray(val, [message], [template])](#errSingletonValidation.shouldNotBeArray) ⇒ <code>this</code>
    * [.shouldBeObject(val, [message], [template])](#errSingletonValidation.shouldBeObject) ⇒ <code>this</code>
    * [.shouldNotBeObject(val, [message], [template])](#errSingletonValidation.shouldNotBeObject) ⇒ <code>this</code>
    * [.shouldBeEmpty(val, [message], [template])](#errSingletonValidation.shouldBeEmpty) ⇒ <code>this</code>
    * [.shouldNotBeEmpty(val, [message], [template])](#errSingletonValidation.shouldNotBeEmpty) ⇒ <code>this</code>
    * [.shouldBeFunction(val, [message], [template])](#errSingletonValidation.shouldBeFunction) ⇒ <code>this</code>
    * [.shouldNotBeFunction(val, [message], [template])](#errSingletonValidation.shouldNotBeFunction) ⇒ <code>this</code>
    * [.shouldBeString(val, [message], [template])](#errSingletonValidation.shouldBeString) ⇒ <code>this</code>
    * [.shouldNotBeString(val, [message], [template])](#errSingletonValidation.shouldNotBeString) ⇒ <code>this</code>
    * [.shouldBeNumber(val, [message], [template])](#errSingletonValidation.shouldBeNumber) ⇒ <code>this</code>
    * [.shouldNotBeNumber(val, [message], [template])](#errSingletonValidation.shouldNotBeNumber) ⇒ <code>this</code>
    * [.shouldBeFinite(val, [message], [template])](#errSingletonValidation.shouldBeFinite) ⇒ <code>this</code>
    * [.shouldBeInfinite(val, [message], [template])](#errSingletonValidation.shouldBeInfinite) ⇒ <code>this</code>
    * [.shouldBeBoolean(val, [message], [template])](#errSingletonValidation.shouldBeBoolean) ⇒ <code>this</code>
    * [.shouldNotBeBoolean(val, [message], [template])](#errSingletonValidation.shouldNotBeBoolean) ⇒ <code>this</code>
    * [.shouldBeDate(val, [message], [template])](#errSingletonValidation.shouldBeDate) ⇒ <code>this</code>
    * [.shouldNotBeDate(val, [message], [template])](#errSingletonValidation.shouldNotBeDate) ⇒ <code>this</code>
    * [.shouldBeRegExp(val, [message], [template])](#errSingletonValidation.shouldBeRegExp) ⇒ <code>this</code>
    * [.shouldNotBeRegExp(val, [message], [template])](#errSingletonValidation.shouldNotBeRegExp) ⇒ <code>this</code>
    * [.shouldBeFalsey(val, [message], [template])](#errSingletonValidation.shouldBeFalsey) ⇒ <code>this</code>
    * [.shouldNotBeFalsey(val, [message], [template])](#errSingletonValidation.shouldNotBeFalsey) ⇒ <code>this</code>
    * [.shouldBeFalsy(val, [message], [template])](#errSingletonValidation.shouldBeFalsy) ⇒ <code>this</code>
    * [.shouldNotBeFalsy(val, [message], [template])](#errSingletonValidation.shouldNotBeFalsy) ⇒ <code>this</code>
    * [.shouldBeTruthy(val, [message], [template])](#errSingletonValidation.shouldBeTruthy) ⇒ <code>this</code>
    * [.shouldNotBeTruthy(val, [message], [template])](#errSingletonValidation.shouldNotBeTruthy) ⇒ <code>this</code>
    * [.checkArgument(expression, [message], [template])](#errSingletonValidation.checkArgument) ⇒ <code>this</code>
    * [.checkState(expression, [message], [template])](#errSingletonValidation.checkState) ⇒ <code>this</code>
    * [.checkElementIndex(index, size, [message], [template])](#errSingletonValidation.checkElementIndex) ⇒ <code>this</code>
    * [.checkPositionIndex(index, size, [message], [template])](#errSingletonValidation.checkPositionIndex) ⇒ <code>this</code>
    * [.checkPositionIndexes(start, end, size, [message], [template])](#errSingletonValidation.checkPositionIndexes) ⇒ <code>this</code>

<a name="errSingletonValidation.shouldBeDefined"></a>

### errSingletonValidation.shouldBeDefined(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is not defined.

**Kind**: static method of <code>[errSingletonValidation](#errSingletonValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="errSingletonValidation.shouldBeUndefined"></a>

### errSingletonValidation.shouldBeUndefined(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is defined.

**Kind**: static method of <code>[errSingletonValidation](#errSingletonValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="errSingletonValidation.shouldBeArray"></a>

### errSingletonValidation.shouldBeArray(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is not of type Array.

**Kind**: static method of <code>[errSingletonValidation](#errSingletonValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="errSingletonValidation.shouldNotBeArray"></a>

### errSingletonValidation.shouldNotBeArray(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is of type Array.

**Kind**: static method of <code>[errSingletonValidation](#errSingletonValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="errSingletonValidation.shouldBeObject"></a>

### errSingletonValidation.shouldBeObject(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is not of type Object.

**Kind**: static method of <code>[errSingletonValidation](#errSingletonValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="errSingletonValidation.shouldNotBeObject"></a>

### errSingletonValidation.shouldNotBeObject(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is of type Object.

**Kind**: static method of <code>[errSingletonValidation](#errSingletonValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="errSingletonValidation.shouldBeEmpty"></a>

### errSingletonValidation.shouldBeEmpty(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is not empty.

**Kind**: static method of <code>[errSingletonValidation](#errSingletonValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="errSingletonValidation.shouldNotBeEmpty"></a>

### errSingletonValidation.shouldNotBeEmpty(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is empty.

**Kind**: static method of <code>[errSingletonValidation](#errSingletonValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="errSingletonValidation.shouldBeFunction"></a>

### errSingletonValidation.shouldBeFunction(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is not of type Function.

**Kind**: static method of <code>[errSingletonValidation](#errSingletonValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="errSingletonValidation.shouldNotBeFunction"></a>

### errSingletonValidation.shouldNotBeFunction(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is of type Function.

**Kind**: static method of <code>[errSingletonValidation](#errSingletonValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="errSingletonValidation.shouldBeString"></a>

### errSingletonValidation.shouldBeString(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is not of type String.

**Kind**: static method of <code>[errSingletonValidation](#errSingletonValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="errSingletonValidation.shouldNotBeString"></a>

### errSingletonValidation.shouldNotBeString(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is of type String.

**Kind**: static method of <code>[errSingletonValidation](#errSingletonValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="errSingletonValidation.shouldBeNumber"></a>

### errSingletonValidation.shouldBeNumber(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is not of type Number.

**Kind**: static method of <code>[errSingletonValidation](#errSingletonValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="errSingletonValidation.shouldNotBeNumber"></a>

### errSingletonValidation.shouldNotBeNumber(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is of type Number.

**Kind**: static method of <code>[errSingletonValidation](#errSingletonValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="errSingletonValidation.shouldBeFinite"></a>

### errSingletonValidation.shouldBeFinite(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is not finite.

**Kind**: static method of <code>[errSingletonValidation](#errSingletonValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="errSingletonValidation.shouldBeInfinite"></a>

### errSingletonValidation.shouldBeInfinite(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is not infinite.

**Kind**: static method of <code>[errSingletonValidation](#errSingletonValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="errSingletonValidation.shouldBeBoolean"></a>

### errSingletonValidation.shouldBeBoolean(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is not of type Boolean.

**Kind**: static method of <code>[errSingletonValidation](#errSingletonValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="errSingletonValidation.shouldNotBeBoolean"></a>

### errSingletonValidation.shouldNotBeBoolean(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is of type Boolean.

**Kind**: static method of <code>[errSingletonValidation](#errSingletonValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="errSingletonValidation.shouldBeDate"></a>

### errSingletonValidation.shouldBeDate(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is not of type Date.

**Kind**: static method of <code>[errSingletonValidation](#errSingletonValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="errSingletonValidation.shouldNotBeDate"></a>

### errSingletonValidation.shouldNotBeDate(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is of type Date.

**Kind**: static method of <code>[errSingletonValidation](#errSingletonValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="errSingletonValidation.shouldBeRegExp"></a>

### errSingletonValidation.shouldBeRegExp(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is not a Regular Expression.

**Kind**: static method of <code>[errSingletonValidation](#errSingletonValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="errSingletonValidation.shouldNotBeRegExp"></a>

### errSingletonValidation.shouldNotBeRegExp(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is a Regular Expression.

**Kind**: static method of <code>[errSingletonValidation](#errSingletonValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="errSingletonValidation.shouldBeFalsey"></a>

### errSingletonValidation.shouldBeFalsey(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is not falsey.

**Kind**: static method of <code>[errSingletonValidation](#errSingletonValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="errSingletonValidation.shouldNotBeFalsey"></a>

### errSingletonValidation.shouldNotBeFalsey(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is falsey.

**Kind**: static method of <code>[errSingletonValidation](#errSingletonValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="errSingletonValidation.shouldBeFalsy"></a>

### errSingletonValidation.shouldBeFalsy(val, [message], [template]) ⇒ <code>this</code>
Synonym for shouldBeFalsey.

**Kind**: static method of <code>[errSingletonValidation](#errSingletonValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="errSingletonValidation.shouldNotBeFalsy"></a>

### errSingletonValidation.shouldNotBeFalsy(val, [message], [template]) ⇒ <code>this</code>
Synonym for shouldNotBeFalsey.

**Kind**: static method of <code>[errSingletonValidation](#errSingletonValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="errSingletonValidation.shouldBeTruthy"></a>

### errSingletonValidation.shouldBeTruthy(val, [message], [template]) ⇒ <code>this</code>
Synonym for shouldNotBeFalsey.

**Kind**: static method of <code>[errSingletonValidation](#errSingletonValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="errSingletonValidation.shouldNotBeTruthy"></a>

### errSingletonValidation.shouldNotBeTruthy(val, [message], [template]) ⇒ <code>this</code>
Synonym for shouldBeFalsey.

**Kind**: static method of <code>[errSingletonValidation](#errSingletonValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="errSingletonValidation.checkArgument"></a>

### errSingletonValidation.checkArgument(expression, [message], [template]) ⇒ <code>this</code>
Ensures the truth of an expression involving one or more parameters to the calling method.

**Kind**: static method of <code>[errSingletonValidation](#errSingletonValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| expression | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="errSingletonValidation.checkState"></a>

### errSingletonValidation.checkState(expression, [message], [template]) ⇒ <code>this</code>
Ensures the truth of an expression involving the state of the calling instance, but not involving any parameters to the calling method.

**Kind**: static method of <code>[errSingletonValidation](#errSingletonValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| expression | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="errSingletonValidation.checkElementIndex"></a>

### errSingletonValidation.checkElementIndex(index, size, [message], [template]) ⇒ <code>this</code>
Ensures that index specifies a valid element in an array, list or string of size size.

**Kind**: static method of <code>[errSingletonValidation](#errSingletonValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>Number</code> |  |
| size | <code>Number</code> |  |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="errSingletonValidation.checkPositionIndex"></a>

### errSingletonValidation.checkPositionIndex(index, size, [message], [template]) ⇒ <code>this</code>
Ensures that index specifies a valid position in an array, list or string of size size.

**Kind**: static method of <code>[errSingletonValidation](#errSingletonValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>Number</code> |  |
| size | <code>Number</code> |  |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="errSingletonValidation.checkPositionIndexes"></a>

### errSingletonValidation.checkPositionIndexes(start, end, size, [message], [template]) ⇒ <code>this</code>
Ensures that start and end specify a valid positions in an array, list or string of size size, and are in order.

**Kind**: static method of <code>[errSingletonValidation](#errSingletonValidation)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| start | <code>Number</code> |  |
| end | <code>Number</code> |  |
| size | <code>Number</code> |  |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrFactory"></a>

## ErrrFactory
Validate single value with a buildable interface on top of the errr node module.
Use this interface if you want to utilize the following functionality:
1. Error message templating. 2. Only templates error message if validation fails which saves event queue cycles.
3. Gives ability to append Stack traces to an existing error. 4. Gives ability to append debug params to stack trace.

**Kind**: global variable  

* [ErrrFactory](#ErrrFactory)
    * [.shouldBeDefined(val, [message], [template])](#ErrrFactory.shouldBeDefined) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldBeUndefined(val, [message], [template])](#ErrrFactory.shouldBeUndefined) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldBeArray(val, [message], [template])](#ErrrFactory.shouldBeArray) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldNotBeArray(val, [message], [template])](#ErrrFactory.shouldNotBeArray) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldBeObject(val, [message], [template])](#ErrrFactory.shouldBeObject) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldNotBeObject(val, [message], [template])](#ErrrFactory.shouldNotBeObject) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldBeEmpty(val, [message], [template])](#ErrrFactory.shouldBeEmpty) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldNotBeEmpty(val, [message], [template])](#ErrrFactory.shouldNotBeEmpty) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldBeFunction(val, [message], [template])](#ErrrFactory.shouldBeFunction) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldNotBeFunction(val, [message], [template])](#ErrrFactory.shouldNotBeFunction) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldBeString(val, [message], [template])](#ErrrFactory.shouldBeString) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldNotBeString(val, [message], [template])](#ErrrFactory.shouldNotBeString) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldBeNumber(val, [message], [template])](#ErrrFactory.shouldBeNumber) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldNotBeNumber(val, [message], [template])](#ErrrFactory.shouldNotBeNumber) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldBeFinite(val, [message], [template])](#ErrrFactory.shouldBeFinite) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldBeInfinite(val, [message], [template])](#ErrrFactory.shouldBeInfinite) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldBeBoolean(val, [message], [template])](#ErrrFactory.shouldBeBoolean) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldNotBeBoolean(val, [message], [template])](#ErrrFactory.shouldNotBeBoolean) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldBeDate(val, [message], [template])](#ErrrFactory.shouldBeDate) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldNotBeDate(val, [message], [template])](#ErrrFactory.shouldNotBeDate) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldBeRegExp(val, [message], [template])](#ErrrFactory.shouldBeRegExp) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldNotBeRegExp(val, [message], [template])](#ErrrFactory.shouldNotBeRegExp) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldBeFalsey(val, [message], [template])](#ErrrFactory.shouldBeFalsey) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldNotBeFalsey(val, [message], [template])](#ErrrFactory.shouldNotBeFalsey) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldBeFalsy(val, [message], [template])](#ErrrFactory.shouldBeFalsy) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldNotBeFalsy(val, [message], [template])](#ErrrFactory.shouldNotBeFalsy) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldBeTruthy(val, [message], [template])](#ErrrFactory.shouldBeTruthy) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldNotBeTruthy(val, [message], [template])](#ErrrFactory.shouldNotBeTruthy) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.checkArgument(expression, [message], [template])](#ErrrFactory.checkArgument) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.checkState(expression, [message], [template])](#ErrrFactory.checkState) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.checkElementIndex(index, size, [message], [template])](#ErrrFactory.checkElementIndex) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.checkPositionIndex(index, size, [message], [template])](#ErrrFactory.checkPositionIndex) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.checkPositionIndexes(start, end, size, [message], [template])](#ErrrFactory.checkPositionIndexes) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>

<a name="ErrrFactory.shouldBeDefined"></a>

### ErrrFactory.shouldBeDefined(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Throws an error if 'val' is not defined.

**Kind**: static method of <code>[ErrrFactory](#ErrrFactory)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrFactory.shouldBeUndefined"></a>

### ErrrFactory.shouldBeUndefined(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Throws an error if 'val' is defined.

**Kind**: static method of <code>[ErrrFactory](#ErrrFactory)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrFactory.shouldBeArray"></a>

### ErrrFactory.shouldBeArray(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Throws an error if 'val' is not of type Array.

**Kind**: static method of <code>[ErrrFactory](#ErrrFactory)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrFactory.shouldNotBeArray"></a>

### ErrrFactory.shouldNotBeArray(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Throws an error if 'val' is of type Array.

**Kind**: static method of <code>[ErrrFactory](#ErrrFactory)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrFactory.shouldBeObject"></a>

### ErrrFactory.shouldBeObject(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Throws an error if 'val' is not of type Object.

**Kind**: static method of <code>[ErrrFactory](#ErrrFactory)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrFactory.shouldNotBeObject"></a>

### ErrrFactory.shouldNotBeObject(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Throws an error if 'val' is of type Object.

**Kind**: static method of <code>[ErrrFactory](#ErrrFactory)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrFactory.shouldBeEmpty"></a>

### ErrrFactory.shouldBeEmpty(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Throws an error if 'val' is not empty.

**Kind**: static method of <code>[ErrrFactory](#ErrrFactory)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrFactory.shouldNotBeEmpty"></a>

### ErrrFactory.shouldNotBeEmpty(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Throws an error if 'val' is empty.

**Kind**: static method of <code>[ErrrFactory](#ErrrFactory)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrFactory.shouldBeFunction"></a>

### ErrrFactory.shouldBeFunction(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Throws an error if 'val' is not of type Function.

**Kind**: static method of <code>[ErrrFactory](#ErrrFactory)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrFactory.shouldNotBeFunction"></a>

### ErrrFactory.shouldNotBeFunction(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Throws an error if 'val' is of type Function.

**Kind**: static method of <code>[ErrrFactory](#ErrrFactory)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrFactory.shouldBeString"></a>

### ErrrFactory.shouldBeString(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Throws an error if 'val' is not of type String.

**Kind**: static method of <code>[ErrrFactory](#ErrrFactory)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrFactory.shouldNotBeString"></a>

### ErrrFactory.shouldNotBeString(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Throws an error if 'val' is of type String.

**Kind**: static method of <code>[ErrrFactory](#ErrrFactory)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrFactory.shouldBeNumber"></a>

### ErrrFactory.shouldBeNumber(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Throws an error if 'val' is not of type Number.

**Kind**: static method of <code>[ErrrFactory](#ErrrFactory)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrFactory.shouldNotBeNumber"></a>

### ErrrFactory.shouldNotBeNumber(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Throws an error if 'val' is of type Number.

**Kind**: static method of <code>[ErrrFactory](#ErrrFactory)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrFactory.shouldBeFinite"></a>

### ErrrFactory.shouldBeFinite(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Throws an error if 'val' is not finite.

**Kind**: static method of <code>[ErrrFactory](#ErrrFactory)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrFactory.shouldBeInfinite"></a>

### ErrrFactory.shouldBeInfinite(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Throws an error if 'val' is finite.

**Kind**: static method of <code>[ErrrFactory](#ErrrFactory)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrFactory.shouldBeBoolean"></a>

### ErrrFactory.shouldBeBoolean(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Throws an error if 'val' is not of type Boolean.

**Kind**: static method of <code>[ErrrFactory](#ErrrFactory)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrFactory.shouldNotBeBoolean"></a>

### ErrrFactory.shouldNotBeBoolean(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Throws an error if 'val' is of type Boolean.

**Kind**: static method of <code>[ErrrFactory](#ErrrFactory)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrFactory.shouldBeDate"></a>

### ErrrFactory.shouldBeDate(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Throws an error if 'val' is not of type Date.

**Kind**: static method of <code>[ErrrFactory](#ErrrFactory)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrFactory.shouldNotBeDate"></a>

### ErrrFactory.shouldNotBeDate(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Throws an error if 'val' is of type Date.

**Kind**: static method of <code>[ErrrFactory](#ErrrFactory)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrFactory.shouldBeRegExp"></a>

### ErrrFactory.shouldBeRegExp(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Throws an error if 'val' is not a Regular Expression.

**Kind**: static method of <code>[ErrrFactory](#ErrrFactory)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrFactory.shouldNotBeRegExp"></a>

### ErrrFactory.shouldNotBeRegExp(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Throws an error if 'val' is a Regular Expression.

**Kind**: static method of <code>[ErrrFactory](#ErrrFactory)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrFactory.shouldBeFalsey"></a>

### ErrrFactory.shouldBeFalsey(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Throws an error if 'val' is not falsey.

**Kind**: static method of <code>[ErrrFactory](#ErrrFactory)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrFactory.shouldNotBeFalsey"></a>

### ErrrFactory.shouldNotBeFalsey(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Throws an error if 'val' is falsey.

**Kind**: static method of <code>[ErrrFactory](#ErrrFactory)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrFactory.shouldBeFalsy"></a>

### ErrrFactory.shouldBeFalsy(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Synonym for shouldBeFalsey.

**Kind**: static method of <code>[ErrrFactory](#ErrrFactory)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrFactory.shouldNotBeFalsy"></a>

### ErrrFactory.shouldNotBeFalsy(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Synonym for shouldNotBeFalsey.

**Kind**: static method of <code>[ErrrFactory](#ErrrFactory)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrFactory.shouldBeTruthy"></a>

### ErrrFactory.shouldBeTruthy(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Synonym for shouldNotBeFalsey.

**Kind**: static method of <code>[ErrrFactory](#ErrrFactory)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrFactory.shouldNotBeTruthy"></a>

### ErrrFactory.shouldNotBeTruthy(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Synonym for shouldBeFalsey.

**Kind**: static method of <code>[ErrrFactory](#ErrrFactory)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrFactory.checkArgument"></a>

### ErrrFactory.checkArgument(expression, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Ensures the truth of an expression involving one or more parameters to the calling method.

**Kind**: static method of <code>[ErrrFactory](#ErrrFactory)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| expression | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrFactory.checkState"></a>

### ErrrFactory.checkState(expression, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Ensures the truth of an expression involving the state of the calling instance, but not involving any parameters to the calling method.

**Kind**: static method of <code>[ErrrFactory](#ErrrFactory)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| expression | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrFactory.checkElementIndex"></a>

### ErrrFactory.checkElementIndex(index, size, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Ensures that index specifies a valid element in an array, list or string of size size.

**Kind**: static method of <code>[ErrrFactory](#ErrrFactory)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>Number</code> |  |
| size | <code>Number</code> |  |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrFactory.checkPositionIndex"></a>

### ErrrFactory.checkPositionIndex(index, size, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Ensures that index specifies a valid position in an array, list or string of size size.

**Kind**: static method of <code>[ErrrFactory](#ErrrFactory)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>Number</code> |  |
| size | <code>Number</code> |  |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrFactory.checkPositionIndexes"></a>

### ErrrFactory.checkPositionIndexes(start, end, size, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Ensures that start and end specify a valid positions in an array, list or string of size size, and are in order.

**Kind**: static method of <code>[ErrrFactory](#ErrrFactory)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| start | <code>Number</code> |  |
| end | <code>Number</code> |  |
| size | <code>Number</code> |  |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |
