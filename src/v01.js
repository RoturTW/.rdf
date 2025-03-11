(function() {window.RDF = new (class RDF {
  constructor() {
    this.version = 'v01';
    this.rtrExp = new (class rtrExp { constructor() { this.RE_NUMBER = /^-?\d+(\.\d+)?$/, this.operators = { "==": (t, e) => t === e, "!=": (t, e) => t !== e, ">=": (t, e) => t >= e, "<=": (t, e) => t <= e, ">": (t, e) => t > e, "<": (t, e) => t < e, "+": (t, e) => t + e, "-": (t, e) => t - e, "*": (t, e) => t * e, "/": (t, e) => t / e, "%": (t, e) => (t % e + e) % e, "^": (t, e) => t ** e, "?": (t, e, s) => t ? e : s }, this.functions = { log: (...t) => console.log(...t), min: (...t) => Math.min(...t), max: (...t) => Math.max(...t), abs: t => Math.abs(t), round: t => Math.round(t), floor: t => Math.floor(t), ceil: t => Math.ceil(t), sqrt: t => Math.sqrt(t), sin: t => Math.sin(t), cos: t => Math.cos(t), tan: t => Math.tan(t), asin: t => Math.asin(t), acos: t => Math.acos(t), atan: t => Math.atan(t), join: (...t) => t.join(""), split: (t, e) => t.split(e), keys: t => Object.keys(t), values: t => Object.values(t), length: t => t.length, item: (t, e) => t[e], typeof: t => typeof t, range: (t, e) => Array.from({ length: e - t + 1 }, ((e, s) => t + s)), input: t => prompt(t), chr: t => String.fromCharCode(t), ord: t => t.charCodeAt(0), not: t => !t, "!": t => !t, set: (t, e, s) => (t[e] = s, t), obj: () => ({}), del: (t, e) => (delete t[e], t), has: (t, e) => t.hasOwnProperty(e), all: (...t) => t.every(Boolean), any: (...t) => t.some(Boolean), return: t => { this.setVar(" return_val", t, "="), this.setVar(" returned", !0, "=") }, toNum: t => 0 | t, toStr: t => "" + t } } splitByDelimiters(t, e) { let s = !1, r = 0, n = "", a = []; for (let i = 0; i < t.length; i++) { let o = t[i]; '"' === o && (s = !s), s || !e.includes(o) ? n += o : !s && e.includes(o) && (r ? n += o : (a.push(n), n = "")), "([{".includes(o) && r++, ")]}".includes(o) && r-- } return n && a.push(n), a } parseExpression(t) { for (t = t.trim(); t.startsWith("(") && t.endsWith(")");) { const e = t.slice(1, -1); if (!this.balancedParentheses(e)) break; t = e } if (t.indexOf("(") > 0 && t.endsWith(")")) { const e = t.indexOf("("), s = t.substring(0, e), r = t.substring(e + 1, t.length - 1); if (this.functions[s]) { const t = this.splitByDelimiters(r, ",").map((t => this.evaluate(t.trim()))); return this.functions[s](...t) } } let e = Object.keys(this.operators); e.sort(((t, e) => e.length - t.length)); for (const s of e) { const e = this.splitOperator(t, s); if (e) { const [t, r] = e; return this.operators[s](this.evaluate(t), this.evaluate(r)) } } return this.RE_NUMBER.test(t) ? parseFloat(t) : "true" === t || "false" !== t && t } splitOperator(t, e) { let s = 0, r = !1; for (let n = 0; n <= t.length - e.length; n++)if ('"' === t[n] && (r = !r), "(" === t[n] && s++, ")" === t[n] && s--, !r && 0 === s && t.substring(n, n + e.length) === e) return [t.substring(0, n).trim(), t.substring(n + e.length).trim()]; return null } balancedParentheses(t) { let e = 0; for (let s = 0; s < t.length; s++)if ("(" === t[s] && e++, ")" === t[s] && e--, e < 0) return !1; return 0 === e } evaluate(t) { return this.parseExpression(t) } })
    
    this.tokenCache = new Map();
    
    this.typeValidators = {
      string: val => typeof val === 'string',
      number: val => typeof val === 'number',
      object: val => typeof val === 'object' && val !== null && !Array.isArray(val),
      array: val => Array.isArray(val),
      boolean: val => typeof val === 'boolean',
      any: () => true
    };
    
    this.validateType = (val, type) => this.typeValidators[type]?.(val) ?? true;
  }

  // Tokenize methods (combine for better readability)
  tokenise(text, delimiter) {
    const cacheKey = `t:${text}:${delimiter}`;
    if (this.tokenCache.has(cacheKey)) return this.tokenCache.get(cacheKey);
    
    try { 
      // Original minified code
      let t = 0, s = "", i = 0, u = 0, o = [], r = [];
      const h = text.length;
      for (; t < h;)s = text[t], '"' === s ? (i = 1 - i, o.push('"')) : o.push(s), 0 === i && ("[" !== s && "{" !== s && "(" !== s || u++, "]" !== s && "}" !== s && ")" !== s || u--, u = u < 0 ? 0 : u), t++, 0 === i && text[t] === delimiter && 0 === u && (r.push(o.join("")), o = [], t++);
      r.push(o.join(""));
      
      this.tokenCache.set(cacheKey, r);
      return r;
    } catch { return [] }
  }
  
  tokeniseEscaped(text, delimiter) {
    const cacheKey = `te:${text}:${delimiter}`;
    if (this.tokenCache.has(cacheKey)) return this.tokenCache.get(cacheKey);
    
    try {
      // Original minified code
      let t = 0, s = "", i = 0, u = 0, o = [], r = [], h = !1;
      const p = text.length;
      for (; t < p;)s = text[t], 0 !== i || h || ("[" !== s && "{" !== s && "(" !== s || u++, "]" !== s && "}" !== s && ")" !== s || u--, u = u < 0 ? 0 : u), '"' !== s || h ? "\\" !== s || h ? (o.push(s), h = !1) : (h = !h, o.push("\\")) : (i = 1 - i, o.push('"')), t++, 0 === i && text[t] === delimiter && 0 === u && (r.push(o.join("")), o = [], t++);
      r.push(o.join(""));
      
      this.tokenCache.set(cacheKey, r);
      return r;
    } catch { return [] }
  }

  // Simplified tokenizing with caching
  autoTokenise(text, delimiter = " ") {
    const cacheKey = `at:${text}:${delimiter}`;
    if (this.tokenCache.has(cacheKey)) return this.tokenCache.get(cacheKey);
    
    let result;
    if (text.indexOf("\\") !== -1) result = this.tokeniseEscaped(text, delimiter);
    else if (/["[\]{(]/.test(text)) result = this.tokenise(text, delimiter);
    else result = text.split(delimiter);
    
    this.tokenCache.set(cacheKey, result);
    return result;
  }

  _parseIntoToken(data) {
    const cacheKey = `pit:${data}`;
    if (this.tokenCache.has(cacheKey)) return this.tokenCache.get(cacheKey);
    
    const lines = data.startsWith('{') && data.endsWith('}') 
      ? this.autoTokenise(data.slice(1, -1), ';').map(v => v.trim())
      : data.split(';');
      
    this.tokenCache.set(cacheKey, lines);
    return lines;
  }

  error(message) { throw new Error(`RDF ${this.version} error: ${message}`); }

  // Parse method with simplified structure
  parse(data) {
    data = data.trim();
    if (!(data.startsWith('{') && data.endsWith('}'))) this.error('Data must be enclosed in curly braces');
    
    // Process data once
    data = data.replace(/\s+/g, ' ').replace(/; *}/g, "}");
    
    const obj = {};
    const tokens = this._parseIntoToken(data);

    for (let token of tokens) {
      if (!token.trim()) continue;
      
      const parts = this.autoTokenise(token, '=');
      if (parts.length !== 2) this.error(`Invalid token: ${token}`);
      
      const key = this.autoTokenise(parts[0].trim(), " ");
      let value = this._parseValue(parts[1].trim());
      
      // Parse type and constraints
      const { fieldName, fieldType, elementType, constraints, elementConstraints } = this._parseTypeInfo(key);
      
      // Create validation functions
      const t = this; // Reference to this for closures
      
      const validateElementType = val => elementType ? t.validateType(val, elementType) : true;
      
      const validateConstraints = (val, constraintList) => {
        if (!constraintList?.length) return true;
        
        return constraintList.every(constraint => {
          if (!constraint.includes('self')) return true;
          
          try {
            return t.rtrExp.evaluate(constraint.replace(/self/g, val));
          } catch {
            return false;
          }
        });
      };
      
      // Validate initial value
      if (!this.validateType(value, fieldType)) 
        this.error(`Type mismatch: '${fieldName}' must be a ${fieldType}`);
      
      // Handle arrays and validation
      if (fieldType === 'array') {
        if (Array.isArray(value) && value.length > 0) {
          const isValid = value.every(element => 
            validateElementType(element) && validateConstraints(element, elementConstraints)
          );
          
          if (!isValid) {
            const errorMsg = elementType && elementConstraints.length 
              ? `Type or constraint mismatch in array '${fieldName}'` 
              : elementType 
                ? `Type mismatch in array '${fieldName}'` 
                : `Constraint violation in array '${fieldName}'`;
            this.error(errorMsg);
          }
        }
        
        // Create array proxy
        value = this._createArrayProxy(value, fieldName, elementType, elementConstraints);
      } else if (!validateConstraints(value, constraints)) {
        this.error(`Constraint violation for '${fieldName}'`);
      }

      // Create setter with validation
      const setter = function(newValue) {
        if (!t.validateType(newValue, fieldType)) 
          throw new Error(`Type mismatch: '${fieldName}' must be a ${fieldType}`);
          
        if (fieldType === 'array') {
          if (Array.isArray(newValue) && newValue.length > 0) {
            const isValid = newValue.every(element => 
              validateElementType(element) && validateConstraints(element, elementConstraints)
            );
            
            if (!isValid) 
              throw new Error(`Type or constraint violation in array '${fieldName}'`);
          }
          
          value = t._createArrayProxy(newValue, fieldName, elementType, elementConstraints);
        } else if (!validateConstraints(newValue, constraints)) {
          throw new Error(`Constraint violation for '${fieldName}'`);
        } else {
          value = newValue;
        }
      };
      
      // Add metadata to setter for stringify method
      Object.assign(setter, {
        constraints: constraints.length ? constraints : elementConstraints,
        fieldType, 
        elementType
      });
      
      // Define property with validation
      Object.defineProperty(obj, fieldName, {
        get: () => value,
        set: setter,
        enumerable: true,
        configurable: true
      });
    }
    
    return obj;
  }
  
  // Parse a value based on its syntax
  _parseValue(value) {
    if (value.startsWith('"') && value.endsWith('"')) return value.slice(1, -1);
    else if (value.startsWith('{') && value.endsWith('}')) return this.parse(value);
    else if (value.startsWith("[") && value.endsWith("]")) return value === "[]" ? [] : this._parseArray(value.slice(1, -1));
    else if (value === 'true') return true;
    else if (value === 'false') return false;
    else return !isNaN(+value) ? +value : value;
  }
  
  // Parse array content
  _parseArray(arrayContent) {
    return this.autoTokenise(arrayContent, ',').map(v => this._parseValue(v.trim()));
  }
  
  // Unified type and constraint extraction
  _parseTypeInfo(key) {
    const result = {
      fieldName: key[0],
      fieldType: 'any',
      elementType: null,
      constraints: [],
      elementConstraints: []
    };
    
    if (key.length <= 1) return result;
    
    const { fieldName, fieldType, elementType, constraints, elementConstraints } = result;
    
    // Handle constraint-first notation: (self == true) fieldName
    if (key[0].startsWith('(') && key[0].includes(')')) {
      result.fieldName = key.length > 1 ? key[1] : key[0].split(')')[1].trim();
      
      const match = key[0].match(/\((.*?)\)/);
      if (match) result.constraints = match[1].split(',').map(c => c.trim());
      
      return result;
    }
    
    // Handle standard type-first notation
    result.fieldType = key[0].toLowerCase();
    result.fieldName = key[1];
    
    // Handle separate constraints: number (self > 1) fieldName
    if (key.length > 2 && key[1].startsWith('(') && key[1].includes(')')) {
      result.fieldName = key[2];
      
      const match = key[1].match(/\((.*?)\)/);
      if (match) {
        const constraintList = match[1].split(',').map(c => c.trim());
        
        if (result.fieldType.startsWith('array<')) {
          result.elementConstraints = constraintList;
        } else {
          result.constraints = constraintList;
        }
      }
    }
    
    // Extract array element type
    if (result.fieldType.startsWith('array<') && result.fieldType.endsWith('>')) {
      const innerTypeDef = result.fieldType.substring(6, result.fieldType.length - 1);
      
      if (innerTypeDef.includes('(') && innerTypeDef.includes(')')) {
        const match = innerTypeDef.match(/(\w+)\((.*)\)/);
        if (match) {
          result.elementType = match[1].toLowerCase();
          result.elementConstraints = [
            ...result.elementConstraints,
            ...match[2].split(',').map(c => c.trim())
          ];
        }
      } else {
        result.elementType = innerTypeDef.toLowerCase();
      }
      
      result.fieldType = 'array';
    }
    
    // Extract inline constraints: number(self > 1) fieldName
    if (result.fieldType.includes('(') && result.fieldType.includes(')')) {
      const match = result.fieldType.match(/(\w+)\((.*)\)/);
      if (match) {
        result.fieldType = match[1].toLowerCase();
        result.constraints = match[2].split(',').map(c => c.trim());
      }
    }
    
    return result;
  }
  
  // Simplified array proxy creation
  _createArrayProxy(array, fieldName, elementType, elementConstraints) {
    const t = this; // Store reference to 'this'
    const originalArray = Array.isArray(array) ? array : [];
    
    return new Proxy(originalArray, {
      get(target, prop) {
        // Return normal property if not a modifying method
        if (!['push', 'unshift', 'splice'].includes(prop)) {
          return target[prop];
        }
        
        // Handle modifying methods with validation
        return function(...args) {
          const items = prop === 'splice' ? args.slice(2) : args;
          
          for (const item of items) {
            // Type validation
            if (elementType && !t.validateType(item, elementType))
               throw new Error(`Type mismatch: Elements of '${fieldName}' must be of type ${elementType}`);
            
            // Constraint validation
            if (!elementConstraints?.length) continue;
            
            let valid = true;
            for (const constraint of elementConstraints) {
              if (!constraint.includes('self')) continue;
              
              try {
                if (!t.rtrExp.evaluate(constraint.replace(/self/g, item))) {
                  valid = false;
                  break;
                }
              } catch {
                valid = false;
                break;
              }
            }
            
            if (!valid)
              throw new Error(`Constraint violation for element of '${fieldName}'`);
          }
          
          return Array.prototype[prop].apply(target, args);
        };
      }
    });
  }

  // Stringify with better formatting control
  stringify(obj, space = 0, indentLevel = 0) {
    space |= 0;
    const indent = ' '.repeat(indentLevel * space);
    const nestedIndent = ' '.repeat((indentLevel + 1) * space);
    let result = "{\n";
    
    for (const prop in obj) {
      if (!Object.prototype.hasOwnProperty.call(obj, prop)) continue;
      
      const value = obj[prop];
      const setter = Object.getOwnPropertyDescriptor(obj, prop).set;
      
      // Format the value based on its type
      let formattedValue;
      if (Array.isArray(value)) {
        formattedValue = value.length === 0 ? "[]" : 
          `[${value.map(item => this._formatValue(item)).join(", ")}]`;
      } else if (typeof value === 'object' && value !== null) {
        formattedValue = this.stringify(value, space, indentLevel + 1);
      } else if (typeof value === 'string') {
        formattedValue = `"${value}"`;
      } else if (typeof value === 'boolean') {
        formattedValue = value ? "true" : "false";
      } else {
        formattedValue = value;
      }
      
      // Format property with type annotations
      let formattedProp = prop;
      if (setter.constraints?.length) formattedProp = `(${setter.constraints[0]}) ${formattedProp}`;
      
      if (setter.fieldType) {
        if (setter.fieldType === "array") {
          formattedProp = `array<${setter.elementType}> ${formattedProp}`;
        } else if (setter.fieldType !== "any") {
          formattedProp = `${setter.fieldType} ${formattedProp}`;
        }
      }
      
      result += `${nestedIndent}${formattedProp.trim()} = ${formattedValue};\n`;
    }
    
    result += `${indent}}`;
    return space < 1 ? result.replace(/[\n;]\s*/g, ';') : result;
  }

  _formatValue(value) {
    if (typeof value === 'string') return `"${value}"`;
    if (typeof value === 'boolean') return value ? "true" : "false";
    if (typeof value === 'object' && value !== null) return this.stringify(value);
    return value;
  }

  // Add property to an existing object
  setProperty(obj, propDefinition) {
    const parsedObj = this.parse(`{ ${propDefinition} }`);
    const propName = Object.keys(parsedObj)[0];
    
    if (!propName) this.error(`Invalid property definition: ${propDefinition}`);
    
    const propDescriptor = Object.getOwnPropertyDescriptor(parsedObj, propName);
    
    Object.defineProperty(obj, propName, propDescriptor);
    obj[propName] = parsedObj[propName];
    
    return obj;
  }
})})();