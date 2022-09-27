import type {
    AcornNodeType,
    ArrayExpression,
    ArrayPattern,
    ArrowFunctionExpression,
    AssignmentExpression,
    AssignmentPattern,
    AwaitExpression,
    BinaryExpression,
    BlockStatement,
    BreakStatement,
    CallExpression,
    CatchClause,
    ChainExpression,
    ClassBody,
    ClassDeclaration,
    ClassExpression,
    ConditionalExpression,
    ContinueStatement,
    DebuggerStatement,
    DoWhileStatement,
    ExportAllDeclaration,
    ExportDefaultDeclaration,
    ExportNamedDeclaration,
    Expression,
    ExpressionStatement,
    ForInStatement,
    ForOfStatement,
    ForStatement,
    FunctionDeclaration,
    FunctionExpression,
    Identifier,
    IfStatement,
    ImportDeclaration,
    ImportDefaultSpecifier,
    ImportExpression,
    ImportNamespaceSpecifier,
    ImportSpecifier,
    LabeledStatement,
    Literal,
    LogicalExpression,
    MemberExpression,
    MetaProperty,
    MethodDefinition,
    NewExpression,
    ObjectExpression,
    ObjectPattern,
    ParenthesizedExpression,
    PrivateIdentifier,
    Program,
    Property,
    PropertyDefinition,
    RestElement,
    ReturnStatement,
    SequenceExpression,
    SpreadElement,
    Statement,
    StaticBlock,
    Super,
    SwitchCase,
    SwitchStatement,
    TaggedTemplateExpression,
    TemplateElement,
    TemplateLiteral,
    ThisExpression,
    ThrowStatement,
    TryStatement,
    UnaryExpression,
    UpdateExpression,
    VariableDeclaration,
    VariableDeclarator,
    WhileStatement,
    WithStatement,
    YieldExpression
} from '../node/type'
import type { TraverseWalk } from '../traverse/type'

export default class Walk<State> {
    private userWalk: TraverseWalk<State>
    private state: State | undefined

    constructor(userWalk: TraverseWalk<State>, state?: State) {
        this.userWalk = userWalk
        this.state = state
    }

    Program<TState>(node: Program, state: TState, runFuc: any) {
        this.userWalk['Program'] && this.userWalk['Program'](node, this.state)

        for (let stmt of node.body) {
            runFuc(stmt, state, 'Statement')
        }
    }

    BlockStatement<TState>(node: BlockStatement, state: TState, runFuc: any) {
        for (let stmt of node.body) runFuc(stmt, state, 'Statement')
    }

    StaticBlock<TState>(node: StaticBlock, state: TState, runFnc: any) {
        for (let stmt of node.body) runFnc(stmt, state, 'Statement')
    }

    Statement<State>(node: Statement, state: State, runFnc: any) {
        runFnc(node, state)
    }

    EmptyStatement<State>(_node: Statement, _state: State, _runFnc: any) {}

    ExpressionStatement<State>(node: ExpressionStatement, state: State, runFnc: any) {
        runFnc(node.expression, state, 'Expression')
    }

    ParenthesizedExpression<State>(node: ParenthesizedExpression, state: State, runFnc: any) {
        runFnc(node.expression, state, 'Expression')
    }

    ChainExpression<State>(node: ChainExpression, state: State, runFnc: any) {
        runFnc(node.expression, state, 'Expression')
    }

    IfStatement<State>(node: IfStatement, state: State, runFnc: any) {
        runFnc(node.test, state, 'Expression')
        runFnc(node.consequent, state, 'Statement')
        if (node.alternate) {
            runFnc(node.alternate, state, 'Statement')
        }
    }

    LabeledStatement<State>(node: LabeledStatement, state: State, runFnc: any) {
        runFnc(node.body, state, 'LabeledStatement')
    }

    BreakStatement<State>(_node: BreakStatement, _state: State, _runFnc: any) {}

    ContinueStatement<State>(_node: ContinueStatement, _state: State, _runFnc: any) {}

    WithStatement<State>(node: WithStatement, state: State, runFnc: any) {
        runFnc(node.object, state, 'Expression')
        runFnc(node.body, state, 'Statement')
    }

