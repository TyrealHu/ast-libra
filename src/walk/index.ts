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
import NodeManager from '../node'
import { LVal } from '../node/type'

export default class Walk<State> {
    private userWalk: TraverseWalk<State>
    private state: State | undefined

    constructor(userWalk: TraverseWalk<State>, state?: State) {
        this.userWalk = userWalk
        this.state = state
    }

    runByType(newNode: AcornNodeType, state: State) {
        const type = newNode.type
        // @ts-ignore
        this[type](newNode, state)
    }

    Program(node: Program, state: State) {
        const nodeManager = new NodeManager<Program>(node)
        this.userWalk['Program'] &&
            this.userWalk['Program'](nodeManager, this.state)

        const newNode = nodeManager.getNewNode()
        if (newNode) {
            this.runByType(newNode, state)
            return
        }

        for (let stmt of node.body) {
            this.Statement(stmt, state)
        }
    }

    BlockStatement(node: BlockStatement, state: State) {
        for (let stmt of node.body) {
            this.Statement(stmt, state)
        }
    }

    StaticBlock(node: StaticBlock, state: State) {
        for (let stmt of node.body) {
            this.Statement(stmt, state)
        }
    }

    Statement(node: AcornNodeType, state: State) {
        this.runByType(node, state)
    }

    EmptyStatement(_node: Statement, _state: State) {}

    ExpressionStatement(node: ExpressionStatement, state: State) {
        this.Expression(node.expression, state)
    }

    ParenthesizedExpression(node: ParenthesizedExpression, state: State) {
        this.Expression(node.expression, state)
    }

    ChainExpression(node: ChainExpression, state: State) {
        this.Expression(node.expression, state)
    }

    IfStatement(node: IfStatement, state: State) {
        this.Expression(node.test, state)
        this.Statement(node.consequent, state)
        if (node.alternate) {
            this.Statement(node.alternate, state)
        }
    }

    LabeledStatement(node: LabeledStatement, state: State) {
        this.Statement(node.body, state)
    }

    BreakStatement(_node: BreakStatement, _state: State) {}

    ContinueStatement(_node: ContinueStatement, _state: State) {}

    WithStatement(node: WithStatement, state: State) {
        this.Expression(node.object, state)
        this.Statement(node.body, state)
    }

    SwitchStatement(node: SwitchStatement, state: State) {
        this.Expression(node.discriminant, state)
        for (let cs of node.cases) {
            if (cs.test) this.Expression(cs.test, state)
            for (let cons of cs.consequent) this.Statement(cons, state)
        }
    }

    SwitchCase(node: SwitchCase, state: State) {
        if (node.test) {
            this.Expression(node.test, state)
        }
        for (let cons of node.consequent) {
            this.Statement(cons, state)
        }
    }

    AwaitExpression(node: AwaitExpression, state: State) {
        if (node.argument) {
            this.Expression(node.argument, state)
        }
    }

    ReturnStatement(node: ReturnStatement, state: State) {
        if (node.argument) {
            this.Expression(node.argument, state)
        }
    }

    YieldExpression(node: YieldExpression, state: State) {
        if (node.argument) {
            this.Expression(node.argument, state)
        }
    }

    ThrowStatement(node: ThrowStatement, state: State) {
        this.Expression(node.argument, state)
    }

    SpreadElement(node: SpreadElement, state: State) {
        this.Expression(node.argument, state)
    }

    TryStatement(node: TryStatement, state: State) {
        this.Statement(node.block, state)
        if (node.handler) {
            this.runByType(node.handler, state)
        }
        if (node.finalizer) {
            this.Statement(node.finalizer, state)
        }
    }

    CatchClause(node: CatchClause, state: State) {
        if (node.param) {
            this.Pattern(node.param, state)
        }
        this.Statement(node.body, state)
    }

    DoWhileStatement(node: DoWhileStatement, state: State) {
        this.Expression(node.test, state)
        this.Statement(node.body, state)
    }

    WhileStatement(node: WhileStatement, state: State) {
        this.Expression(node.test, state)
        this.Statement(node.body, state)
    }

    ForStatement(node: ForStatement, state: State) {
        if (node.init) {
            this.ForInit(node.init, state)
        }
        if (node.test) {
            this.Expression(node.test, state)
        }
        if (node.update) {
            this.Expression(node.update, state)
        }
        this.Statement(node.body, state)
    }

