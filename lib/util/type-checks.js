export function isUndefined(val) {
  return val === undefined;
}

export function isArray(val) {
  return Array.isArray(val);
}

export function isEmpty(val) {
  if (!val) {
    return true;
  }
  if (Array.isArray(val) || typeof val === "string") {
    return val.length === 0;
  }
  return Object.keys(val).length === 0;
}

export function isFunction(val) {
  return typeof val === "function";
}

export function isString(val) {
  return typeof val === "string";
}

export function isNumber(val) {
  return typeof val === "number";
}

export function isFinite(val) {
  return typeof val === "number" && globalThis.isFinite(val);
}

export function isBoolean(val) {
  return typeof val === "boolean";
}

export function isDate(val) {
  return val instanceof Date;
}

export function isRegExp(val) {
  return val instanceof RegExp;
}