    SwitchStatement<State>(node: SwitchStatement, state: State, runFnc: any) {
        runFnc(node.discriminant, state, 'Expression')
        for (let cs of node.cases) {
            if (cs.test) runFnc(cs.test, state, 'Expression')
            for (let cons of cs.consequent) runFnc(cons, state, 'Statement')
        }
    }

    SwitchCase<State>(node: SwitchCase, state: State, runFnc: any) {
        if (node.test) runFnc(node.test, state, 'Expression')
        for (let cons of node.consequent) runFnc(cons, state, 'Statement')
    }

    AwaitExpression<State>(node: AwaitExpression, state: State, runFnc: any) {
        if (node.argument) runFnc(node.argument, state, 'Expression')
    }

    ReturnStatement<State>(node: ReturnStatement, state: State, runFnc: any) {
        if (node.argument) runFnc(node.argument, state, 'Expression')
    }

    YieldExpression<State>(node: YieldExpression, state: State, runFnc: any) {
        if (node.argument) runFnc(node.argument, state, 'Expression')
    }

    ThrowStatement<State>(node: ThrowStatement, state: State, runFnc: any) {
        if (node.argument) runFnc(node.argument, state, 'Expression')
    }

    SpreadElement<State>(node: SpreadElement, state: State, runFnc: any) {
        if (node.argument) runFnc(node.argument, state, 'Expression')
    }

    TryStatement<State>(node: TryStatement, state: State, runFnc: any) {
        runFnc(node.block, state, 'Statement')
        if (node.handler) runFnc(node.handler, state)
        if (node.finalizer) runFnc(node.finalizer, state, 'Statement')
    }

    CatchClause<State>(node: CatchClause, state: State, runFnc: any) {
        if (node.param) runFnc(node.param, state, 'Pattern')
        runFnc(node.body, state, 'Statement')
    }

    DoWhileStatement<State>(node: DoWhileStatement, state: State, runFnc: any) {
        runFnc(node.test, state, 'Expression')
        runFnc(node.body, state, 'Statement')
    }

    WhileStatement<State>(node: WhileStatement, state: State, runFnc: any) {
        runFnc(node.test, state, 'Expression')
        runFnc(node.body, state, 'Statement')
    }

    ForStatement<State>(node: ForStatement, state: State, runFnc: any) {
        if (node.init) runFnc(node.init, state, 'ForInit')
        if (node.test) runFnc(node.test, state, 'Expression')
        if (node.update) runFnc(node.update, state, 'Expression')
        runFnc(node.body, state, 'Statement')
    }

    ForInStatement<State>(node: ForInStatement, state: State, runFnc: any) {
        runFnc(node.left, state, 'ForInit')
        runFnc(node.right, state, 'Expression')
        runFnc(node.body, state, 'Statement')
    }

    ForOfStatement<State>(node: ForOfStatement, state: State, runFnc: any) {
        runFnc(node.left, state, 'ForInit')
        runFnc(node.right, state, 'Expression')
        runFnc(node.body, state, 'Statement')
    }

    ForInit<State>(node: Expression | VariableDeclaration, state: State, runFnc: any) {
        if (node.type === 'VariableDeclaration') runFnc(node, state)
        else runFnc(node, state, 'Expression')
    }

    DebuggerStatement<State>(_node: DebuggerStatement, _state: State, _runFnc: any) {}

    FunctionDeclaration<State>(node: FunctionDeclaration, state: State, runFnc: any) {
        runFnc(node, state, 'Function')
    }

    VariableDeclaration<State>(node: VariableDeclaration, state: State, runFnc: any) {
        for (let decl of node.declarations) runFnc(decl, state)
    }

    VariableDeclarator<State>(node: VariableDeclarator, state: State, runFnc: any) {
        runFnc(node.id, state, 'Pattern')
        if (node.init) runFnc(node.init, state, 'Expression')
    }

    Function<State>(
        node: FunctionExpression | FunctionDeclaration | ArrowFunctionExpression,
        state: State,
        runFnc: any
    ) {
        // @ts-ignore
        if (node.id) runFnc(node.id, state, 'Pattern')
        for (let param of node.params) runFnc(param, state, 'Pattern')
        runFnc(node.body, state, node.expression ? 'Expression' : 'Statement')
    }

