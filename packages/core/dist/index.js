"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Post: () => Post,
  add: () => add,
  subtract: () => subtract
});
module.exports = __toCommonJS(src_exports);

// ../../node_modules/class-validator/esm5/metadata/ValidationMetadata.js
var ValidationMetadata = (
  /** @class */
  function() {
    function ValidationMetadata2(args) {
      this.groups = [];
      this.each = false;
      this.context = void 0;
      this.type = args.type;
      this.name = args.name;
      this.target = args.target;
      this.propertyName = args.propertyName;
      this.constraints = args === null || args === void 0 ? void 0 : args.constraints;
      this.constraintCls = args.constraintCls;
      this.validationTypeOptions = args.validationTypeOptions;
      if (args.validationOptions) {
        this.message = args.validationOptions.message;
        this.groups = args.validationOptions.groups;
        this.always = args.validationOptions.always;
        this.each = args.validationOptions.each;
        this.context = args.validationOptions.context;
      }
    }
    return ValidationMetadata2;
  }()
);

// ../../node_modules/class-validator/esm5/validation-schema/ValidationSchemaToMetadataTransformer.js
var ValidationSchemaToMetadataTransformer = (
  /** @class */
  function() {
    function ValidationSchemaToMetadataTransformer2() {
    }
    ValidationSchemaToMetadataTransformer2.prototype.transform = function(schema) {
      var metadatas = [];
      Object.keys(schema.properties).forEach(function(property) {
        schema.properties[property].forEach(function(validation) {
          var validationOptions = {
            message: validation.message,
            groups: validation.groups,
            always: validation.always,
            each: validation.each
          };
          var args = {
            type: validation.type,
            name: validation.name,
            target: schema.name,
            propertyName: property,
            constraints: validation.constraints,
            validationTypeOptions: validation.options,
            validationOptions
          };
          metadatas.push(new ValidationMetadata(args));
        });
      });
      return metadatas;
    };
    return ValidationSchemaToMetadataTransformer2;
  }()
);

// ../../node_modules/class-validator/esm5/utils/get-global.util.js
function getGlobal() {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof self !== "undefined") {
    return self;
  }
}