    ForInStatement(node: ForInStatement, state: State) {
        this.ForInit(node.left, state)
        this.Expression(node.right, state)
        this.Statement(node.body, state)
    }

    ForOfStatement(node: ForOfStatement, state: State) {
        this.ForInit(node.left, state)
        this.Expression(node.right, state)
        this.Statement(node.body, state)
    }

    ForInit(node: Expression | VariableDeclaration | LVal, state: State) {
        if (node.type === 'VariableDeclaration') {
            this.runByType(node, state)
        } else {
            this.Expression(node, state)
        }
    }

    DebuggerStatement(_node: DebuggerStatement, _state: State) {}

    FunctionDeclaration(node: FunctionDeclaration, state: State) {
        this.Function(node, state)
    }

    VariableDeclaration(node: VariableDeclaration, state: State) {
        for (let decl of node.declarations) {
            this.runByType(decl, state)
        }
    }

    VariableDeclarator(node: VariableDeclarator, state: State) {
        this.Pattern(node.id, state)
        if (node.init) {
            this.Expression(node.init, state)
        }
    }

    Function(
        node:
            | FunctionExpression
            | FunctionDeclaration
            | ArrowFunctionExpression,
        state: State
    ) {
        if ('id' in node && node.id) {
            this.Pattern(node.id, state)
        }
        for (let param of node.params) {
            this.Pattern(param, state)
        }
        if (node.expression) {
            this.Expression(node.body, state)
        } else {
            this.Statement(node.body, state)
        }
    }

    Pattern(node: AcornNodeType, state: State) {
        if (node.type === 'Identifier') {
            this.VariablePattern(node, state)
        } else if (node.type === 'MemberExpression') {
            this.MemberPattern(node, state)
        } else {
            this.runByType(node, state)
        }
    }

    VariablePattern(_node: AcornNodeType, _state: State) {}

    MemberPattern(node: AcornNodeType, state: State) {
        this.runByType(node, state)
    }

    RestElement(node: RestElement, state: State) {
        this.Pattern(node.argument, state)
    }

    ArrayPattern(node: ArrayPattern, state: State) {
        for (let elt of node.elements) {
            if (elt) {
                this.Pattern(elt, state)
            }
        }
    }

    ObjectPattern(node: ObjectPattern, state: State) {
        for (let prop of node.properties) {
            if (prop.type === 'Property') {
                if (prop.computed) {
                    this.Expression(prop.key, state)
                }
                this.Pattern(prop.value, state)
            } else if (prop.type === 'RestElement') {
                this.Pattern(prop.argument, state)
            }
        }
    }

    Expression(node: AcornNodeType, state: State) {
        this.runByType(node, state)
    }

    ThisExpression(_node: ThisExpression, _state: State) {}

    Super(_node: Super, _state: State) {}

    MetaProperty(_node: MetaProperty, _state: State) {}

    ArrayExpression(node: ArrayExpression, state: State) {
        for (let elt of node.elements) {
            if (elt) {
                this.Expression(elt, state)
            }
        }
    }

    ObjectExpression(node: ObjectExpression, state: State) {
        for (let prop of node.properties) {
            this.runByType(prop, state)
        }
    }

    FunctionExpression(node: FunctionExpression, state: State) {
        this.Function(node, state)
    }

    ArrowFunctionExpression(node: ArrowFunctionExpression, state: State) {
        this.Function(node, state)
    }

    SequenceExpression(node: SequenceExpression, state: State) {
        for (let expr of node.expressions) {
            this.Expression(expr, state)
        }
    }

    TemplateLiteral(node: TemplateLiteral, state: State) {
        for (let quasi of node.quasis) {
            this.runByType(quasi, state)
        }

        for (let expr of node.expressions) {
            this.Expression(expr, state)
        }
    }

    TemplateElement(_node: TemplateElement, _state: State) {}

    UpdateExpression(node: UpdateExpression, state: State) {
        this.Expression(node.argument, state)
    }

    UnaryExpression(node: UnaryExpression, state: State) {
        this.Expression(node.argument, state)
    }

    BinaryExpression(node: BinaryExpression, state: State) {
        this.Expression(node.left, state)
        this.Expression(node.right, state)
    }

    LogicalExpression(node: LogicalExpression, state: State) {
        this.Expression(node.left, state)
        this.Expression(node.right, state)
    }

