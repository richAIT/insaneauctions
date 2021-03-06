/* */ 
"format cjs";
"use strict";

exports.__esModule = true;
exports.ClassDeclaration = ClassDeclaration;
exports.ClassBody = ClassBody;
exports.ClassProperty = ClassProperty;
exports.MethodDefinition = MethodDefinition;

function ClassDeclaration(node, print) {
  print.list(node.decorators);
  this.push("class");

  if (node.id) {
    this.space();
    print(node.id);
  }

  print(node.typeParameters);

  if (node.superClass) {
    this.push(" extends ");
    print(node.superClass);
    print(node.superTypeParameters);
  }

  if (node["implements"]) {
    this.push(" implements ");
    print.join(node["implements"], { separator: ", " });
  }

  this.space();
  print(node.body);
}

exports.ClassExpression = ClassDeclaration;

function ClassBody(node, print) {
  if (node.body.length === 0) {
    this.push("{}");
  } else {
    this.push("{");
    this.newline();

    this.indent();
    print.sequence(node.body);
    this.dedent();

    this.rightBrace();
  }
}

function ClassProperty(node, print) {
  print.list(node.decorators);

  if (node["static"]) this.push("static ");
  print(node.key);
  print(node.typeAnnotation);
  if (node.value) {
    this.space();
    this.push("=");
    this.space();
    print(node.value);
  }
  this.semicolon();
}

function MethodDefinition(node, print) {
  print.list(node.decorators);

  if (node["static"]) {
    this.push("static ");
  }

  this._method(node, print);
}