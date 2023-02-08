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
  ClassMethod: ClassMethod,
  ClassPrivateMethod: ClassPrivateMethod
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

interface BodilessFunctionOrMethodBase extends HasDecorators {
  id: Identifier | null | undefined
  generator?: boolean
  async: boolean
  params: Array<Identifier | Pattern | RestElement>
  expression: boolean
}

interface FunctionBase extends BodilessFunctionOrMethodBase {
  body: BlockStatement
}

export type MethodKind = 'constructor' | 'method' | 'get' | 'set';

interface MethodBase {
  static: boolean
  computed: boolean
  key: Identifier | Literal | Expression | PrivateIdentifier
  kind: MethodKind
  value: FunctionExpression | null
  decorators?: Decorator[];
}

export interface TypeAnnotationBase extends BaseNodeProps {
  typeAnnotation: Node;
}

interface ClassMemberBase extends BaseNodeProps, HasDecorators {
  static: boolean;
  computed: boolean;
  // ts
  accessibility?: Accessibility | null;
  override?: true | null;
  abstract?: true | null;
  optional?: true | null;
}

export interface FunctionDeclaration extends FunctionBase, BaseNodeProps {
  type: 'FunctionDeclaration'
}

export interface FunctionExpression extends FunctionBase, BaseNodeProps {
  type: 'FunctionExpression'
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

export interface MethodDefinition extends MethodBase, BaseNodeProps {
  type: 'MethodDefinition'
}

export interface PropertyDefinition extends ClassMemberBase, DeclarationBase {
  type: 'PropertyDefinition'
  static: boolean
  computed: boolean
  key: Identifier | Literal | Expression
  value: Expression | null

  // TypeScript only: (TODO: Not in spec)
  typeAnnotation?: TypeAnnotationBase | null;
  // TypeScript only
  optional?: true;
  definite?: true;
  readonly?: true;
  override?: true;
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
  specifiers: Array<ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier>
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

export interface ArrowFunctionExpression extends BodilessFunctionOrMethodBase, BaseNodeProps {
  type: 'ArrowFunctionExpression'
  body: BlockStatement | Expression
}

export interface AwaitExpression extends BaseNodeProps {
  type: 'AwaitExpression'
  argument: Expression
}

export interface ClassMethod extends BaseNodeProps, MethodBase {
  type: 'ClassMethod';
}

export interface ClassPrivateMethod extends BaseNodeProps, MethodBase {
  type: 'ClassPrivateMethod';
  key: PrivateIdentifier,
  computed: false;
}

export interface Decorator extends BaseNodeProps {
  type: 'Decorator';
  expression: Expression;
  arguments?: Array<Expression | SpreadElement>;
}

export type Accessibility = 'public' | 'protected' | 'private';

export interface Node extends BaseNodeProps {
  type: string;