    Pattern<State>(node: AcornNodeType, state: State, runFnc: any) {
        if (node.type === 'Identifier') runFnc(node, state, 'VariablePattern')
        else if (node.type === 'MemberExpression') runFnc(node, state, 'MemberPattern')
        else runFnc(node, state)
    }

    VariablePattern<State>(_node: AcornNodeType, _state: State, _runFnc: any) {}

    MemberPattern<State>(node: AcornNodeType, state: State, runFnc: any) {
        runFnc(node, state)
    }

    RestElement<State>(node: RestElement, state: State, runFnc: any) {
        runFnc(node.argument, state, 'Pattern')
    }

    ArrayPattern<State>(node: ArrayPattern, state: State, runFnc: any) {
        for (let elt of node.elements) {
            if (elt) runFnc(elt, state, 'Pattern')
        }
    }

    ObjectPattern<State>(node: ObjectPattern, state: State, runFnc: any) {
        for (let prop of node.properties) {
            if (prop.type === 'Property') {
                if (prop.computed) runFnc(prop.key, state, 'Expression')
                runFnc(prop.value, state, 'Pattern')
            } else if (prop.type === 'RestElement') {
                runFnc(prop.argument, state, 'Pattern')
            }
        }
    }

    Expression<State>(node: Expression, state: State, runFnc: any) {
        runFnc(node, state)
    }

    ThisExpression<State>(_node: ThisExpression, _state: State, _runFnc: any) {}

    Super<State>(_node: Super, _state: State, _runFnc: any) {}

    MetaProperty<State>(_node: MetaProperty, _state: State, _runFnc: any) {}

    ArrayExpression<State>(node: ArrayExpression, state: State, runFnc: any) {
        for (let elt of node.elements) {
            if (elt) runFnc(elt, state, 'Expression')
        }
    }

    ObjectExpression<State>(node: ObjectExpression, state: State, runFnc: any) {
        for (let prop of node.properties) runFnc(prop, state)
    }

    FunctionExpression<State>(node: FunctionExpression, state: State, runFnc: any) {
        runFnc(node, state, 'Function')
    }

    ArrowFunctionExpression<State>(node: ArrowFunctionExpression, state: State, runFnc: any) {
        runFnc(node, state, 'Function')
    }

    SequenceExpression<State>(node: SequenceExpression, state: State, runFnc: any) {
        for (let expr of node.expressions) runFnc(expr, state, 'Expression')
    }

    TemplateLiteral<State>(node: TemplateLiteral, state: State, runFnc: any) {
        for (let quasi of node.quasis) runFnc(quasi, state)

        for (let expr of node.expressions) runFnc(expr, state, 'Expression')
    }

    TemplateElement<State>(_node: TemplateElement, _state: State, _runFnc: any) {}

    UpdateExpression<State>(node: UpdateExpression, state: State, runFnc: any) {
        runFnc(node.argument, state, 'Expression')
    }

    UnaryExpression<State>(node: UnaryExpression, state: State, runFnc: any) {
        runFnc(node.argument, state, 'Expression')
    }

    BinaryExpression<State>(node: BinaryExpression, state: State, runFnc: any) {
        runFnc(node.left, state, 'Expression')
        runFnc(node.right, state, 'Expression')
    }

    LogicalExpression<State>(node: LogicalExpression, state: State, runFnc: any) {
        runFnc(node.left, state, 'Expression')
        runFnc(node.right, state, 'Expression')
    }

    AssignmentExpression<State>(node: AssignmentExpression, state: State, runFnc: any) {
        runFnc(node.left, state, 'Pattern')
        runFnc(node.right, state, 'Expression')
    }

    AssignmentPattern<State>(node: AssignmentPattern, state: State, runFnc: any) {
        runFnc(node.left, state, 'Pattern')
        runFnc(node.right, state, 'Expression')
    }

    ConditionalExpression<State>(node: ConditionalExpression, state: State, runFnc: any) {
        runFnc(node.test, state, 'Expression')
        runFnc(node.consequent, state, 'Expression')
        runFnc(node.alternate, state, 'Expression')
    }

