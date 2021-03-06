/* */ 
"format cjs";
"use strict";

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === "object" && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } };

exports.__esModule = true;
exports.ForOfStatement = ForOfStatement;
exports.MethodDefinition = MethodDefinition;
exports.Property = Property;
exports.BlockStatement = BlockStatement;

var _import = require("../../../messages");

var messages = _interopRequireWildcard(_import);

var _import2 = require("../../../types");

var t = _interopRequireWildcard(_import2);

var metadata = {
  readOnly: true
};

exports.metadata = metadata;

function ForOfStatement(node, parent, scope, file) {
  var left = node.left;
  if (t.isVariableDeclaration(left)) {
    var declar = left.declarations[0];
    if (declar.init) throw file.errorWithNode(declar, messages.get("noAssignmentsInForHead"));
  }
}

exports.ForInStatement = ForOfStatement;

function MethodDefinition(node) {
  if (node.kind !== "constructor") {
    // get constructor() {}
    var isConstructor = !node.computed && t.isIdentifier(node.key, { name: "constructor" });

    // get ["constructor"]() {}
    isConstructor = isConstructor || t.isLiteral(node.key, { value: "constructor" });

    if (isConstructor) {
      throw this.errorWithNode(messages.get("classesIllegalConstructorKind"));
    }
  }

  Property.apply(this, arguments);
}

function Property(node, parent, scope, file) {
  if (node.kind === "set") {
    if (node.value.params.length !== 1) {
      throw file.errorWithNode(node.value, messages.get("settersInvalidParamLength"));
    }

    var first = node.value.params[0];
    if (t.isRestElement(first)) {
      throw file.errorWithNode(first, messages.get("settersNoRest"));
    }
  }
}

function BlockStatement(node) {
  for (var i = 0; i < node.body.length; i++) {
    var bodyNode = node.body[i];
    if (t.isExpressionStatement(bodyNode) && t.isLiteral(bodyNode.expression)) {
      bodyNode._blockHoist = Infinity;
    } else {
      return;
    }
  }
}

exports.Program = BlockStatement;