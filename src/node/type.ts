import type * as acorn from 'acorn'

export interface BaseNodeProps {
  type: string
  start: number
  end: number
  loc?: acorn.SourceLocation
  sourceFile?: string
  range?: [number, number]
}

export interface AcornNodeTypeMap {
  Program: Program
  BreakStatement: BreakStatement
  ContinueStatement: ContinueStatement
  DebuggerStatement: DebuggerStatement
  DoWhileStatement: DoWhileStatement
  ForStatement: ForStatement
  ForInStatement: ForInStatement
  ForOfStatement: ForOfStatement
  IfStatement: IfStatement
  ReturnStatement: ReturnStatement
  ThrowStatement: ThrowStatement
  SwitchCase: SwitchCase
  SwitchStatement: SwitchStatement
  TryStatement: TryStatement
  CatchClause: CatchClause
  VariableDeclaration: VariableDeclaration
  VariableDeclarator: VariableDeclarator
  WhileStatement: WhileStatement
  WithStatement: WithStatement
  EmptyStatement: EmptyStatement
  LabeledStatement: LabeledStatement
  ExpressionStatement: ExpressionStatement
  BlockStatement: BlockStatement
  FunctionDeclaration: FunctionDeclaration
  FunctionExpression: FunctionExpression
  ClassDeclaration: ClassDeclaration
  ClassExpression: ClassExpression
  ClassBody: ClassBody
  MethodDefinition: MethodDefinition
  PropertyDefinition: PropertyDefinition
  StaticBlock: StaticBlock
  ExportAllDeclaration: ExportAllDeclaration
  ExportSpecifier: ExportSpecifier
  ExportNamedDeclaration: ExportNamedDeclaration
  ExportDefaultDeclaration: ExportDefaultDeclaration
  ImportDeclaration: ImportDeclaration
  ImportNamespaceSpecifier: ImportNamespaceSpecifier
  ImportDefaultSpecifier: ImportDefaultSpecifier
  ImportSpecifier: ImportSpecifier
  SequenceExpression: SequenceExpression
  YieldExpression: YieldExpression
  AssignmentExpression: AssignmentExpression
  ConditionalExpression: ConditionalExpression
  LogicalExpression: LogicalExpression
  BinaryExpression: BinaryExpression
  UpdateExpression: UpdateExpression
  UnaryExpression: UnaryExpression
  ChainExpression: ChainExpression
  MemberExpression: MemberExpression
  CallExpression: CallExpression
  TaggedTemplateExpression: TaggedTemplateExpression
  ThisExpression: ThisExpression
  Super: Super
  Literal: Literal
  ParenthesizedExpression: ParenthesizedExpression
  ArrayExpression: ArrayExpression
  Identifier: Identifier
  MetaProperty: MetaProperty
  ImportExpression: ImportExpression
  NewExpression: NewExpression
  TemplateElement: TemplateElement
  TemplateLiteral: TemplateLiteral
  ObjectExpression: ObjectExpression
  SpreadElement: SpreadElement
  Property: Property
  PrivateIdentifier: PrivateIdentifier
  ObjectPattern: ObjectPattern
  ArrayPattern: ArrayPattern
  RestElement: RestElement
  AssignmentPattern: AssignmentPattern
  ArrowFunctionExpression: ArrowFunctionExpression
  AwaitExpression: AwaitExpression
}

export type AcornNodeType = AcornNodeTypeMap[keyof AcornNodeTypeMap]

export type AcornNodeTypeString = AcornNodeType['type']

export type Expression =
  | ArrayExpression
  | AssignmentExpression
  | BinaryExpression
  | CallExpression
  | ConditionalExpression
  | FunctionExpression
  | Identifier
  | LogicalExpression
  | MemberExpression
  | NewExpression
  | ObjectExpression
  | SequenceExpression
  | ParenthesizedExpression
  | ThisExpression
  | UnaryExpression
  | UpdateExpression
  | ArrowFunctionExpression
  | ClassExpression
  | MetaProperty
  | Super
  | TaggedTemplateExpression
  | TemplateLiteral
  | YieldExpression
  | AwaitExpression

