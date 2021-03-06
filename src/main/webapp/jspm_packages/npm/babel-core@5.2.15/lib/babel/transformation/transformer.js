/* */ 
"format cjs";
"use strict";

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === "object" && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } };

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

exports.__esModule = true;

var _TransformerPass = require("./transformer-pass");

var _TransformerPass2 = _interopRequireDefault(_TransformerPass);

var _import = require("../messages");

var messages = _interopRequireWildcard(_import);

var _isFunction = require("lodash/lang/isFunction");

var _isFunction2 = _interopRequireDefault(_isFunction);

var _traverse = require("../traversal");

var _traverse2 = _interopRequireDefault(_traverse);

var _isObject = require("lodash/lang/isObject");

var _isObject2 = _interopRequireDefault(_isObject);

var _assign = require("lodash/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _import2 = require("../../acorn");

var acorn = _interopRequireWildcard(_import2);

var _File = require("./file");

var _File2 = _interopRequireDefault(_File);

var _each = require("lodash/collection/each");

var _each2 = _interopRequireDefault(_each);

/**
 * This is the class responsible for normalising a transformers handlers
 * as well as constructing a `TransformerPass` that is responsible for
 * actually running the transformer over the provided `File`.
 */

var Transformer = (function () {
  function Transformer(transformerKey, transformer) {
    _classCallCheck(this, Transformer);

    transformer = _assign2["default"]({}, transformer);

    var take = function take(key) {
      var val = transformer[key];
      delete transformer[key];
      return val;
    };

    this.manipulateOptions = take("manipulateOptions");
    this.shouldVisit = take("shouldVisit");
    this.metadata = take("metadata") || {};
    this.parser = take("parser");
    this.post = take("post");
    this.pre = take("pre");

    //

    if (this.metadata.stage != null) {
      this.metadata.optional = true;
    }

    //

    this.handlers = this.normalize(transformer);
    this.key = transformerKey;

    //

    if (!this.shouldVisit && !this.handlers.enter && !this.handlers.exit) {
      var types = Object.keys(this.handlers);
      this.shouldVisit = function (node) {
        for (var i = 0; i < types.length; i++) {
          if (node.type === types[i]) return true;
        }
        return false;
      };
    }
  }

  Transformer.prototype.normalize = function normalize(transformer) {
    var _this = this;

    if (_isFunction2["default"](transformer)) {
      transformer = { ast: transformer };
    }

    _traverse2["default"].explode(transformer);

    _each2["default"](transformer, function (fns, type) {
      // hidden property
      if (type[0] === "_") {
        _this[type] = fns;
        return;
      }

      if (type === "enter" || type === "exit") return;

      if (_isFunction2["default"](fns)) fns = { enter: fns };

      if (!_isObject2["default"](fns)) return;

      if (!fns.enter) fns.enter = function () {};
      if (!fns.exit) fns.exit = function () {};

      transformer[type] = fns;
    });

    return transformer;
  };

  Transformer.prototype.buildPass = function buildPass(file) {
    // validate Transformer instance
    if (!(file instanceof _File2["default"])) {
      throw new TypeError(messages.get("transformerNotFile", this.key));
    }

    return new _TransformerPass2["default"](file, this);
  };

  return Transformer;
})();

exports["default"] = Transformer;
module.exports = exports["default"];