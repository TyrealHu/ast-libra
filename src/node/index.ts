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
  AssignmentExpression |
  ConditionalExpression |
  LogicalExpression |
  BinaryExpression


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