export type Statement =
  | BlockStatement
  | BreakStatement
  | ContinueStatement
  | DebuggerStatement
  | DoWhileStatement
  | EmptyStatement
  | ExpressionStatement
  | ForInStatement
  | ForStatement
  | FunctionDeclaration
  | IfStatement
  | LabeledStatement
  | ReturnStatement
  | SwitchStatement
  | ThrowStatement
  | TryStatement
  | VariableDeclaration
  | WhileStatement
  | WithStatement
  | ClassDeclaration
  | ExportAllDeclaration
  | ExportDefaultDeclaration
  | ExportNamedDeclaration
  | ForOfStatement
  | ImportDeclaration

export type Pattern = AssignmentPattern | ArrayPattern | ObjectPattern

export type LVal =
  | Identifier
  | MemberExpression
  | RestElement
  | AssignmentPattern
  | ArrayPattern
  | ObjectPattern

export type PatternLike =
  | Identifier
  | RestElement
  | AssignmentPattern
  | ArrayPattern
  | ObjectPattern

export type Declaration =
  | FunctionDeclaration
  | VariableDeclaration
  | ClassDeclaration
  | ExportAllDeclaration
  | ExportDefaultDeclaration
  | ExportNamedDeclaration
  | ImportDeclaration

export interface Program extends BaseNodeProps {
  type: 'Program'
  sourceType: acorn.Options['sourceType']
  body: Statement[]
}

export interface BreakStatement extends BaseNodeProps {
  type: 'BreakStatement'
  label: null | Identifier
}

export interface ContinueStatement extends BaseNodeProps {
  type: 'ContinueStatement'
  label: null | Identifier
}

export interface DebuggerStatement extends BaseNodeProps {
  type: 'DebuggerStatement'
}

export interface DoWhileStatement extends BaseNodeProps {
  type: 'DoWhileStatement'
  body: Statement
  test: Expression
}

export interface ForStatement extends BaseNodeProps {
  type: 'ForStatement'
  init: VariableDeclaration | Expression | null
  test: Expression | null
  update: Expression | null
  body: Statement
}

export interface ForInStatement extends BaseNodeProps {
  type: 'ForInStatement'
  body: Statement
  left: VariableDeclaration | LVal
  right: Expression
}

export interface ForOfStatement extends BaseNodeProps {
  type: 'ForOfStatement'
  body: Statement
  left: VariableDeclaration | LVal
  right: Expression
  await: boolean
}

export interface IfStatement extends BaseNodeProps {
  type: 'IfStatement'
  test: Expression
  consequent: Statement
  alternate: Statement | null
}

export interface ReturnStatement extends BaseNodeProps {
  type: 'ReturnStatement'
  argument: Expression | null
}

export interface SwitchCase extends BaseNodeProps {
  type: 'SwitchCase'
  consequent: Statement[]
  test: Expression | null
}

export interface SwitchStatement extends BaseNodeProps {
  type: 'SwitchStatement'
  discriminant: Expression
  cases: SwitchCase[]
}

export interface ThrowStatement extends BaseNodeProps {
  type: 'ThrowStatement'
  argument: Expression
}

export interface TryStatement extends BaseNodeProps {
  type: 'TryStatement'
  block: BlockStatement
  handler: CatchClause | null
  finalizer: BlockStatement | null
}

export interface CatchClause extends BaseNodeProps {
  type: 'CatchClause'
  param: Identifier | ArrayPattern | ObjectPattern | null
  body: BlockStatement
}

export interface VariableDeclaration extends BaseNodeProps {
  type: 'VariableDeclaration'
  declarations: VariableDeclarator[]
  kind: 'var' | 'let' | 'const'
}

export interface VariableDeclarator extends BaseNodeProps {
  type: 'VariableDeclarator'
  id: LVal
  init: Expression | null
}

export interface WhileStatement extends BaseNodeProps {
  type: 'WhileStatement'
  test: Expression
  body: Statement
}

export interface WithStatement extends BaseNodeProps {
  type: 'WithStatement'
  object: Expression
  body: Statement
}

export interface EmptyStatement extends BaseNodeProps {
  type: 'EmptyStatement'
}

export interface LabeledStatement extends BaseNodeProps {
  type: 'LabeledStatement'
  body: Statement
  label: Identifier
}

