/* */ 
"format cjs";
"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

exports.__esModule = true;

var _AMDFormatter = require("./amd");

var _AMDFormatter2 = _interopRequireDefault(_AMDFormatter);

var _buildStrict = require("./_strict");

var _buildStrict2 = _interopRequireDefault(_buildStrict);

exports["default"] = _buildStrict2["default"](_AMDFormatter2["default"]);
module.exports = exports["default"];