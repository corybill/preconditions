<a name="Validator"></a>

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

