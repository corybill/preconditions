<a name="singletonValidator"></a>

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