  [key: string]: any;
}

export interface HasDecorators extends BaseNodeProps {
  decorators?: Decorator[];
}

export interface DeclarationBase extends BaseNodeProps {
  // TypeScript allows declarations to be prefixed by `declare`.
  declare?: true;
}

export interface TsTypeAnnotation extends BaseNodeProps {
  type: 'TSTypeAnnotation';
  typeAnnotation: TsType;
}

export interface TypeParameterDeclarationBase extends BaseNodeProps {
  params: Array<TsTypeParameter>;
}

export interface TsTypeParameterDeclaration
  extends TypeParameterDeclarationBase {
  type: 'TSTypeParameterDeclaration';
  params: TsTypeParameter[];
}

export interface TsTypeParameter extends BaseNodeProps {
  type: 'TSTypeParameter';
  // TODO(Babel-8): remove string type support
  name: string | Identifier;
  in?: boolean;
  out?: boolean;
  constraint?: TsType;
  default?: TsType;
}

export interface TypeParameterInstantiationBase extends BaseNodeProps {
  params: Node[];
}


export interface TsTypeParameterInstantiation extends TypeParameterInstantiationBase {
  type: 'TSTypeParameterInstantiation';
  params: TsType[];
}

export interface TSParameterProperty extends HasDecorators {
  // Note: This has decorators instead of its parameter.
  type: 'TSParameterProperty';
  // At least one of `accessibility` or `readonly` must be set.
  accessibility?: Accessibility | null;
  readonly?: true | null;
  override?: true | null;
  parameter: Identifier | AssignmentPattern;
}

export interface OptTSDeclareFunction extends FunctionBase, DeclarationBase {
  type: 'TSDeclareFunction';
}

export interface TSDeclareFunction extends OptTSDeclareFunction {
  id: Identifier;
}

export interface TSDeclareMethod extends FunctionBase, MethodBase {
  type: 'TSDeclareMethod';
  kind: MethodKind;
}

export interface TsQualifiedName extends BaseNodeProps {
  type: 'TSQualifiedName';
  left: TsEntityName;
  right: Identifier;
}

export type TsEntityName = Identifier | TsQualifiedName;

export type TsSignatureDeclaration =
  | TsCallSignatureDeclaration
  | TsConstructSignatureDeclaration
  | TsMethodSignature
  | TsFunctionType
  | TsConstructorType;

export interface TsSignatureDeclarationOrIndexSignatureBase extends BaseNodeProps {
  // Not using TypeScript's "ParameterDeclaration" here, since it's inconsistent with regular functions.
  params: Array<Identifier | RestElement | ObjectPattern | ArrayPattern>;
  returnType: TsTypeAnnotation | undefined | null;
  // TODO(Babel-8): Remove
  parameters: Array<Identifier | RestElement | ObjectPattern | ArrayPattern>;
  typeAnnotation: TsTypeAnnotation | undefined | null;
}

export interface TsSignatureDeclarationBase
  extends TsSignatureDeclarationOrIndexSignatureBase {
  typeParameters: TsTypeParameterDeclaration | undefined | null;
}

// ================
// TypeScript type members (for type literal / interface / class)
// ================

export type TsTypeElement =
  | TsCallSignatureDeclaration
  | TsConstructSignatureDeclaration
  | TsPropertySignature
  | TsMethodSignature
  | TsIndexSignature;

export interface TsCallSignatureDeclaration extends TsSignatureDeclarationBase {
  type: 'TSCallSignatureDeclaration';
}

export interface TsConstructSignatureDeclaration
  extends TsSignatureDeclarationBase {
  type: 'TSConstructSignatureDeclaration';
}

export interface TsNamedTypeElementBase extends BaseNodeProps {
  // Not using TypeScript's `PropertyName` here since we don't have a `ComputedPropertyName` node type.
  // This is usually an Identifier but may be e.g. `Symbol.iterator` if `computed` is true.
  key: Expression;
  computed: boolean;
  optional?: true;
}

export interface TsPropertySignature extends TsNamedTypeElementBase {
  type: 'TSPropertySignature';
  readonly?: true;
  typeAnnotation?: TsTypeAnnotation;
  initializer?: Expression;
}

export interface TsMethodSignature
  extends TsSignatureDeclarationBase,
    TsNamedTypeElementBase {
  type: 'TSMethodSignature';
  kind: 'method' | 'get' | 'set';
}

// *Not* a ClassMemberBase: Can't have accessibility, can't be abstract, can't be optional.
export interface TsIndexSignature
  extends TsSignatureDeclarationOrIndexSignatureBase {
  readonly?: true;
  static?: true;
  type: 'TSIndexSignature';
  // Note: parameters.length must be 1.
}

// ================
// TypeScript types
// ================

export type TsType =
  | TsKeywordType
  | TsThisType
  | TsFunctionOrConstructorType
  | TsTypeReference
  | TsTypeQuery
  | TsTypeLiteral
  | TsArrayType
  | TsTupleType
  | TsOptionalType
  | TsRestType
  | TsUnionOrIntersectionType
  | TsConditionalType
  | TsInferType
  | TsParenthesizedType
  | TsTypeOperator
  | TsIndexedAccessType
  | TsMappedType
  | TsLiteralType // TODO: This probably shouldn't be included here.
  | TsImportType
  | TsTypePredicate;

export type TsTypeBase = BaseNodeProps;

export type TsKeywordTypeType =
  | 'TSAnyKeyword'
  | 'TSUnknownKeyword'
  | 'TSNumberKeyword'
  | 'TSObjectKeyword'
  | 'TSBooleanKeyword'
  | 'TSBigIntKeyword'
  | 'TSStringKeyword'
  | 'TSSymbolKeyword'
  | 'TSVoidKeyword'
  | 'TSUndefinedKeyword'
  | 'TSNullKeyword'
  | 'TSNeverKeyword'
  | 'TSIntrinsicKeyword';

export interface TsKeywordType extends TsTypeBase {
  type: TsKeywordTypeType;
}

export interface TsThisType extends TsTypeBase {
  type: 'TSThisType';
}

export type TsFunctionOrConstructorType = TsFunctionType | TsConstructorType;

export interface TsFunctionType extends TsTypeBase, TsSignatureDeclarationBase {
  type: 'TSFunctionType';
  typeAnnotation: TsTypeAnnotation; // not optional
}

export interface TsConstructorType
  extends TsTypeBase,
    TsSignatureDeclarationBase {
  type: 'TSConstructorType';
  typeAnnotation: TsTypeAnnotation;
  abstract: boolean;
}

export interface TsTypeReference extends TsTypeBase {
  type: 'TSTypeReference';
  typeName: TsEntityName;
  typeParameters?: TsTypeParameterInstantiation;
}

export interface TsTypePredicate extends TsTypeBase {
  type: 'TSTypePredicate';
  parameterName: Identifier | TsThisType;
  typeAnnotation: TsTypeAnnotation | null;
  asserts: boolean;
}

// `typeof` operator
export interface TsTypeQuery extends TsTypeBase {
  type: 'TSTypeQuery';
  exprName: TsEntityName | TsImportType;
  typeParameters?: TsTypeParameterInstantiation;
}

export interface TsTypeLiteral extends TsTypeBase {
  type: 'TSTypeLiteral';
  members: TsTypeElement[];
}

export interface TsArrayType extends TsTypeBase {
  type: 'TSArrayType';
  elementType: TsType;
}

export interface TsTupleType extends TsTypeBase {
  type: 'TSTupleType';
  elementTypes: Array<TsType | TsNamedTupleMember>;
}

export interface TsNamedTupleMember extends TsTypeBase {
  type: 'TSNamedTupleMember';
  label: Identifier;
  optional: boolean;
  elementType: TsType;
}

export interface TsOptionalType extends TsTypeBase {
  type: 'TSOptionalType';
  typeAnnotation: TsType;
}

export interface TsRestType extends TsTypeBase {
  type: 'TSRestType';
  typeAnnotation: TsType | TsNamedTupleMember;
}

export type TsUnionOrIntersectionType = TsUnionType | TsIntersectionType;

export interface TsUnionOrIntersectionTypeBase extends TsTypeBase {
  types: TsType[];
}

export interface TsUnionType extends TsUnionOrIntersectionTypeBase {
  type: 'TSUnionType';
}

export interface TsIntersectionType extends TsUnionOrIntersectionTypeBase {
  type: 'TSIntersectionType';
}

export interface TsConditionalType extends TsTypeBase {
  type: 'TSConditionalType';
  checkType: TsType;
  extendsType: TsType;
  trueType: TsType;
  falseType: TsType;
}

export interface TsInferType extends TsTypeBase {
  type: 'TSInferType';
  typeParameter: TsTypeParameter;
}

export interface TsParenthesizedType extends TsTypeBase {
  type: 'TSParenthesizedType';
  typeAnnotation: TsType;
}

export interface TsTypeOperator extends TsTypeBase {
  type: 'TSTypeOperator';
  operator: 'keyof' | 'unique' | 'readonly';
  typeAnnotation: TsType;
}

export interface TsIndexedAccessType extends TsTypeBase {
  type: 'TSIndexedAccessType';
  objectType: TsType;
  indexType: TsType;
}

export interface TsMappedType extends TsTypeBase {
  type: 'TSMappedType';
  readonly?: true | '+' | '-';
  typeParameter: TsTypeParameter;
  optional?: true | '+' | '-';
  typeAnnotation: TsType | undefined | null;
  nameType: TsType | undefined | null;
}

export interface TsLiteralType extends TsTypeBase {
  type: 'TSLiteralType';
  literal: Literal | TemplateLiteral;
}

export interface TsImportType extends TsTypeBase {
  type: 'TSImportType';
  argument: Literal;
  qualifier?: TsEntityName;
  typeParameters?: TsTypeParameterInstantiation;
}

// ================
// TypeScript declarations
// ================

export interface TsInterfaceDeclaration extends DeclarationBase {
  type: 'TSInterfaceDeclaration';
  id: Identifier | undefined | null;
  typeParameters: TsTypeParameterDeclaration | undefined | null;
  // TS uses "heritageClauses", but want this to resemble ClassBase.
  extends?: TsExpressionWithTypeArguments[];
  body: TSInterfaceBody;
}

export interface TSInterfaceBody extends BaseNodeProps {
  type: 'TSInterfaceBody';
  body: TsTypeElement[];
}

export interface TsExpressionWithTypeArguments extends TsTypeBase {
  type: 'TSExpressionWithTypeArguments';
  expression: TsEntityName;
  typeParameters?: TsTypeParameterInstantiation;
}

export interface TsTypeAliasDeclaration extends DeclarationBase {
  type: 'TSTypeAliasDeclaration';
  id: Identifier;
  typeParameters: TsTypeParameterDeclaration | undefined | null;
  typeAnnotation: TsType;
}

export interface TsEnumDeclaration extends DeclarationBase {
  type: 'TSEnumDeclaration';
  const?: true;
  id: Identifier;
  members: TsEnumMember[];
}

export interface TsEnumMember extends BaseNodeProps {
  type: 'TSEnumMember';
  id: Identifier | Literal;
  initializer?: Expression;
}

export interface TsModuleDeclaration extends DeclarationBase {
  type: 'TSModuleDeclaration';
  global?: true; // In TypeScript, this is only available through `node.flags`.,
  id: TsModuleName;
  body: TsNamespaceBody;
}

// `namespace A.B { }` is a namespace named `A` with another TsNamespaceDeclaration as its body.
export type TsNamespaceBody = TsModuleBlock | TsNamespaceDeclaration;

export interface TsModuleBlock extends BaseNodeProps {
  type: 'TSModuleBlock';
  body: Statement[];
}

export interface TsNamespaceDeclaration extends TsModuleDeclaration {
  id: Identifier;
  body: TsNamespaceBody;
}

export type TsModuleName = Identifier | Literal;

export interface TsImportEqualsDeclaration extends BaseNodeProps {
  type: 'TSImportEqualsDeclaration';
  isExport: boolean;
  id: Identifier;
  importKind: 'type' | 'value';
  moduleReference: TsModuleReference;
}

export type TsModuleReference = TsEntityName | TsExternalModuleReference;

export interface TsExternalModuleReference extends BaseNodeProps {
  type: 'TSExternalModuleReference';
  expression: Literal;
}

// TypeScript's own parser uses ExportAssignment for both `export default` and `export =`.
// But for @babel/parser, `export default` is an ExportDefaultDeclaration,
// so a TsExportAssignment is always `export =`.
export interface TsExportAssignment extends BaseNodeProps {
  type: 'TSExportAssignment';
  expression: Expression;
}

export interface TsNamespaceExportDeclaration extends BaseNodeProps {
  type: 'TSNamespaceExportDeclaration';
  id: Identifier;
}

// ================
// TypeScript expressions
// ================

export interface TsTypeAssertionLikeBase extends BaseNodeProps {
  expression: Expression;
  typeAnnotation: TsType;
}

export interface TsAsExpression extends TsTypeAssertionLikeBase {
  type: 'TSAsExpression';
}

export interface TsTypeAssertion extends TsTypeAssertionLikeBase {
  type: 'TSTypeAssertion';
}

export interface TsNonNullExpression extends BaseNodeProps {
  type: 'TSNonNullExpression';
  expression: Expression;
}

export interface TsInstantiationExpression extends BaseNodeProps {
  type: 'TSInstantiationExpression';
  expression: Expression;
  typeParameters: TsTypeParameterInstantiation;
}
