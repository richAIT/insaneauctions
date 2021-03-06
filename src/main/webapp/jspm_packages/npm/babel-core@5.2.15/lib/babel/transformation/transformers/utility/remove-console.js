/* */ 
"format cjs";
"use strict";

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === "object" && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } };

exports.__esModule = true;
exports.CallExpression = CallExpression;

var _import = require("../../../types");

var t = _interopRequireWildcard(_import);

var metadata = {
  optional: true
};

exports.metadata = metadata;

function CallExpression(node, parent) {
  if (this.get("callee").matchesPattern("console", true)) {
    if (t.isExpressionStatement(parent)) {
      this.parentPath.remove();
    } else {
      this.remove();
    }
  }
}