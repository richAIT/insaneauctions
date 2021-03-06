/* */ 
"format cjs";
"use strict";

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === "object" && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } };

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

exports.__esModule = true;

var _TraversalPath = require("./path");

var _TraversalPath2 = _interopRequireDefault(_TraversalPath);

var _compact = require("lodash/array/compact");

var _compact2 = _interopRequireDefault(_compact);

var _import = require("../types");

var t = _interopRequireWildcard(_import);

var TraversalContext = (function () {
  function TraversalContext(scope, opts, state, parentPath) {
    _classCallCheck(this, TraversalContext);

    this.parentPath = parentPath;
    this.scope = scope;
    this.state = state;
    this.opts = opts;
  }

  TraversalContext.prototype.create = function create(node, obj, key) {
    return _TraversalPath2["default"].get(this.parentPath, this, node, obj, key);
  };

  TraversalContext.prototype.visitMultiple = function visitMultiple(nodes, node, key) {
    // nothing to traverse!
    if (nodes.length === 0) return false;

    var visited = [];

    var queue = this.queue = [];
    var stop = false;

    // build up initial queue
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i]) queue.push(this.create(node, nodes, i));
    }

    // visit the queue
    for (var i = 0; i < queue.length; i++) {
      var path = queue[i];
      if (visited.indexOf(path.node) >= 0) continue;
      visited.push(path.node);

      path.setContext(this.parentPath, this, path.key);

      if (path.visit()) {
        stop = true;
        break;
      }
    }

    // clear context from queued paths
    for (var i = 0; i < queue.length; i++) {}

    return stop;
  };

  TraversalContext.prototype.visitSingle = function visitSingle(node, key) {
    return this.create(node, node, key).visit();
  };

  TraversalContext.prototype.visit = function visit(node, key) {
    var nodes = node[key];
    if (!nodes) return;

    if (Array.isArray(nodes)) {
      return this.visitMultiple(nodes, node, key);
    } else {
      return this.visitSingle(node, key);
    }
  };

  return TraversalContext;
})();

exports["default"] = TraversalContext;
module.exports = exports["default"];

//queue[i].clearContext();