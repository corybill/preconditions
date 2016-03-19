# Preconditions Library

[![view on npm](http://img.shields.io/npm/v/preconditions.svg)](https://www.npmjs.org/package/preconditions)
[![npm module downloads](http://img.shields.io/npm/dt/preconditions.svg)](https://www.npmjs.org/package/preconditions)
[![Build Status](https://travis-ci.org/corybill/preconditions.svg?branch=master)](https://travis-ci.org/corybill/Preconditions)
[![Gitter](https://badges.gitter.im/corybill/preconditions.svg)](https://gitter.im/corybill/preconditions?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

#### Support for Guava like Precondition error checking in Node.js

<p>Ensuring a fail fast development environment can help developers find bugs quicker and easier.
Ensuring all invariants are true at an initial point of contact will help you ensure this fail fast environment.
The Preconditions library will assist you in doing just that by immediately throwing an Error
if any of your invariants fail.  You can mix and match standard Guava API with convenience functions both with
and without chaining.</p>

#### Version 2 Additions
<p>Version 2 adds a new entry point on the interface, 'errr'.  The errr interface decorates the errr node module
and helps to solve some important issues with Node, listed below. See https://www.npmjs.com/package/errr.
This version also updates the module to Node 5 paradigms.</p>

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
    let Constructor = preconditions.constructor();
    let ChildClass = class extends Constructor {
      constructor(out) {
        super(out);
      }

      shouldBeFoo(value, message) {
        let msg = message || defaultMessage;

        if (value !== "FOO") {
          throw new Error(msg);
        }
      }
    };
    
    new ChildClass(this).shouldBeDefined("foo.deep.stringValue", "Custom error message.")
      .shouldBeFoo("foo.deep.foo");
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
  * 2.0.0
    * Adds errr interface which decorates errr node module
    * Allows templating in singleton interface.
    * Notes the poor performance in instance interface.  Should not be used in production code.
    * Redesign of code.
    * Now uses maddox for unit testing.
    * Moves to Node 5 paradigms.
  * 1.0.8 - Removed 'underscore' and added 'lodash'.
    * Added a .jshintrc file and a more extensive linting process
    * Separated dependencies and dev-dependencies to reduce installation load (A big thanks to Esteban Ordano (eordano) for doing this work).
  * 1.0.7 - First official public release.

## API

<dl>
<dt><a href="#Preconditions">Preconditions</a></dt>
<dd><p>Preconditions entry point interface.</p>
</dd>
<dt><a href="#ErrrValidator">ErrrValidator</a></dt>
<dd><p>Validate single value with a buildable interface on top of the errr node module.
Use this interface if you want to utilize the following functionality:</p>
<ol>
<li>Error message templating.</li>
<li>Only templates error message if ErrrValidator fails which saves event queue cycles.</li>
<li>Gives ability to append Stack traces to an existing error.</li>
<li>Gives ability to append debug params to stack trace.</li>
</ol>
</dd>
<dt><a href="#ErrrDecorator">ErrrDecorator</a></dt>
<dd><p>Error Builder allows you to use optional functions to build an error object.  The error can have appended stack traces and debug params to assist with debugging.</p>
</dd>
<dt><a href="#InstanceValidator">InstanceValidator</a></dt>
<dd><p>Validate values in a nested object using a dot notation structure (e.g. .shouldBeString(&quot;Person.Address.Street.zip&quot;))
System will validate the the Person, Person.Address, and Person.Address.Street objects exist, and will validate that zip is a String.</p>
<p>Use this interface if you want to utilize the following functionality:</p>
<ol>
<li>Nested object validation using a dot notation.</li>
</ol>
</dd>
<dt><a href="#SingletonValidator">SingletonValidator</a></dt>
<dd><p>Validate single value with a chainable interface.
Use this interface if you want to utilize the following functionality:</p>
<ol>
<li>Error message templating.</li>
<li>Only templates error message if validation fails which saves event queue cycles.</li>
<li>Chain together precondition validations.</li>
</ol>
</dd>
</dl>

<a name="Preconditions"></a>

## Preconditions
Preconditions entry point interface.

**Kind**: global class  

* [Preconditions](#Preconditions)
    * [.errr()](#Preconditions.errr) ⇒
    * [.singleton()](#Preconditions.singleton) ⇒
    * [.instance(objectUnderTest)](#Preconditions.instance) ⇒
    * [.constructor()](#Preconditions.constructor) ⇒

<a name="Preconditions.errr"></a>

### Preconditions.errr() ⇒
Validate single value with the buildable errr interface from the static errr Validation functionality.

**Kind**: static method of <code>[Preconditions](#Preconditions)</code>  
**Returns**: Error Validation Singleton.  
<a name="Preconditions.singleton"></a>

### Preconditions.singleton() ⇒
Validate single value with the chainable interface from the Error Validation Singleton.

**Kind**: static method of <code>[Preconditions](#Preconditions)</code>  
**Returns**: Error Validation Singleton.  
<a name="Preconditions.instance"></a>

### Preconditions.instance(objectUnderTest) ⇒
**Kind**: static method of <code>[Preconditions](#Preconditions)</code>  
**Returns**: Error Validation instance.  
**Warning**: This functionality has very poor performance.  Please use the 'singleton' or 'errr' functionality instead.

Validate values of a given JSON object with the preconditions object.  

| Param | Description |
| --- | --- |
| objectUnderTest | Object Under Test |

<a name="Preconditions.constructor"></a>

### Preconditions.constructor() ⇒
Gives ability to extend and add other preconditions to the Error Validation constructor.

**Kind**: static method of <code>[Preconditions](#Preconditions)</code>  
**Returns**: Error Validation constructor.  
**Warning**: This functionality only works with the 'instance' function which has very poor performance.  

<a name="ErrrValidator"></a>

## ErrrValidator
Validate single value with a buildable interface on top of the errr node module.
Use this interface if you want to utilize the following functionality:
1. Error message templating.
2. Only templates error message if ErrrValidator fails which saves event queue cycles.
3. Gives ability to append Stack traces to an existing error.
4. Gives ability to append debug params to stack trace.

**Kind**: global class  

* [ErrrValidator](#ErrrValidator)
    * [.shouldBeDefined(val, [message], [template])](#ErrrValidator.shouldBeDefined) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldBeUndefined(val, [message], [template])](#ErrrValidator.shouldBeUndefined) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldBeArray(val, [message], [template])](#ErrrValidator.shouldBeArray) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldNotBeArray(val, [message], [template])](#ErrrValidator.shouldNotBeArray) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldBeObject(val, [message], [template])](#ErrrValidator.shouldBeObject) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldNotBeObject(val, [message], [template])](#ErrrValidator.shouldNotBeObject) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldBeEmpty(val, [message], [template])](#ErrrValidator.shouldBeEmpty) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldNotBeEmpty(val, [message], [template])](#ErrrValidator.shouldNotBeEmpty) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldBeFunction(val, [message], [template])](#ErrrValidator.shouldBeFunction) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldNotBeFunction(val, [message], [template])](#ErrrValidator.shouldNotBeFunction) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldBeString(val, [message], [template])](#ErrrValidator.shouldBeString) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldNotBeString(val, [message], [template])](#ErrrValidator.shouldNotBeString) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldBeNumber(val, [message], [template])](#ErrrValidator.shouldBeNumber) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldNotBeNumber(val, [message], [template])](#ErrrValidator.shouldNotBeNumber) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldBeFinite(val, [message], [template])](#ErrrValidator.shouldBeFinite) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldBeInfinite(val, [message], [template])](#ErrrValidator.shouldBeInfinite) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldBeBoolean(val, [message], [template])](#ErrrValidator.shouldBeBoolean) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldNotBeBoolean(val, [message], [template])](#ErrrValidator.shouldNotBeBoolean) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldBeDate(val, [message], [template])](#ErrrValidator.shouldBeDate) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldNotBeDate(val, [message], [template])](#ErrrValidator.shouldNotBeDate) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldBeRegExp(val, [message], [template])](#ErrrValidator.shouldBeRegExp) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldNotBeRegExp(val, [message], [template])](#ErrrValidator.shouldNotBeRegExp) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldBeFalsey(val, [message], [template])](#ErrrValidator.shouldBeFalsey) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldNotBeFalsey(val, [message], [template])](#ErrrValidator.shouldNotBeFalsey) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldBeFalsy(val, [message], [template])](#ErrrValidator.shouldBeFalsy) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldNotBeFalsy(val, [message], [template])](#ErrrValidator.shouldNotBeFalsy) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldBeTruthy(val, [message], [template])](#ErrrValidator.shouldBeTruthy) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.shouldNotBeTruthy(val, [message], [template])](#ErrrValidator.shouldNotBeTruthy) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.checkArgument(expression, [message], [template])](#ErrrValidator.checkArgument) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.checkState(expression, [message], [template])](#ErrrValidator.checkState) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.checkElementIndex(index, size, [message], [template])](#ErrrValidator.checkElementIndex) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.checkPositionIndex(index, size, [message], [template])](#ErrrValidator.checkPositionIndex) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
    * [.checkPositionIndexes(start, end, size, [message], [template])](#ErrrValidator.checkPositionIndexes) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>

<a name="ErrrValidator.shouldBeDefined"></a>

### ErrrValidator.shouldBeDefined(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Throws an error if 'val' is not defined.

**Kind**: static method of <code>[ErrrValidator](#ErrrValidator)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the ErrrValidator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrValidator.shouldBeUndefined"></a>

### ErrrValidator.shouldBeUndefined(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Throws an error if 'val' is defined.

**Kind**: static method of <code>[ErrrValidator](#ErrrValidator)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the ErrrValidator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrValidator.shouldBeArray"></a>

### ErrrValidator.shouldBeArray(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Throws an error if 'val' is not of type Array.

**Kind**: static method of <code>[ErrrValidator](#ErrrValidator)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the ErrrValidator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrValidator.shouldNotBeArray"></a>

### ErrrValidator.shouldNotBeArray(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Throws an error if 'val' is of type Array.

**Kind**: static method of <code>[ErrrValidator](#ErrrValidator)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the ErrrValidator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrValidator.shouldBeObject"></a>

### ErrrValidator.shouldBeObject(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Throws an error if 'val' is not of type Object.

**Kind**: static method of <code>[ErrrValidator](#ErrrValidator)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the ErrrValidator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrValidator.shouldNotBeObject"></a>

### ErrrValidator.shouldNotBeObject(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Throws an error if 'val' is of type Object.

**Kind**: static method of <code>[ErrrValidator](#ErrrValidator)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the ErrrValidator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrValidator.shouldBeEmpty"></a>

### ErrrValidator.shouldBeEmpty(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Throws an error if 'val' is not empty.

**Kind**: static method of <code>[ErrrValidator](#ErrrValidator)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the ErrrValidator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrValidator.shouldNotBeEmpty"></a>

### ErrrValidator.shouldNotBeEmpty(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Throws an error if 'val' is empty.

**Kind**: static method of <code>[ErrrValidator](#ErrrValidator)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the ErrrValidator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrValidator.shouldBeFunction"></a>

### ErrrValidator.shouldBeFunction(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Throws an error if 'val' is not of type Function.

**Kind**: static method of <code>[ErrrValidator](#ErrrValidator)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the ErrrValidator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrValidator.shouldNotBeFunction"></a>

### ErrrValidator.shouldNotBeFunction(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Throws an error if 'val' is of type Function.

**Kind**: static method of <code>[ErrrValidator](#ErrrValidator)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the ErrrValidator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrValidator.shouldBeString"></a>

### ErrrValidator.shouldBeString(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Throws an error if 'val' is not of type String.

**Kind**: static method of <code>[ErrrValidator](#ErrrValidator)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the ErrrValidator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrValidator.shouldNotBeString"></a>

### ErrrValidator.shouldNotBeString(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Throws an error if 'val' is of type String.

**Kind**: static method of <code>[ErrrValidator](#ErrrValidator)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the ErrrValidator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrValidator.shouldBeNumber"></a>

### ErrrValidator.shouldBeNumber(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Throws an error if 'val' is not of type Number.

**Kind**: static method of <code>[ErrrValidator](#ErrrValidator)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the ErrrValidator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrValidator.shouldNotBeNumber"></a>

### ErrrValidator.shouldNotBeNumber(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Throws an error if 'val' is of type Number.

**Kind**: static method of <code>[ErrrValidator](#ErrrValidator)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the ErrrValidator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrValidator.shouldBeFinite"></a>

### ErrrValidator.shouldBeFinite(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Throws an error if 'val' is not finite.

**Kind**: static method of <code>[ErrrValidator](#ErrrValidator)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the ErrrValidator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrValidator.shouldBeInfinite"></a>

### ErrrValidator.shouldBeInfinite(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Throws an error if 'val' is finite.

**Kind**: static method of <code>[ErrrValidator](#ErrrValidator)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the ErrrValidator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrValidator.shouldBeBoolean"></a>

### ErrrValidator.shouldBeBoolean(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Throws an error if 'val' is not of type Boolean.

**Kind**: static method of <code>[ErrrValidator](#ErrrValidator)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the ErrrValidator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrValidator.shouldNotBeBoolean"></a>

### ErrrValidator.shouldNotBeBoolean(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Throws an error if 'val' is of type Boolean.

**Kind**: static method of <code>[ErrrValidator](#ErrrValidator)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the ErrrValidator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrValidator.shouldBeDate"></a>

### ErrrValidator.shouldBeDate(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Throws an error if 'val' is not of type Date.

**Kind**: static method of <code>[ErrrValidator](#ErrrValidator)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the ErrrValidator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrValidator.shouldNotBeDate"></a>

### ErrrValidator.shouldNotBeDate(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Throws an error if 'val' is of type Date.

**Kind**: static method of <code>[ErrrValidator](#ErrrValidator)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the ErrrValidator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrValidator.shouldBeRegExp"></a>

### ErrrValidator.shouldBeRegExp(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Throws an error if 'val' is not a Regular Expression.

**Kind**: static method of <code>[ErrrValidator](#ErrrValidator)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the ErrrValidator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrValidator.shouldNotBeRegExp"></a>

### ErrrValidator.shouldNotBeRegExp(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Throws an error if 'val' is a Regular Expression.

**Kind**: static method of <code>[ErrrValidator](#ErrrValidator)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the ErrrValidator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrValidator.shouldBeFalsey"></a>

### ErrrValidator.shouldBeFalsey(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Throws an error if 'val' is not falsey.

**Kind**: static method of <code>[ErrrValidator](#ErrrValidator)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the ErrrValidator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrValidator.shouldNotBeFalsey"></a>

### ErrrValidator.shouldNotBeFalsey(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Throws an error if 'val' is falsey.

**Kind**: static method of <code>[ErrrValidator](#ErrrValidator)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the ErrrValidator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrValidator.shouldBeFalsy"></a>

### ErrrValidator.shouldBeFalsy(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Synonym for shouldBeFalsey.

**Kind**: static method of <code>[ErrrValidator](#ErrrValidator)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the ErrrValidator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrValidator.shouldNotBeFalsy"></a>

### ErrrValidator.shouldNotBeFalsy(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Synonym for shouldNotBeFalsey.

**Kind**: static method of <code>[ErrrValidator](#ErrrValidator)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the ErrrValidator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrValidator.shouldBeTruthy"></a>

### ErrrValidator.shouldBeTruthy(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Synonym for shouldNotBeFalsey.

**Kind**: static method of <code>[ErrrValidator](#ErrrValidator)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the ErrrValidator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrValidator.shouldNotBeTruthy"></a>

### ErrrValidator.shouldNotBeTruthy(val, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Synonym for shouldBeFalsey.

**Kind**: static method of <code>[ErrrValidator](#ErrrValidator)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the ErrrValidator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrValidator.checkArgument"></a>

### ErrrValidator.checkArgument(expression, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Ensures the truth of an expression involving one or more parameters to the calling method.

**Kind**: static method of <code>[ErrrValidator](#ErrrValidator)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| expression | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the ErrrValidator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrValidator.checkState"></a>

### ErrrValidator.checkState(expression, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Ensures the truth of an expression involving the state of the calling instance, but not involving any parameters to the calling method.

**Kind**: static method of <code>[ErrrValidator](#ErrrValidator)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| expression | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the ErrrValidator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrValidator.checkElementIndex"></a>

### ErrrValidator.checkElementIndex(index, size, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Ensures that index specifies a valid element in an array, list or string of size size.

**Kind**: static method of <code>[ErrrValidator](#ErrrValidator)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>Number</code> |  |
| size | <code>Number</code> |  |
| [message] | <code>String</code> | The error message or the error template string to use if the ErrrValidator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrValidator.checkPositionIndex"></a>

### ErrrValidator.checkPositionIndex(index, size, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Ensures that index specifies a valid position in an array, list or string of size size.

**Kind**: static method of <code>[ErrrValidator](#ErrrValidator)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>Number</code> |  |
| size | <code>Number</code> |  |
| [message] | <code>String</code> | The error message or the error template string to use if the ErrrValidator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="ErrrValidator.checkPositionIndexes"></a>

### ErrrValidator.checkPositionIndexes(start, end, size, [message], [template]) ⇒ <code>[ErrrDecorator](#ErrrDecorator)</code>
Ensures that start and end specify a valid positions in an array, list or string of size size, and are in order.

**Kind**: static method of <code>[ErrrValidator](#ErrrValidator)</code>  
**Returns**: <code>[ErrrDecorator](#ErrrDecorator)</code> - - An object that decorates the errr node module.  

| Param | Type | Description |
| --- | --- | --- |
| start | <code>Number</code> |  |
| end | <code>Number</code> |  |
| size | <code>Number</code> |  |
| [message] | <code>String</code> | The error message or the error template string to use if the ErrrValidator fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

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

<a name="SingletonValidator"></a>

## SingletonValidator
Validate single value with a chainable interface.
Use this interface if you want to utilize the following functionality:
1. Error message templating.
2. Only templates error message if validation fails which saves event queue cycles.
3. Chain together precondition validations.

**Kind**: global class  

* [SingletonValidator](#SingletonValidator)
    * [.shouldBeDefined(val, [message], [template])](#SingletonValidator.shouldBeDefined) ⇒ <code>this</code>
    * [.shouldBeUndefined(val, [message], [template])](#SingletonValidator.shouldBeUndefined) ⇒ <code>this</code>
    * [.shouldBeArray(val, [message], [template])](#SingletonValidator.shouldBeArray) ⇒ <code>this</code>
    * [.shouldNotBeArray(val, [message], [template])](#SingletonValidator.shouldNotBeArray) ⇒ <code>this</code>
    * [.shouldBeObject(val, [message], [template])](#SingletonValidator.shouldBeObject) ⇒ <code>this</code>
    * [.shouldNotBeObject(val, [message], [template])](#SingletonValidator.shouldNotBeObject) ⇒ <code>this</code>
    * [.shouldBeEmpty(val, [message], [template])](#SingletonValidator.shouldBeEmpty) ⇒ <code>this</code>
    * [.shouldNotBeEmpty(val, [message], [template])](#SingletonValidator.shouldNotBeEmpty) ⇒ <code>this</code>
    * [.shouldBeFunction(val, [message], [template])](#SingletonValidator.shouldBeFunction) ⇒ <code>this</code>
    * [.shouldNotBeFunction(val, [message], [template])](#SingletonValidator.shouldNotBeFunction) ⇒ <code>this</code>
    * [.shouldBeString(val, [message], [template])](#SingletonValidator.shouldBeString) ⇒ <code>this</code>
    * [.shouldNotBeString(val, [message], [template])](#SingletonValidator.shouldNotBeString) ⇒ <code>this</code>
    * [.shouldBeNumber(val, [message], [template])](#SingletonValidator.shouldBeNumber) ⇒ <code>this</code>
    * [.shouldNotBeNumber(val, [message], [template])](#SingletonValidator.shouldNotBeNumber) ⇒ <code>this</code>
    * [.shouldBeFinite(val, [message], [template])](#SingletonValidator.shouldBeFinite) ⇒ <code>this</code>
    * [.shouldBeInfinite(val, [message], [template])](#SingletonValidator.shouldBeInfinite) ⇒ <code>this</code>
    * [.shouldBeBoolean(val, [message], [template])](#SingletonValidator.shouldBeBoolean) ⇒ <code>this</code>
    * [.shouldNotBeBoolean(val, [message], [template])](#SingletonValidator.shouldNotBeBoolean) ⇒ <code>this</code>
    * [.shouldBeDate(val, [message], [template])](#SingletonValidator.shouldBeDate) ⇒ <code>this</code>
    * [.shouldNotBeDate(val, [message], [template])](#SingletonValidator.shouldNotBeDate) ⇒ <code>this</code>
    * [.shouldBeRegExp(val, [message], [template])](#SingletonValidator.shouldBeRegExp) ⇒ <code>this</code>
    * [.shouldNotBeRegExp(val, [message], [template])](#SingletonValidator.shouldNotBeRegExp) ⇒ <code>this</code>
    * [.shouldBeFalsey(val, [message], [template])](#SingletonValidator.shouldBeFalsey) ⇒ <code>this</code>
    * [.shouldNotBeFalsey(val, [message], [template])](#SingletonValidator.shouldNotBeFalsey) ⇒ <code>this</code>
    * [.shouldBeFalsy(val, [message], [template])](#SingletonValidator.shouldBeFalsy) ⇒ <code>this</code>
    * [.shouldNotBeFalsy(val, [message], [template])](#SingletonValidator.shouldNotBeFalsy) ⇒ <code>this</code>
    * [.shouldBeTruthy(val, [message], [template])](#SingletonValidator.shouldBeTruthy) ⇒ <code>this</code>
    * [.shouldNotBeTruthy(val, [message], [template])](#SingletonValidator.shouldNotBeTruthy) ⇒ <code>this</code>
    * [.checkArgument(expression, [message], [template])](#SingletonValidator.checkArgument) ⇒ <code>this</code>
    * [.checkState(expression, [message], [template])](#SingletonValidator.checkState) ⇒ <code>this</code>
    * [.checkElementIndex(index, size, [message], [template])](#SingletonValidator.checkElementIndex) ⇒ <code>this</code>
    * [.checkPositionIndex(index, size, [message], [template])](#SingletonValidator.checkPositionIndex) ⇒ <code>this</code>
    * [.checkPositionIndexes(start, end, size, [message], [template])](#SingletonValidator.checkPositionIndexes) ⇒ <code>this</code>

<a name="SingletonValidator.shouldBeDefined"></a>

### SingletonValidator.shouldBeDefined(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is not defined.

**Kind**: static method of <code>[SingletonValidator](#SingletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="SingletonValidator.shouldBeUndefined"></a>

### SingletonValidator.shouldBeUndefined(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is defined.

**Kind**: static method of <code>[SingletonValidator](#SingletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="SingletonValidator.shouldBeArray"></a>

### SingletonValidator.shouldBeArray(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is not of type Array.

**Kind**: static method of <code>[SingletonValidator](#SingletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="SingletonValidator.shouldNotBeArray"></a>

### SingletonValidator.shouldNotBeArray(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is of type Array.

**Kind**: static method of <code>[SingletonValidator](#SingletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="SingletonValidator.shouldBeObject"></a>

### SingletonValidator.shouldBeObject(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is not of type Object.

**Kind**: static method of <code>[SingletonValidator](#SingletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="SingletonValidator.shouldNotBeObject"></a>

### SingletonValidator.shouldNotBeObject(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is of type Object.

**Kind**: static method of <code>[SingletonValidator](#SingletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="SingletonValidator.shouldBeEmpty"></a>

### SingletonValidator.shouldBeEmpty(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is not empty.

**Kind**: static method of <code>[SingletonValidator](#SingletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="SingletonValidator.shouldNotBeEmpty"></a>

### SingletonValidator.shouldNotBeEmpty(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is empty.

**Kind**: static method of <code>[SingletonValidator](#SingletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="SingletonValidator.shouldBeFunction"></a>

### SingletonValidator.shouldBeFunction(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is not of type Function.

**Kind**: static method of <code>[SingletonValidator](#SingletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="SingletonValidator.shouldNotBeFunction"></a>

### SingletonValidator.shouldNotBeFunction(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is of type Function.

**Kind**: static method of <code>[SingletonValidator](#SingletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="SingletonValidator.shouldBeString"></a>

### SingletonValidator.shouldBeString(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is not of type String.

**Kind**: static method of <code>[SingletonValidator](#SingletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="SingletonValidator.shouldNotBeString"></a>

### SingletonValidator.shouldNotBeString(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is of type String.

**Kind**: static method of <code>[SingletonValidator](#SingletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="SingletonValidator.shouldBeNumber"></a>

### SingletonValidator.shouldBeNumber(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is not of type Number.

**Kind**: static method of <code>[SingletonValidator](#SingletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="SingletonValidator.shouldNotBeNumber"></a>

### SingletonValidator.shouldNotBeNumber(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is of type Number.

**Kind**: static method of <code>[SingletonValidator](#SingletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="SingletonValidator.shouldBeFinite"></a>

### SingletonValidator.shouldBeFinite(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is not finite.

**Kind**: static method of <code>[SingletonValidator](#SingletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="SingletonValidator.shouldBeInfinite"></a>

### SingletonValidator.shouldBeInfinite(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is not infinite.

**Kind**: static method of <code>[SingletonValidator](#SingletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="SingletonValidator.shouldBeBoolean"></a>

### SingletonValidator.shouldBeBoolean(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is not of type Boolean.

**Kind**: static method of <code>[SingletonValidator](#SingletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="SingletonValidator.shouldNotBeBoolean"></a>

### SingletonValidator.shouldNotBeBoolean(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is of type Boolean.

**Kind**: static method of <code>[SingletonValidator](#SingletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="SingletonValidator.shouldBeDate"></a>

### SingletonValidator.shouldBeDate(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is not of type Date.

**Kind**: static method of <code>[SingletonValidator](#SingletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="SingletonValidator.shouldNotBeDate"></a>

### SingletonValidator.shouldNotBeDate(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is of type Date.

**Kind**: static method of <code>[SingletonValidator](#SingletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="SingletonValidator.shouldBeRegExp"></a>

### SingletonValidator.shouldBeRegExp(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is not a Regular Expression.

**Kind**: static method of <code>[SingletonValidator](#SingletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="SingletonValidator.shouldNotBeRegExp"></a>

### SingletonValidator.shouldNotBeRegExp(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is a Regular Expression.

**Kind**: static method of <code>[SingletonValidator](#SingletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="SingletonValidator.shouldBeFalsey"></a>

### SingletonValidator.shouldBeFalsey(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is not falsey.

**Kind**: static method of <code>[SingletonValidator](#SingletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="SingletonValidator.shouldNotBeFalsey"></a>

### SingletonValidator.shouldNotBeFalsey(val, [message], [template]) ⇒ <code>this</code>
Throws an error if 'val' is falsey.

**Kind**: static method of <code>[SingletonValidator](#SingletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="SingletonValidator.shouldBeFalsy"></a>

### SingletonValidator.shouldBeFalsy(val, [message], [template]) ⇒ <code>this</code>
Synonym for shouldBeFalsey.

**Kind**: static method of <code>[SingletonValidator](#SingletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="SingletonValidator.shouldNotBeFalsy"></a>

### SingletonValidator.shouldNotBeFalsy(val, [message], [template]) ⇒ <code>this</code>
Synonym for shouldNotBeFalsey.

**Kind**: static method of <code>[SingletonValidator](#SingletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="SingletonValidator.shouldBeTruthy"></a>

### SingletonValidator.shouldBeTruthy(val, [message], [template]) ⇒ <code>this</code>
Synonym for shouldNotBeFalsey.

**Kind**: static method of <code>[SingletonValidator](#SingletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="SingletonValidator.shouldNotBeTruthy"></a>

### SingletonValidator.shouldNotBeTruthy(val, [message], [template]) ⇒ <code>this</code>
Synonym for shouldBeFalsey.

**Kind**: static method of <code>[SingletonValidator](#SingletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="SingletonValidator.checkArgument"></a>

### SingletonValidator.checkArgument(expression, [message], [template]) ⇒ <code>this</code>
Ensures the truth of an expression involving one or more parameters to the calling method.

**Kind**: static method of <code>[SingletonValidator](#SingletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| expression | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="SingletonValidator.checkState"></a>

### SingletonValidator.checkState(expression, [message], [template]) ⇒ <code>this</code>
Ensures the truth of an expression involving the state of the calling instance, but not involving any parameters to the calling method.

**Kind**: static method of <code>[SingletonValidator](#SingletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| expression | <code>String</code> | The value to validate. |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="SingletonValidator.checkElementIndex"></a>

### SingletonValidator.checkElementIndex(index, size, [message], [template]) ⇒ <code>this</code>
Ensures that index specifies a valid element in an array, list or string of size size.

**Kind**: static method of <code>[SingletonValidator](#SingletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>Number</code> |  |
| size | <code>Number</code> |  |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="SingletonValidator.checkPositionIndex"></a>

### SingletonValidator.checkPositionIndex(index, size, [message], [template]) ⇒ <code>this</code>
Ensures that index specifies a valid position in an array, list or string of size size.

**Kind**: static method of <code>[SingletonValidator](#SingletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>Number</code> |  |
| size | <code>Number</code> |  |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="SingletonValidator.checkPositionIndexes"></a>

### SingletonValidator.checkPositionIndexes(start, end, size, [message], [template]) ⇒ <code>this</code>
Ensures that start and end specify a valid positions in an array, list or string of size size, and are in order.

**Kind**: static method of <code>[SingletonValidator](#SingletonValidator)</code>  
**Returns**: <code>this</code> - - Returns itself to allow chainable validations.  

| Param | Type | Description |
| --- | --- | --- |
| start | <code>Number</code> |  |
| end | <code>Number</code> |  |
| size | <code>Number</code> |  |
| [message] | <code>String</code> | The error message or the error template string to use if the validation fails. |
| [template] | <code>Array</code> | Template params.  If provided, the error message will be generated using util.format(message, template). |

<a name="InstanceValidator"></a>

## InstanceValidator
Validate values in a nested object using a dot notation structure (e.g. .shouldBeString("Person.Address.Street.zip"))
System will validate the the Person, Person.Address, and Person.Address.Street objects exist, and will validate that zip is a String.

Use this interface if you want to utilize the following functionality:
1. Nested object validation using a dot notation.

**Kind**: global class  

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