    NewExpression<State>(node: NewExpression, state: State, runFnc: any) {
        runFnc(node.callee, state, 'Expression')
        if (node.arguments) for (let arg of node.arguments) runFnc(arg, state, 'Expression')
    }

    CallExpression<State>(node: CallExpression, state: State, runFnc: any) {
        runFnc(node.callee, state, 'Expression')
        if (node.arguments) for (let arg of node.arguments) runFnc(arg, state, 'Expression')
    }

    MemberExpression<State>(node: MemberExpression, state: State, runFnc: any) {
        runFnc(node.object, state, 'Expression')
        if (node.computed) runFnc(node.property, state, 'Expression')
    }

    ExportNamedDeclaration<State>(node: ExportNamedDeclaration, state: State, runFnc: any) {
        if (node.declaration)
            runFnc(
                node.declaration,
                state,
                // @ts-ignore
                node.type === 'ExportNamedDeclaration' || node.declaration.id
                    ? 'Statement'
                    : 'Expression'
            )
        if (node.source) runFnc(node.source, state, 'Expression')
    }

    ExportDefaultDeclaration<State>(node: ExportDefaultDeclaration, state: State, runFnc: any) {
        if (node.declaration)
            runFnc(
                node.declaration,
                state,
                // @ts-ignore
                node.type === 'ExportNamedDeclaration' || node.declaration.id
                    ? 'Statement'
                    : 'Expression'
            )
        // @ts-ignore
        if (node.source) runFnc(node.source, state, 'Expression')
    }

    ExportAllDeclaration<State>(node: ExportAllDeclaration, state: State, runFnc: any) {
        if (node.exported) runFnc(node.exported, state)
        runFnc(node.source, state, 'Expression')
    }

    ImportDeclaration<State>(node: ImportDeclaration, state: State, runFnc: any) {
        for (let spec of node.specifiers) runFnc(spec, state)
        runFnc(node.source, state, 'Expression')
    }

    ImportExpression<State>(node: ImportExpression, state: State, runFnc: any) {
        runFnc(node.source, state, 'Expression')
    }

    ImportSpecifier<State>(_node: ImportSpecifier, _state: State, _runFnc: any) {}

    ImportDefaultSpecifier<State>(_node: ImportDefaultSpecifier, _state: State, _runFnc: any) {}

    ImportNamespaceSpecifier<State>(_node: ImportNamespaceSpecifier, _state: State, _runFnc: any) {}

    Identifier<State>(_node: Identifier, _state: State, _runFnc: any) {}

    PrivateIdentifier<State>(_node: PrivateIdentifier, _state: State, _runFnc: any) {}

    Literal<State>(_node: Literal, _state: State, _runFnc: any) {}

    TaggedTemplateExpression<State>(node: TaggedTemplateExpression, state: State, runFnc: any) {
        runFnc(node.tag, state, 'Expression')
        runFnc(node.quasi, state, 'Expression')
    }

    ClassDeclaration<State>(node: ClassDeclaration, state: State, runFnc: any) {
        runFnc(node, state, 'Class')
    }

    ClassExpression<State>(node: ClassExpression, state: State, runFnc: any) {
        runFnc(node, state, 'Class')
    }

    Class<State>(node: ClassExpression | ClassDeclaration, state: State, runFnc: any) {
        if (node.id) runFnc(node.id, state, 'Pattern')
        if (node.superClass) runFnc(node.superClass, state, 'Expression')
        runFnc(node.body, state)
    }

    ClassBody<State>(node: ClassBody, state: State, runFnc: any) {
        for (let elt of node.body) runFnc(elt, state)
    }

    MethodDefinition<State>(node: MethodDefinition, state: State, runFnc: any) {
        if (node.computed) runFnc(node.key, state, 'Expression')
        if (node.value) runFnc(node.value, state, 'Expression')
    }

    PropertyDefinition<State>(node: PropertyDefinition, state: State, runFnc: any) {
        if (node.computed) runFnc(node.key, state, 'Expression')
        if (node.value) runFnc(node.value, state, 'Expression')
    }

    Property<State>(node: Property, state: State, runFnc: any) {
        if (node.computed) runFnc(node.key, state, 'Expression')
        if (node.value) runFnc(node.value, state, 'Expression')
    }
}