export interface ExpressionStatement extends BaseNodeProps {
  type: 'ExpressionStatement'
  expression: Expression
}

export interface BlockStatement extends BaseNodeProps {
  type: 'BlockStatement'
  body: Statement[]
}

export interface FunctionDeclaration extends BaseNodeProps {
  type: 'FunctionDeclaration'
  id: Identifier | null
  generator?: boolean
  async: boolean
  params: Array<Identifier | Pattern | RestElement>
  expression: boolean
  body: BlockStatement
}

export interface FunctionExpression extends BaseNodeProps {
  type: 'FunctionExpression'
  id: Identifier | null
  generator?: boolean
  async: boolean
  params: Array<Identifier | Pattern | RestElement>
  expression: boolean
  body: BlockStatement
}

export interface ClassDeclaration extends BaseNodeProps {
  type: 'ClassDeclaration'
  id: Identifier | null
  superClass: Expression | null
  body: ClassBody
}

export interface ClassExpression extends BaseNodeProps {
  type: 'ClassExpression'
  id: Identifier | null
  superClass: Expression | null
  body: ClassBody
}

export interface ClassBody extends BaseNodeProps {
  type: 'ClassBody'
  body: Array<StaticBlock | Identifier | MethodDefinition | PropertyDefinition>
}

export interface MethodDefinition extends BaseNodeProps {
  type: 'MethodDefinition'
  static: boolean
  computed: boolean
  key: Identifier | Literal | Expression
  kind: 'get' | 'set' | 'method' | 'constructor'
  value: FunctionExpression | null
}

export interface PropertyDefinition extends BaseNodeProps {
  type: 'PropertyDefinition'
  static: boolean
  computed: boolean
  key: Identifier | Literal | Expression
  value: Expression | null
}

export interface StaticBlock extends BaseNodeProps {
  type: 'StaticBlock'
  body: Statement[]
}

export interface ExportAllDeclaration extends BaseNodeProps {
  type: 'ExportAllDeclaration'
  exported: Identifier | Literal | null
  source: Literal
}

export interface ExportDefaultDeclaration extends BaseNodeProps {
  type: 'ExportDefaultDeclaration'
  declaration: FunctionDeclaration | ClassDeclaration | Expression
}

export interface ExportNamedDeclaration extends BaseNodeProps {
  type: 'ExportNamedDeclaration'
  declaration: Declaration | null
  specifiers: ExportSpecifier[]
  source: Literal | null
}

export interface ExportSpecifier extends BaseNodeProps {
  type: 'ExportSpecifier'
  local: Identifier
  exported: Identifier | Literal
}

export interface ImportDeclaration extends BaseNodeProps {
  type: 'ImportDeclaration'
  specifiers: Array<
    ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier
  >
  source: Literal
}

export interface ImportDefaultSpecifier extends BaseNodeProps {
  type: 'ImportDefaultSpecifier'
  local: Identifier
}

export interface ImportNamespaceSpecifier extends BaseNodeProps {
  type: 'ImportNamespaceSpecifier'
  local: Identifier
}

export interface ImportSpecifier extends BaseNodeProps {
  type: 'ImportSpecifier'
  local: Identifier
  imported: Identifier
}

export interface SequenceExpression extends BaseNodeProps {
  type: 'SequenceExpression'
  expressions: Expression[]
}

export interface YieldExpression extends BaseNodeProps {
  type: 'YieldExpression'
  delegate: boolean
  argument: Expression | null
}

export interface AssignmentExpression extends BaseNodeProps {
  type: 'AssignmentExpression'
  operator: string
  left: LVal
  right: Expression
}

export interface ConditionalExpression extends BaseNodeProps {
  type: 'ConditionalExpression'
  test: Expression
  consequent: Expression
  alternate: Expression
}

export interface LogicalExpression extends BaseNodeProps {
  type: 'LogicalExpression'
  operator: '||' | '&&' | '??'
  left: Expression
  right: Expression
}

