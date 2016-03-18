<a name="InstanceValidator"></a>

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

