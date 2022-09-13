import type { Options, SourceLocation } from 'acorn'

interface BaseNodeProps {
  type: string
  start: number
  end: number
  loc?: SourceLocation
  sourceFile?: string
  range?: [number, number]
}

export type Node =
  Program |
  BreakStatement |
  ContinueStatement |
  DebuggerStatement |
  DoWhileStatement |
  ForStatement |
  ForInStatement |
  ForOfStatement |
  IfStatement |
  ReturnStatement |
  ThrowStatement |
  SwitchCase |
  SwitchStatement |
  TryStatement |
  CatchClause |
  VariableDeclaration |
  VariableDeclarator |
  WhileStatement |
  WithStatement |
  EmptyStatement |
  LabeledStatement |
  ExpressionStatement |
  BlockStatement |
  FunctionDeclaration |
  FunctionExpression |
  ClassDeclaration |
  ClassExpression |
  ClassBody |
  MethodDefinition |
  PropertyDefinition |
  StaticBlock |
  ExportAllDeclaration |
  ExportSpecifier |
  ExportNamedDeclaration |
  ExportDefaultDeclaration |
  ImportDeclaration |
  ImportNamespaceSpecifier |
  ImportDefaultSpecifier |
  ImportSpecifier |
  SequenceExpression |
  YieldExpression |
  AssignmentExpression |
  ConditionalExpression |
  LogicalExpression |
  BinaryExpression |
  UpdateExpression |
  UnaryExpression |
  ChainExpression |
  MemberExpression |
  CallExpression |
  TaggedTemplateExpression |
  ThisExpression |
  Super |
  Literal |
  ParenthesizedExpression |
  ArrayExpression |
  Identifier |
  MetaProperty |
  ImportExpression |
  NewExpression |
  TemplateElement |
  TemplateLiteral |
  ObjectExpression |
  SpreadElement |
  Property |
  PrivateIdentifier |
  ObjectPattern |
  ArrayPattern |
  RestElement |
  AssignmentPattern

export interface Program extends BaseNodeProps {
  type: 'Program'
  sourceType: Options['sourceType']
  body: Array<Node>
}

export interface BreakStatement extends BaseNodeProps {
  type: 'BreakStatement'
  label: null | Node
}

export interface ContinueStatement extends BaseNodeProps {
  type: 'ContinueStatement'
  label: null | Node
}

export interface DebuggerStatement extends BaseNodeProps {
  type: 'DebuggerStatement'
}

export interface DoWhileStatement extends BaseNodeProps {
  type: 'DoWhileStatement'
  body: Node
  test: Node
}

export interface ForStatement extends BaseNodeProps {
  type: 'ForStatement'
  init: Node | null
  test: Node | null
  update: Node | null
  body: Node
}

export interface ForInStatement extends BaseNodeProps {
  type: 'ForInStatement'
  body: Node
  left: Node
  right: Node
}

export interface ForOfStatement extends BaseNodeProps {
  type: 'ForOfStatement'
  body: Node
  left: Node
  right: Node
}

export interface IfStatement extends BaseNodeProps{
  type: 'IfStatement'
  test: Node
  consequent: Node
  alternate: Node
}

export interface ReturnStatement extends BaseNodeProps{
  type: 'ReturnStatement'
  argument: Node | null
}

export interface SwitchCase extends BaseNodeProps{
  type: 'SwitchCase'
  consequent: Array<Node>
  test: Node | null
}

export interface SwitchStatement extends BaseNodeProps{
  type: 'SwitchStatement'
  discriminant: Node
  cases: Array<Node>
}

export interface ThrowStatement extends BaseNodeProps{
  type: 'ThrowStatement'
  argument: Node
}

export interface TryStatement extends BaseNodeProps{
  type: 'TryStatement'
  block: Node
  handler: Node | null
  finalizer : Node | null
}

