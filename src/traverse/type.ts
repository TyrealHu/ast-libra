import type { AcornNodeTypeMap } from '../node'

type WalkFunc<T extends keyof AcornNodeTypeMap, TState> = (
    node: AcornNodeTypeMap[T],
    state: TState
) => any

export interface BaseWalk<TState> {
    Program: WalkFunc<'Program', TState>
    BreakStatement: WalkFunc<'BreakStatement', TState>
    ContinueStatement: WalkFunc<'ContinueStatement', TState>
    DebuggerStatement: WalkFunc<'DebuggerStatement', TState>
    DoWhileStatement: WalkFunc<'DoWhileStatement', TState>
    ForStatement: WalkFunc<'ForStatement', TState>
    ForInStatement: WalkFunc<'ForInStatement', TState>
    ForOfStatement: WalkFunc<'ForOfStatement', TState>
    IfStatement: WalkFunc<'IfStatement', TState>
    ReturnStatement: WalkFunc<'ReturnStatement', TState>
    ThrowStatement: WalkFunc<'ThrowStatement', TState>
    SwitchCase: WalkFunc<'SwitchCase', TState>
    SwitchStatement: WalkFunc<'SwitchStatement', TState>
    TryStatement: WalkFunc<'TryStatement', TState>
    CatchClause: WalkFunc<'CatchClause', TState>
    VariableDeclaration: WalkFunc<'VariableDeclaration', TState>
    VariableDeclarator: WalkFunc<'VariableDeclarator', TState>
    WhileStatement: WalkFunc<'WhileStatement', TState>
    WithStatement: WalkFunc<'WithStatement', TState>
    EmptyStatement: WalkFunc<'EmptyStatement', TState>
    LabeledStatement: WalkFunc<'LabeledStatement', TState>
    ExpressionStatement: WalkFunc<'ExpressionStatement', TState>
    BlockStatement: WalkFunc<'BlockStatement', TState>
    FunctionDeclaration: WalkFunc<'FunctionDeclaration', TState>
    FunctionExpression: WalkFunc<'FunctionExpression', TState>
    ClassDeclaration: WalkFunc<'ClassDeclaration', TState>
    ClassExpression: WalkFunc<'ClassExpression', TState>
    ClassBody: WalkFunc<'ClassBody', TState>
    MethodDefinition: WalkFunc<'MethodDefinition', TState>
    PropertyDefinition: WalkFunc<'PropertyDefinition', TState>
    StaticBlock: WalkFunc<'StaticBlock', TState>
    ExportAllDeclaration: WalkFunc<'ExportAllDeclaration', TState>
    ExportSpecifier: WalkFunc<'ExportSpecifier', TState>
    ExportNamedDeclaration: WalkFunc<'ExportNamedDeclaration', TState>
    ExportDefaultDeclaration: WalkFunc<'ExportDefaultDeclaration', TState>
    ImportDeclaration: WalkFunc<'ImportDeclaration', TState>
    ImportNamespaceSpecifier: WalkFunc<'ImportNamespaceSpecifier', TState>
    ImportDefaultSpecifier: WalkFunc<'ImportDefaultSpecifier', TState>
    ImportSpecifier: WalkFunc<'ImportSpecifier', TState>
    SequenceExpression: WalkFunc<'SequenceExpression', TState>
    YieldExpression: WalkFunc<'YieldExpression', TState>
    AssignmentExpression: WalkFunc<'AssignmentExpression', TState>
    ConditionalExpression: WalkFunc<'ConditionalExpression', TState>
    LogicalExpression: WalkFunc<'LogicalExpression', TState>
    BinaryExpression: WalkFunc<'BinaryExpression', TState>
    UpdateExpression: WalkFunc<'UpdateExpression', TState>
    UnaryExpression: WalkFunc<'UnaryExpression', TState>
    ChainExpression: WalkFunc<'ChainExpression', TState>
    MemberExpression: WalkFunc<'MemberExpression', TState>
    CallExpression: WalkFunc<'CallExpression', TState>
    TaggedTemplateExpression: WalkFunc<'TaggedTemplateExpression', TState>
    ThisExpression: WalkFunc<'ThisExpression', TState>
    Super: WalkFunc<'Super', TState>
    Literal: WalkFunc<'Literal', TState>
    ParenthesizedExpression: WalkFunc<'ParenthesizedExpression', TState>
    ArrayExpression: WalkFunc<'ArrayExpression', TState>
    Identifier: WalkFunc<'Identifier', TState>
    MetaProperty: WalkFunc<'MetaProperty', TState>
    ImportExpression: WalkFunc<'ImportExpression', TState>
    NewExpression: WalkFunc<'NewExpression', TState>
    TemplateElement: WalkFunc<'TemplateElement', TState>
    TemplateLiteral: WalkFunc<'TemplateLiteral', TState>
    ObjectExpression: WalkFunc<'ObjectExpression', TState>
    SpreadElement: WalkFunc<'SpreadElement', TState>
    Property: WalkFunc<'Property', TState>
    PrivateIdentifier: WalkFunc<'PrivateIdentifier', TState>
    ObjectPattern: WalkFunc<'ObjectPattern', TState>
    ArrayPattern: WalkFunc<'ArrayPattern', TState>
    RestElement: WalkFunc<'RestElement', TState>
    AssignmentPattern: WalkFunc<'AssignmentPattern', TState>
    ArrowFunctionExpression: WalkFunc<'ArrowFunctionExpression', TState>
    AwaitExpression: WalkFunc<'AwaitExpression', TState>
}

export type TraverseWalk<State> = Partial<BaseWalk<State>>
