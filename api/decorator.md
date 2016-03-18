<a name="Decorator"></a>

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