export interface CatchClause extends BaseNodeProps{
  type: 'CatchClause'
  param: Node | null
  body: Node
}

export interface VariableDeclaration extends BaseNodeProps{
  type: 'VariableDeclaration'
  declarations: Array<Node>
  kind: string
}

export interface VariableDeclarator extends BaseNodeProps{
  type: 'VariableDeclarator'
  id: Node
  init: Node | null
}

export interface WhileStatement extends BaseNodeProps{
  type: 'WhileStatement'
  test: Node
  body: Node
}

export interface WithStatement extends BaseNodeProps{
  type: 'WithStatement'
  object: Node
  body: Node
}

export interface EmptyStatement extends BaseNodeProps{
  type: 'EmptyStatement'
}

export interface LabeledStatement extends BaseNodeProps{
  type: 'LabeledStatement'
  body: Node
  label: Node
}

export interface ExpressionStatement extends BaseNodeProps{
  type: 'ExpressionStatement'
  expression: Node
}

export interface BlockStatement extends BaseNodeProps{
  type: 'BlockStatement'
  body: Array<Node>
}

export interface FunctionDeclaration extends BaseNodeProps{
  type: 'FunctionDeclaration'
  id: Node | null
  generator: boolean
  async: boolean
  params: Array<Node>
  expression: boolean
  body: Node
}

export interface FunctionExpression extends BaseNodeProps{
  type: 'FunctionExpression'
  id: Node | null
  generator: boolean
  async: boolean
  params: Array<Node>
  expression: boolean
  body: Node
}

export interface ClassDeclaration extends BaseNodeProps{
  type: 'ClassDeclaration'
  id: Node | null
  superClass: Node | null
  body: Node
}

export interface ClassExpression extends BaseNodeProps{
  type: 'ClassExpression'
  id: Node | null
  superClass: Node | null
  body: Node
}

export interface ClassBody extends BaseNodeProps {
  type: 'ClassBody'
  body: Array<Node>
}

export interface MethodDefinition extends BaseNodeProps {
  type: 'MethodDefinition'
  static: boolean
  computed: boolean
  key: Node
  kind: string
  value: Node
}

export interface PropertyDefinition extends BaseNodeProps {
  type: 'PropertyDefinition'
  static: boolean
  computed: boolean
  key: Node
  value: Node | null
}

export interface StaticBlock extends BaseNodeProps {
  type: 'StaticBlock'
  body: Array<Node>
}

export interface ExportAllDeclaration extends BaseNodeProps {
  type: 'ExportAllDeclaration'
  exported: Node | null
  source: Node
}

export interface ExportDefaultDeclaration extends BaseNodeProps {
  type: 'ExportDefaultDeclaration'
  declaration: Node
}

export interface ExportNamedDeclaration extends BaseNodeProps {
  type: 'ExportNamedDeclaration'
  declaration: Node | null
  specifiers: Array<Node>
  source: Node | null
}

export interface ExportSpecifier extends BaseNodeProps {
  type: 'ExportSpecifier'
  local: Node
  exported: Node
}

export interface ImportDeclaration extends BaseNodeProps {
  type: 'ImportDeclaration'
  local: Node
  exported: Node
  specifiers: Array<Node>
  source: Node
}

export interface ImportDefaultSpecifier extends BaseNodeProps {
  type: 'ImportDefaultSpecifier'
  local: Node
}

export interface ImportNamespaceSpecifier extends BaseNodeProps {
  type: 'ImportNamespaceSpecifier'
  local: Node
}

export interface ImportSpecifier extends BaseNodeProps {
  type: 'ImportSpecifier'
  local: Node
  imported: Node
}

export interface SequenceExpression extends BaseNodeProps {
  type: 'SequenceExpression'
  expressions: Array<Node>
}

export interface YieldExpression extends BaseNodeProps {
  type: 'YieldExpression'
  delegate: boolean
  argument: Node | null
}

