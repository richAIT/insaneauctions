/* */ 
"format cjs";
"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

exports.__esModule = true;

var _CommonFormatter = require("./common");

var _CommonFormatter2 = _interopRequireDefault(_CommonFormatter);

var _buildStrict = require("./_strict");

var _buildStrict2 = _interopRequireDefault(_buildStrict);

exports["default"] = _buildStrict2["default"](_CommonFormatter2["default"]);
module.exports = exports["default"];