export interface BinaryExpression extends BaseNodeProps {
  type: 'BinaryExpression'
  operator:
    | '+'
    | '-'
    | '/'
    | '%'
    | '*'
    | '**'
    | '&'
    | '|'
    | '>>'
    | '>>>'
    | '<<'
    | '^'
    | '=='
    | '==='
    | '!='
    | '!=='
    | 'in'
    | 'instanceof'
    | '>'
    | '<'
    | '>='
    | '<='
    | '|>'
  left: Expression
  right: Expression
}

export interface UpdateExpression extends BaseNodeProps {
  type: 'UpdateExpression'
  operator: '++' | '--'
  argument: Expression
  prefix: boolean
}

export interface UnaryExpression extends BaseNodeProps {
  type: 'UnaryExpression'
  operator: 'void' | 'throw' | 'delete' | '!' | '+' | '-' | '~' | 'typeof'
  prefix: boolean
  argument: Expression
}

export interface ChainExpression extends BaseNodeProps {
  type: 'ChainExpression'
  expression: ArrowFunctionExpression
}

export interface MemberExpression extends BaseNodeProps {
  type: 'MemberExpression'
  object: Expression
  property: Expression | Identifier | PrivateIdentifier
  computed: boolean
  optional?: boolean
}

export interface CallExpression extends BaseNodeProps {
  type: 'CallExpression'
  callee: Expression
  arguments: Array<Expression | SpreadElement | null>
  optional?: boolean
}

export interface TaggedTemplateExpression extends BaseNodeProps {
  type: 'TaggedTemplateExpression'
  tag: Expression
  quasi: TemplateLiteral
}

export interface ThisExpression extends BaseNodeProps {
  type: 'ThisExpression'
}

export interface Super extends BaseNodeProps {
  type: 'Super'
}

export interface Literal extends BaseNodeProps {
  type: 'Literal'
  value: string
  raw: string
  bigint?: string
  regex?: {
    pattern: string
    flags: string
  }
}

export interface ParenthesizedExpression extends BaseNodeProps {
  type: 'ParenthesizedExpression'
  expression: Expression
}

export interface ArrayExpression extends BaseNodeProps {
  type: 'ArrayExpression'
  elements: Array<Expression | SpreadElement | null>
}

export interface Identifier extends BaseNodeProps {
  type: 'Identifier'
  name: string
}

export interface MetaProperty extends BaseNodeProps {
  type: 'MetaProperty'
  meta: Identifier
  property: Identifier
}

export interface ImportExpression extends BaseNodeProps {
  type: 'ImportExpression'
  source: Expression
}

export interface NewExpression extends BaseNodeProps {
  type: 'NewExpression'
  callee: Expression
  arguments: Array<Expression | SpreadElement | null>
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
  expressions: Expression[]
  quasis: TemplateElement[]
}

export interface ObjectExpression extends BaseNodeProps {
  type: 'ObjectExpression'
  properties: Array<Property | SpreadElement | RestElement>
}

export interface SpreadElement extends BaseNodeProps {
  type: 'SpreadElement'
  argument: Expression
}

export interface Property extends BaseNodeProps {
  type: 'Property'
  method: boolean
  shorthand: boolean
  key: Identifier | Literal | Expression
  computed?: boolean
  kind: string
  value: Expression
}

export interface PrivateIdentifier extends BaseNodeProps {
  type: 'PrivateIdentifier'
  name: string
}

export interface ObjectPattern extends BaseNodeProps {
  type: 'ObjectPattern'
  properties: Array<Property | SpreadElement | RestElement>
}

export interface ArrayPattern extends BaseNodeProps {
  type: 'ArrayPattern'
  elements: Array<PatternLike | LVal | null>
}

export interface RestElement extends BaseNodeProps {
  type: 'RestElement'
  argument: LVal
}

export interface AssignmentPattern extends BaseNodeProps {
  type: 'AssignmentPattern'
  left: Identifier | ObjectPattern | ArrayPattern | MemberExpression
  right: Expression
}

export interface ArrowFunctionExpression extends BaseNodeProps {
  type: 'ArrowFunctionExpression'
  async: boolean
  params: Array<Identifier | Pattern | RestElement>
  expression: boolean
  body: BlockStatement | Expression
  generator?: boolean
}

export interface AwaitExpression extends BaseNodeProps {
  type: 'AwaitExpression'
  argument: Expression
}