export interface AssignmentExpression extends BaseNodeProps {
  type: 'AssignmentExpression'
  operator: string
  left: Node
  right: Node
}

export interface ConditionalExpression extends BaseNodeProps {
  type: 'ConditionalExpression'
  test: Node
  consequent: Node
  alternate: Node
}

export interface LogicalExpression extends BaseNodeProps {
  type: 'LogicalExpression'
  operator: string
  left: Node
  right: Node
}

export interface BinaryExpression extends BaseNodeProps {
  type: 'BinaryExpression'
  operator: string
  left: Node
  right: Node
}

export interface UpdateExpression extends BaseNodeProps {
  type: 'UpdateExpression'
  operator: string
  prefix: boolean
  argument: Node
}

export interface UnaryExpression extends BaseNodeProps {
  type: 'UnaryExpression'
  operator: string
  prefix: boolean
  argument: Node
}

export interface ChainExpression extends BaseNodeProps {
  type: 'ChainExpression'
  expression: Node
}

export interface MemberExpression extends BaseNodeProps {
  type: 'MemberExpression'
  object: Node
  property: Node
  computed: boolean
  optional?: boolean
}

export interface CallExpression extends BaseNodeProps {
  type: 'CallExpression'
  callee: Node
  arguments: Node
  optional?: boolean
}

export interface TaggedTemplateExpression extends BaseNodeProps {
  type: 'TaggedTemplateExpression'
  tag: Node
  quasi: Node
}

export interface ThisExpression extends BaseNodeProps {
  type: 'ThisExpression'
}

export interface Super extends BaseNodeProps {
  type: 'Super'
}

export interface Literal extends BaseNodeProps {
  type: 'Literal'
  regex?: {
    pattern: string
    flags: string
  }
  value: string | null
  raw: string
  bigint?: string
}

export interface ParenthesizedExpression extends BaseNodeProps {
  type: 'ParenthesizedExpression'
  expression: Node
}

export interface ArrayExpression extends BaseNodeProps {
  type: 'ArrayExpression'
  elements: Array<Node | null>
}

export interface Identifier extends BaseNodeProps {
  type: 'Identifier'
  name: string
}

export interface MetaProperty extends BaseNodeProps {
  type: 'MetaProperty'
  meta: Node
  property: Node
}

export interface ImportExpression extends BaseNodeProps {
  type: 'ImportExpression'
  source: Node
}

export interface NewExpression extends BaseNodeProps {
  type: 'NewExpression'
  callee: Node
  arguments: Array<Node>
}

export interface TemplateElement extends BaseNodeProps {
  type: 'TemplateElement'
  value: {
    raw: string
    cooked: null | string
  }
  tail: boolean
}

export interface TemplateLiteral extends BaseNodeProps {
  type: 'TemplateLiteral'
  expressions: Array<Node>
  quasis: Array<Node>
}

export interface ObjectExpression extends BaseNodeProps {
  type: 'ObjectExpression'
  properties: Array<Node>
}

export interface SpreadElement extends BaseNodeProps {
  type: 'SpreadElement'
  argument: Array<Node>
}

export interface Property extends BaseNodeProps {
  type: 'Property'
  method: boolean
  shorthand: boolean
  key: Node
  computed?: boolean
  kind: string
  value: Node
}

export interface PrivateIdentifier extends BaseNodeProps {
  type: 'PrivateIdentifier'
  name: string
}

export interface ObjectPattern extends BaseNodeProps {
  type: 'ObjectPattern'
  properties: Array<Node>
}

export interface ArrayPattern extends BaseNodeProps {
  type: 'ArrayPattern'
  elements: Array<Node | null>
}

export interface RestElement extends BaseNodeProps {
  type: 'RestElement'
  argument: Array<Node>
}

export interface AssignmentPattern extends BaseNodeProps {
  type: 'AssignmentPattern'
  left: Node
  right: Node
}
