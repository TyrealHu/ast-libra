import type { AcornNodeTypeMap, AcornNodeTypeString } from '../node'

type WalkFunc<T extends AcornNodeTypeString> = (node: AcornNodeTypeMap[T]) => any

export interface BaseWalk {
  Program: WalkFunc<'Program'>;
  BreakStatement: WalkFunc<'BreakStatement'>;
  ContinueStatement: WalkFunc<'ContinueStatement'>;
  DebuggerStatement: WalkFunc<'DebuggerStatement'>;
  DoWhileStatement: WalkFunc<'DoWhileStatement'>;
  ForStatement: WalkFunc<'ForStatement'>;
  ForInStatement: WalkFunc<'ForInStatement'>;
  ForOfStatement: WalkFunc<'ForOfStatement'>;
  IfStatement: WalkFunc<'IfStatement'>;
  ReturnStatement: WalkFunc<'ReturnStatement'>;
  ThrowStatement: WalkFunc<'ThrowStatement'>;
  SwitchCase: WalkFunc<'SwitchCase'>;
  SwitchStatement: WalkFunc<'SwitchStatement'>;
  TryStatement: WalkFunc<'TryStatement'>;
  CatchClause: WalkFunc<'CatchClause'>;
  VariableDeclaration: WalkFunc<'VariableDeclaration'>;
  VariableDeclarator: WalkFunc<'VariableDeclarator'>;
  WhileStatement: WalkFunc<'WhileStatement'>;
  WithStatement: WalkFunc<'WithStatement'>;
  EmptyStatement: WalkFunc<'EmptyStatement'>;
  LabeledStatement: WalkFunc<'LabeledStatement'>;
  ExpressionStatement: WalkFunc<'ExpressionStatement'>;
  BlockStatement: WalkFunc<'BlockStatement'>;
  FunctionDeclaration: WalkFunc<'FunctionDeclaration'>;
  FunctionExpression: WalkFunc<'FunctionExpression'>;
  ClassDeclaration: WalkFunc<'ClassDeclaration'>;
  ClassExpression: WalkFunc<'ClassExpression'>;
  ClassBody: WalkFunc<'ClassBody'>;
  MethodDefinition: WalkFunc<'MethodDefinition'>;
  PropertyDefinition: WalkFunc<'PropertyDefinition'>;
  StaticBlock: WalkFunc<'StaticBlock'>;
  ExportAllDeclaration: WalkFunc<'ExportAllDeclaration'>;
  ExportSpecifier: WalkFunc<'ExportSpecifier'>;
  ExportNamedDeclaration: WalkFunc<'ExportNamedDeclaration'>;
  ExportDefaultDeclaration: WalkFunc<'ExportDefaultDeclaration'>;
  ImportDeclaration: WalkFunc<'ImportDeclaration'>;
  ImportNamespaceSpecifier: WalkFunc<'ImportNamespaceSpecifier'>;
  ImportDefaultSpecifier: WalkFunc<'ImportDefaultSpecifier'>;
  ImportSpecifier: WalkFunc<'ImportSpecifier'>;
  SequenceExpression: WalkFunc<'SequenceExpression'>;
  YieldExpression: WalkFunc<'YieldExpression'>;
  AssignmentExpression: WalkFunc<'AssignmentExpression'>;
  ConditionalExpression: WalkFunc<'ConditionalExpression'>;
  LogicalExpression: WalkFunc<'LogicalExpression'>;
  BinaryExpression: WalkFunc<'BinaryExpression'>;
  UpdateExpression: WalkFunc<'UpdateExpression'>;
  UnaryExpression: WalkFunc<'UnaryExpression'>;
  ChainExpression: WalkFunc<'ChainExpression'>;
  MemberExpression: WalkFunc<'MemberExpression'>;
  CallExpression: WalkFunc<'CallExpression'>;
  TaggedTemplateExpression: WalkFunc<'TaggedTemplateExpression'>;
  ThisExpression: WalkFunc<'ThisExpression'>;
  Super: WalkFunc<'Super'>;
  Literal: WalkFunc<'Literal'>;
  ParenthesizedExpression: WalkFunc<'ParenthesizedExpression'>;
  ArrayExpression: WalkFunc<'ArrayExpression'>;
  Identifier: WalkFunc<'Identifier'>;
  MetaProperty: WalkFunc<'MetaProperty'>;
  ImportExpression: WalkFunc<'ImportExpression'>;
  NewExpression: WalkFunc<'NewExpression'>;
  TemplateElement: WalkFunc<'TemplateElement'>;
  TemplateLiteral: WalkFunc<'TemplateLiteral'>;
  ObjectExpression: WalkFunc<'ObjectExpression'>;
  SpreadElement: WalkFunc<'SpreadElement'>;
  Property: WalkFunc<'Property'>;
  PrivateIdentifier: WalkFunc<'PrivateIdentifier'>;
  ObjectPattern: WalkFunc<'ObjectPattern'>;
  ArrayPattern: WalkFunc<'ArrayPattern'>;
  RestElement: WalkFunc<'RestElement'>;
  AssignmentPattern: WalkFunc<'AssignmentPattern'>;
  ArrowFunctionExpression: WalkFunc<'ArrowFunctionExpression'>;
  AwaitExpression: WalkFunc<'AwaitExpression'>;
}

export type TraverseWalk = Partial<BaseWalk>