// ../../node_modules/class-validator/esm5/metadata/MetadataStorage.js
var __values = function(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m)
    return m.call(o);
  if (o && typeof o.length === "number")
    return {
      next: function() {
        if (o && i >= o.length)
          o = void 0;
        return { value: o && o[i++], done: !o };
      }
    };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = function(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m)
    return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
      ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"]))
        m.call(i);
    } finally {
      if (e)
        throw e.error;
    }
  }
  return ar;
};
var __spreadArray = function(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var MetadataStorage = (
  /** @class */
  function() {
    function MetadataStorage2() {
      this.validationMetadatas = /* @__PURE__ */ new Map();
      this.constraintMetadatas = /* @__PURE__ */ new Map();
    }
    Object.defineProperty(MetadataStorage2.prototype, "hasValidationMetaData", {
      get: function() {
        return !!this.validationMetadatas.size;
      },
      enumerable: false,
      configurable: true
    });
    MetadataStorage2.prototype.addValidationSchema = function(schema) {
      var _this = this;
      var validationMetadatas = new ValidationSchemaToMetadataTransformer().transform(schema);
      validationMetadatas.forEach(function(validationMetadata) {
        return _this.addValidationMetadata(validationMetadata);
      });
    };
    MetadataStorage2.prototype.addValidationMetadata = function(metadata) {
      var existingMetadata = this.validationMetadatas.get(metadata.target);
      if (existingMetadata) {
        existingMetadata.push(metadata);
      } else {
        this.validationMetadatas.set(metadata.target, [metadata]);
      }
    };
    MetadataStorage2.prototype.addConstraintMetadata = function(metadata) {
      var existingMetadata = this.constraintMetadatas.get(metadata.target);
      if (existingMetadata) {
        existingMetadata.push(metadata);
      } else {
        this.constraintMetadatas.set(metadata.target, [metadata]);
      }
    };
    MetadataStorage2.prototype.groupByPropertyName = function(metadata) {
      var grouped = {};
      metadata.forEach(function(metadata2) {
        if (!grouped[metadata2.propertyName])
          grouped[metadata2.propertyName] = [];
        grouped[metadata2.propertyName].push(metadata2);
      });
      return grouped;
    };
    MetadataStorage2.prototype.getTargetValidationMetadatas = function(targetConstructor, targetSchema, always, strictGroups, groups) {
      var e_1, _a;
      var includeMetadataBecauseOfAlwaysOption = function(metadata) {
        if (typeof metadata.always !== "undefined")
          return metadata.always;
        if (metadata.groups && metadata.groups.length)
          return false;
        return always;
      };
      var excludeMetadataBecauseOfStrictGroupsOption = function(metadata) {
        if (strictGroups) {
          if (!groups || !groups.length) {
            if (metadata.groups && metadata.groups.length)
              return true;
          }
        }
        return false;
      };
      var filteredForOriginalMetadatasSearch = this.validationMetadatas.get(targetConstructor) || [];
      var originalMetadatas = filteredForOriginalMetadatasSearch.filter(function(metadata) {
        if (metadata.target !== targetConstructor && metadata.target !== targetSchema)
          return false;
        if (includeMetadataBecauseOfAlwaysOption(metadata))
          return true;
        if (excludeMetadataBecauseOfStrictGroupsOption(metadata))
          return false;
        if (groups && groups.length > 0)
          return metadata.groups && !!metadata.groups.find(function(group) {
            return groups.indexOf(group) !== -1;
          });
        return true;
      });
      var filteredForInheritedMetadatasSearch = [];
      try {
        for (var _b = __values(this.validationMetadatas.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
          var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
          if (targetConstructor.prototype instanceof key) {
            filteredForInheritedMetadatasSearch.push.apply(filteredForInheritedMetadatasSearch, __spreadArray([], __read(value), false));
          }
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (_c && !_c.done && (_a = _b.return))
            _a.call(_b);
        } finally {
          if (e_1)
            throw e_1.error;
        }
      }
      var inheritedMetadatas = filteredForInheritedMetadatasSearch.filter(function(metadata) {
        if (typeof metadata.target === "string")
          return false;
        if (metadata.target === targetConstructor)
          return false;
        if (metadata.target instanceof Function && !(targetConstructor.prototype instanceof metadata.target))
          return false;
        if (includeMetadataBecauseOfAlwaysOption(metadata))
          return true;
        if (excludeMetadataBecauseOfStrictGroupsOption(metadata))
          return false;
        if (groups && groups.length > 0)
          return metadata.groups && !!metadata.groups.find(function(group) {
            return groups.indexOf(group) !== -1;
          });
        return true;
      });
      var uniqueInheritedMetadatas = inheritedMetadatas.filter(function(inheritedMetadata) {
        return !originalMetadatas.find(function(originalMetadata) {
          return originalMetadata.propertyName === inheritedMetadata.propertyName && originalMetadata.type === inheritedMetadata.type;
        });
      });
      return originalMetadatas.concat(uniqueInheritedMetadatas);
    };
    MetadataStorage2.prototype.getTargetValidatorConstraints = function(target) {
      return this.constraintMetadatas.get(target) || [];
    };
    return MetadataStorage2;
  }()
);
function getMetadataStorage() {
  var global2 = getGlobal();
  if (!global2.classValidatorMetadataStorage) {
    global2.classValidatorMetadataStorage = new MetadataStorage();
  }
  return global2.classValidatorMetadataStorage;
}

// ../../node_modules/class-validator/esm5/validation/ValidationTypes.js
var ValidationTypes = (
  /** @class */
  function() {
    function ValidationTypes2() {
    }
    ValidationTypes2.isValid = function(type) {
      var _this = this;
      return type !== "isValid" && type !== "getMessage" && Object.keys(this).map(function(key) {
        return _this[key];
      }).indexOf(type) !== -1;
    };
    ValidationTypes2.CUSTOM_VALIDATION = "customValidation";
    ValidationTypes2.NESTED_VALIDATION = "nestedValidation";
    ValidationTypes2.PROMISE_VALIDATION = "promiseValidation";
    ValidationTypes2.CONDITIONAL_VALIDATION = "conditionalValidation";
    ValidationTypes2.WHITELIST = "whitelistValidation";
    ValidationTypes2.IS_DEFINED = "isDefined";
    return ValidationTypes2;
  }()
);

// ../../node_modules/class-validator/esm5/container.js
var defaultContainer = new /** @class */
(function() {
  function class_1() {
    this.instances = [];
  }
  class_1.prototype.get = function(someClass) {
    var instance = this.instances.find(function(instance2) {
      return instance2.type === someClass;
    });
    if (!instance) {
      instance = { type: someClass, object: new someClass() };
      this.instances.push(instance);
    }
    return instance.object;
  };
  return class_1;
}())();
var userContainer;
var userContainerOptions;
function getFromContainer(someClass) {
  if (userContainer) {
    try {
      var instance = userContainer.get(someClass);
      if (instance)
        return instance;
      if (!userContainerOptions || !userContainerOptions.fallback)
        return instance;
    } catch (error) {
      if (!userContainerOptions || !userContainerOptions.fallbackOnErrors)
        throw error;
    }
  }
  return defaultContainer.get(someClass);
}

// ../../node_modules/class-validator/esm5/metadata/ConstraintMetadata.js
var ConstraintMetadata = (
  /** @class */
  function() {
    function ConstraintMetadata2(target, name, async) {
      if (async === void 0) {
        async = false;
      }
      this.target = target;
      this.name = name;
      this.async = async;
    }
    Object.defineProperty(ConstraintMetadata2.prototype, "instance", {
      // -------------------------------------------------------------------------
      // Accessors
      // -------------------------------------------------------------------------
      /**
       * Instance of the target custom validation class which performs validation.
       */
      get: function() {
        return getFromContainer(this.target);
      },
      enumerable: false,
      configurable: true
    });
    return ConstraintMetadata2;
  }()
);

// ../../node_modules/class-validator/esm5/register-decorator.js
function registerDecorator(options) {
  var constraintCls;
  if (options.validator instanceof Function) {
    constraintCls = options.validator;
    var constraintClasses = getFromContainer(MetadataStorage).getTargetValidatorConstraints(options.validator);
    if (constraintClasses.length > 1) {
      throw "More than one implementation of ValidatorConstraintInterface found for validator on: ".concat(options.target.name, ":").concat(options.propertyName);
    }
  } else {
    var validator_1 = options.validator;
    constraintCls = /** @class */
    function() {
      function CustomConstraint() {
      }
      CustomConstraint.prototype.validate = function(value, validationArguments) {
        return validator_1.validate(value, validationArguments);
      };
      CustomConstraint.prototype.defaultMessage = function(validationArguments) {
        if (validator_1.defaultMessage) {
          return validator_1.defaultMessage(validationArguments);
        }
        return "";
      };
      return CustomConstraint;
    }();
    getMetadataStorage().addConstraintMetadata(new ConstraintMetadata(constraintCls, options.name, options.async));
  }
  var validationMetadataArgs = {
    type: options.name && ValidationTypes.isValid(options.name) ? options.name : ValidationTypes.CUSTOM_VALIDATION,
    name: options.name,
    target: options.target,
    propertyName: options.propertyName,
    validationOptions: options.options,
    constraintCls,
    constraints: options.constraints
  };
  getMetadataStorage().addValidationMetadata(new ValidationMetadata(validationMetadataArgs));
}

// ../../node_modules/class-validator/esm5/decorator/common/ValidateBy.js
function buildMessage(impl, validationOptions) {
  return function(validationArguments) {
    var eachPrefix = validationOptions && validationOptions.each ? "each value in " : "";
    return impl(eachPrefix, validationArguments);
  };
}
function ValidateBy(options, validationOptions) {
  return function(object, propertyName) {
    registerDecorator({
      name: options.name,
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: options.constraints,
      validator: options.validator
    });
  };
}

// ../../node_modules/class-validator/esm5/decorator/common/IsDefined.js
var IS_DEFINED = ValidationTypes.IS_DEFINED;
function isDefined(value) {
  return value !== void 0 && value !== null;
}
function IsDefined(validationOptions) {
  return ValidateBy({
    name: IS_DEFINED,
    validator: {
      validate: function(value) {
        return isDefined(value);
      },
      defaultMessage: buildMessage(function(eachPrefix) {
        return eachPrefix + "$property should not be null or undefined";
      }, validationOptions)
    }
  }, validationOptions);
}

// src/index.ts
var add = (a, b) => a + b;
var subtract = (a, b) => a - b;
var Post = class {
};
__decorateClass([
  IsDefined()
], Post.prototype, "title", 2);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Post,
  add,
  subtract
});