    AssignmentExpression(node: AssignmentExpression, state: State) {
        this.Pattern(node.left, state)
        this.Expression(node.right, state)
    }

    AssignmentPattern(node: AssignmentPattern, state: State) {
        this.Pattern(node.left, state)
        this.Expression(node.right, state)
    }

    ConditionalExpression(node: ConditionalExpression, state: State) {
        this.Expression(node.test, state)
        this.Expression(node.consequent, state)
        this.Expression(node.alternate, state)
    }

    NewExpression(node: NewExpression, state: State) {
        this.Expression(node.callee, state)
        if (node.arguments) {
            for (let arg of node.arguments) {
                if (arg) {
                    this.Expression(arg, state)
                }
            }
        }
    }

    CallExpression(node: CallExpression, state: State) {
        this.Expression(node.callee, state)
        if (node.arguments) {
            for (let arg of node.arguments) {
                if (arg) {
                    this.Expression(arg, state)
                }
            }
        }
    }

    MemberExpression(node: MemberExpression, state: State) {
        this.Expression(node.object, state)
        if (node.computed) {
            this.Expression(node.property, state)
        }
    }

    ExportNamedDeclaration(node: ExportNamedDeclaration, state: State) {
        if (node.declaration) {
            if (
                node.type === 'ExportNamedDeclaration' ||
                ('id' in node.declaration && node.declaration.id)
            ) {
                this.Statement(node.declaration, state)
            } else {
                this.Expression(node.declaration, state)
            }
        }

        if (node.source) {
            this.Expression(node.source, state)
        }
    }

    ExportDefaultDeclaration(node: ExportDefaultDeclaration, state: State) {
        if (node.declaration) {
            if ('id' in node.declaration && node.declaration.id) {
                this.Statement(node.declaration, state)
            } else {
                this.Expression(node.declaration, state)
            }
        }

        // @ts-ignore
        if (node.source) {
            // @ts-ignore
            this.Expression(node.source, state)
        }
    }

    ExportAllDeclaration(node: ExportAllDeclaration, state: State) {
        if (node.exported) {
            this.runByType(node.exported, state)
        }
        this.Expression(node.source, state)
    }

    ImportDeclaration(node: ImportDeclaration, state: State) {
        for (let spec of node.specifiers) {
            this.runByType(spec, state)
        }
        this.Expression(node.source, state)
    }

    ImportExpression(node: ImportExpression, state: State) {
        this.Expression(node.source, state)
    }

    ImportSpecifier(_node: ImportSpecifier, _state: State) {}

    ImportDefaultSpecifier(_node: ImportDefaultSpecifier, _state: State) {}

    ImportNamespaceSpecifier(_node: ImportNamespaceSpecifier, _state: State) {}

    Identifier(_node: Identifier, _state: State) {}

    PrivateIdentifier(_node: PrivateIdentifier, _state: State) {}

    Literal(_node: Literal, _state: State) {}

    TaggedTemplateExpression(node: TaggedTemplateExpression, state: State) {
        this.Expression(node.tag, state)
        this.Expression(node.quasi, state)
    }

    ClassDeclaration(node: ClassDeclaration, state: State) {
        this.Class(node, state)
    }

    ClassExpression(node: ClassExpression, state: State) {
        this.Class(node, state)
    }

    Class(node: ClassExpression | ClassDeclaration, state: State) {
        if (node.id) {
            this.Pattern(node.id, state)
        }
        if (node.superClass) {
            this.Expression(node.superClass, state)
        }
        this.runByType(node.body, state)
    }

    ClassBody(node: ClassBody, state: State) {
        for (let elt of node.body) {
            this.runByType(elt, state)
        }
    }

    MethodDefinition(node: MethodDefinition, state: State) {
        if (node.computed) {
            this.Expression(node.key, state)
        }
        if (node.value) {
            this.Expression(node.value, state)
        }
    }

    PropertyDefinition(node: PropertyDefinition, state: State) {
        if (node.computed) {
            this.Expression(node.key, state)
        }
        if (node.value) {
            this.Expression(node.value, state)
        }
    }

    Property(node: Property, state: State) {
        if (node.computed) {
            this.Expression(node.key, state)
        }
        if (node.value) {
            this.Expression(node.value, state)
        }
    }
}
