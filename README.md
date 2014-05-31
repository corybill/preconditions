#Preconditions Library
####Support for Guava like Precondition error checking in Node.js

<p>Ensuring a fail fast development environment can help developers find bugs quicker and easier.  
Ensuring all invariants are true at an initial point of contact will help you ensure this fail fast environment.  
This Preconditions library will assist you in doing just that by immediately throwing an Error
if any of your invariants fail.</p>

###Install
<pre>
    <code>
        npm install preconditions    
   </code>
</pre>

###Source Code
<pre>
    <code>
        https://github.com/corybill/Preconditions   
   </code>
</pre>

###Setup
1. Require the preconditions library - require("preconditions")
2. Call the .build() function on the required preconditions.
3. Make an API call passing in a string representation of the variable you'd like to verify.
4. "String Representation" - Means using dot notation (i.e. "foo.deep.stringValue").
5. Looking at the object in the first code example, foo.deep.stringValue = "FOO"

###Examples
Create and build the preconditions validator.

<pre>
    <code>
        var preconditions = require("preconditions").build({
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
        preconditions.shouldBeDefined("foo.deep.stringValue");
        preconditions.shouldBeDefined("foo.deep.emptyArray");
        preconditions.shouldBeUndefined("foo.deep.someValue");
        preconditions.shouldBeFunction("foo.deep.functionValue");
   </code>
</pre>
   
We can chain calls too.
<pre>
    <code>
        var preconditions = require("preconditions").build(this);
        
        preconditions.shouldBeDefined("foo.deep.stringValue")
            .shouldBeDefined("foo.deep.emptyArray")
            .shouldBeUndefined("foo.deep.someValue")
            .shouldBeFunction("foo.deep.functionValue");
   </code>
</pre>

###API
<pre>
    <code>
        shouldBeDefined
        shouldBeUndefined
        shouldBeNonEmptyArray
        shouldBeArray
        shouldNotBeArray
        shouldBeObject
        shouldNotBeObject
        shouldBeEmpty
        shouldNotBeEmpty
        shouldBeFunction
        shouldNotBeFunction
        shouldBeString
        shouldNotBeString
        shouldBeNumber
        shouldNotBeNumber
        shouldBeFinite
        shouldBeInfinite
        shouldBeBoolean
        shouldNotBeBoolean
        shouldBeDate
        shouldNotBeDate
        shouldBeRegExp
        shouldNotBeRegExp
        shouldBeFalsey - Means that the value should be NaN || Null || undefined
        shouldNotBeFalsey - Means that the value should not be NaN && 
                                                 should not be Null &&
                                                 should not be undefined
    </pre>
</code>

###Missing API or Bugs
Please reach out to me (Cory Parrish) if you would like a new precondition added or if you think you have found bug.