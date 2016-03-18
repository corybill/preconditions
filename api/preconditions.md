<a name="preconditions"></a>

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
