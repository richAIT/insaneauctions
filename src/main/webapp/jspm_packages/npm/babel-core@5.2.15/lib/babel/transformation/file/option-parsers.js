/* */ 
"format cjs";
"use strict";

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === "object" && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } };

exports.__esModule = true;
exports.transformerList = transformerList;
exports.number = number;
exports.boolean = boolean;
exports.booleanString = booleanString;
exports.list = list;

var _import = require("../../util");

var util = _interopRequireWildcard(_import);

function transformerList(key, val, pipeline) {
  val = util.arrayify(val);

  if (val.indexOf("all") >= 0 || val.indexOf(true) >= 0) {
    val = Object.keys(pipeline.transformers);
  }

  return pipeline._ensureTransformerNames(key, val);
}

function number(key, val) {
  return +val;
}

function boolean(key, val) {
  return !!val;
}

function booleanString(key, val) {
  return util.booleanify(val);
}

function list(key, val) {
  return util.list(val);
}