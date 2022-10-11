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
    EmptyStatement,
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

function newNodeManager<T extends AcornNodeType>(
    node: T,
    parentNode?: AcornNodeType,
    key?: string,
    index?: number
): NodeManager<T> {
    return new NodeManager(node, parentNode, key, index)
}

export default class Walk<State> {
    private userWalk: TraverseWalk<State>
    private state: State | undefined

    constructor(userWalk: TraverseWalk<State>, state?: State) {
        this.userWalk = userWalk
        this.state = state
    }

    runStatementArray(
        nodesArr: AcornNodeType[],
        node: AcornNodeType,
        key: string
    ) {
        for (let index = 0; index < nodesArr.length; index++) {
            this.Statement(nodesArr[index], node, key, index)
        }
    }

    runByType(
        newNode: AcornNodeType,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const type = newNode.type
        // @ts-ignore
        this[type](newNode, parentNode, key, index)
    }

    runByNewNode(nodeManager: NodeManager<any>, callback?: () => any) {
        const newNode = nodeManager.getNewNode()
        // while exist newNode, just run by node type
        if (newNode) {
            this.runByType(newNode)
        } else {
            callback && callback()
        }
    }

    runWithEmpty<T extends AcornNodeType>(
        node: T,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<T>(node, parentNode, key, index)
        this.userWalk[node.type] &&
            // @ts-ignore
            this.userWalk[node.type](nodeManager, this.state)

        this.runByNewNode(nodeManager)
    }

    Program(
        node: Program,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<Program>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['Program'] &&
            this.userWalk['Program'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            this.runStatementArray(node.body.slice(), node, 'body')
        })
    }

    BlockStatement(
        node: BlockStatement,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<BlockStatement>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['BlockStatement'] &&
            this.userWalk['BlockStatement'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            this.runStatementArray(node.body.slice(), node, 'body')
        })
    }

    StaticBlock(
        node: StaticBlock,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<StaticBlock>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['StaticBlock'] &&
            this.userWalk['StaticBlock'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            this.runStatementArray(node.body.slice(), node, 'body')
        })
    }

    Statement(
        node: AcornNodeType,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        this.runByType(node, parentNode, key, index)
    }

    EmptyStatement(
        node: EmptyStatement,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        this.runWithEmpty<EmptyStatement>(node, parentNode, key, index)
    }

    ExpressionStatement(
        node: ExpressionStatement,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<ExpressionStatement>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['ExpressionStatement'] &&
            this.userWalk['ExpressionStatement'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            this.Expression(node.expression)
        })
    }

    ParenthesizedExpression(
        node: ParenthesizedExpression,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<ParenthesizedExpression>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['ParenthesizedExpression'] &&
            this.userWalk['ParenthesizedExpression'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            this.Expression(node.expression)
        })
    }

    ChainExpression(
        node: ChainExpression,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<ChainExpression>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['ChainExpression'] &&
            this.userWalk['ChainExpression'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            this.Expression(node.expression)
        })
    }

    IfStatement(
        node: IfStatement,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<IfStatement>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['IfStatement'] &&
            this.userWalk['IfStatement'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            this.Expression(node.test)
            this.Statement(node.consequent)
            if (node.alternate) {
                this.Statement(node.alternate)
            }
        })
    }

    LabeledStatement(
        node: LabeledStatement,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<LabeledStatement>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['LabeledStatement'] &&
            this.userWalk['LabeledStatement'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            this.Statement(node.body)
        })
    }

    BreakStatement(
        node: BreakStatement,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        this.runWithEmpty<BreakStatement>(node, parentNode, key, index)
    }

    ContinueStatement(
        node: ContinueStatement,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        this.runWithEmpty<ContinueStatement>(node, parentNode, key, index)
    }

    WithStatement(
        node: WithStatement,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<WithStatement>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['WithStatement'] &&
            this.userWalk['WithStatement'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            this.Expression(node.object)
            this.Statement(node.body)
        })
    }

    SwitchStatement(
        node: SwitchStatement,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<SwitchStatement>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['SwitchStatement'] &&
            this.userWalk['SwitchStatement'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            this.Expression(node.discriminant)

            const cases = node.cases.slice()
            for (let index = 0; index < cases.length; index++) {
                this.SwitchCase(cases[index], node, 'cases', index)
            }
        })
    }

    SwitchCase(
        node: SwitchCase,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<SwitchCase>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['SwitchCase'] &&
            this.userWalk['SwitchCase'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            if (node.test) {
                this.Expression(node.test)
            }

            this.runStatementArray(node.consequent.slice(), node, 'consequent')
        })
    }

    AwaitExpression(
        node: AwaitExpression,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<AwaitExpression>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['AwaitExpression'] &&
            this.userWalk['AwaitExpression'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            if (node.argument) {
                this.Expression(node.argument)
            }
        })
    }

    ReturnStatement(
        node: ReturnStatement,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<ReturnStatement>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['ReturnStatement'] &&
            this.userWalk['ReturnStatement'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            if (node.argument) {
                this.Expression(node.argument)
            }
        })
    }

    YieldExpression(
        node: YieldExpression,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<YieldExpression>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['YieldExpression'] &&
            this.userWalk['YieldExpression'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            if (node.argument) {
                this.Expression(node.argument)
            }
        })
    }

    ThrowStatement(
        node: ThrowStatement,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<ThrowStatement>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['ThrowStatement'] &&
            this.userWalk['ThrowStatement'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            this.Expression(node.argument)
        })
    }

    SpreadElement(
        node: SpreadElement,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<SpreadElement>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['SpreadElement'] &&
            this.userWalk['SpreadElement'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            this.Expression(node.argument)
        })
    }

    TryStatement(
        node: TryStatement,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<TryStatement>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['TryStatement'] &&
            this.userWalk['TryStatement'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            this.Statement(node.block)
            if (node.handler) {
                this.runByType(node.handler)
            }
            if (node.finalizer) {
                this.Statement(node.finalizer)
            }
        })
    }

    CatchClause(
        node: CatchClause,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<CatchClause>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['CatchClause'] &&
            this.userWalk['CatchClause'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            if (node.param) {
                this.Pattern(node.param)
            }
            this.Statement(node.body)
        })
    }

    DoWhileStatement(
        node: DoWhileStatement,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<DoWhileStatement>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['DoWhileStatement'] &&
            this.userWalk['DoWhileStatement'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            this.Expression(node.test)
            this.Statement(node.body)
        })
    }

    WhileStatement(
        node: WhileStatement,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<WhileStatement>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['WhileStatement'] &&
            this.userWalk['WhileStatement'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            this.Expression(node.test)
            this.Statement(node.body)
        })
    }

    ForStatement(
        node: ForStatement,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<ForStatement>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['ForStatement'] &&
            this.userWalk['ForStatement'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            if (node.init) {
                this.ForInit(node.init)
            }
            if (node.test) {
                this.Expression(node.test)
            }
            if (node.update) {
                this.Expression(node.update)
            }
            this.Statement(node.body)
        })
    }

    ForInStatement(
        node: ForInStatement,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<ForInStatement>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['ForInStatement'] &&
            this.userWalk['ForInStatement'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            this.ForInit(node.left)
            this.Expression(node.right)
            this.Statement(node.body)
        })
    }

    ForOfStatement(
        node: ForOfStatement,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<ForOfStatement>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['ForOfStatement'] &&
            this.userWalk['ForOfStatement'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            this.ForInit(node.left)
            this.Expression(node.right)
            this.Statement(node.body)
        })
    }

    ForInit(
        node: Expression | VariableDeclaration | LVal,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        if (node.type === 'VariableDeclaration') {
            this.runByType(node, parentNode, key, index)
        } else {
            this.Expression(node, parentNode, key, index)
        }
    }

    DebuggerStatement(
        node: DebuggerStatement,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        this.runWithEmpty(node, parentNode, key, index)
    }

    FunctionDeclaration(
        node: FunctionDeclaration,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<FunctionDeclaration>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['FunctionDeclaration'] &&
            this.userWalk['FunctionDeclaration'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            this.Function(node)
        })
    }

    VariableDeclaration(
        node: VariableDeclaration,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<VariableDeclaration>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['VariableDeclaration'] &&
            this.userWalk['VariableDeclaration'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            const nodeArr = node.declarations.slice()
            for (let index = 0; index < nodeArr.length; index++) {
                this.runByType(nodeArr[index], node, 'declarations', index)
            }
        })
    }

    VariableDeclarator(
        node: VariableDeclarator,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<VariableDeclarator>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['VariableDeclarator'] &&
            this.userWalk['VariableDeclarator'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            this.Pattern(node.id)
            if (node.init) {
                this.Expression(node.init)
            }
        })
    }

    Function(
        node:
            | FunctionExpression
            | FunctionDeclaration
            | ArrowFunctionExpression,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        if ('id' in node && node.id) {
            this.Pattern(node.id, parentNode, key, index)
        }
        const nodeArr = node.params.slice()
        for (let index = 0; index < nodeArr.length; index++) {
            this.Pattern(nodeArr[index], node, 'params', index)
        }

        if (node.expression) {
            this.Expression(node.body, parentNode, key, index)
        } else {
            this.Statement(node.body, parentNode, key, index)
        }
    }

    Pattern(
        node: AcornNodeType,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        if (node.type === 'Identifier') {
            this.VariablePattern(node, parentNode, key, index)
        } else if (node.type === 'MemberExpression') {
            this.MemberPattern(node, parentNode, key, index)
        } else {
            this.runByType(node, parentNode, key, index)
        }
    }

    VariablePattern(
        node: AcornNodeType,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        this.runWithEmpty(node, parentNode, key, index)
    }

    MemberPattern(
        node: AcornNodeType,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        this.runByType(node, parentNode, key, index)
    }

    RestElement(
        node: RestElement,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<RestElement>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['RestElement'] &&
            this.userWalk['RestElement'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            this.Pattern(node.argument)
        })
    }

    ArrayPattern(
        node: ArrayPattern,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<ArrayPattern>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['ArrayPattern'] &&
            this.userWalk['ArrayPattern'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            const nodeArr = node.elements.slice()
            for (let index = 0; index < nodeArr.length; index++) {
                const _n = nodeArr[index]
                if (_n) {
                    this.Pattern(_n, node, 'elements', index)
                }
            }
        })
    }

    ObjectPattern(
        node: ObjectPattern,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<ObjectPattern>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['ObjectPattern'] &&
            this.userWalk['ObjectPattern'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            const nodeArr = node.properties.slice()
            for (let index = 0; index < nodeArr.length; index++) {
                const prop = nodeArr[index]
                if (prop.type === 'Property') {
                    this.Property(prop, node, 'properties', index)
                } else if (prop.type === 'RestElement') {
                    this.RestElement(prop, node, 'properties', index)
                } else if (prop.type === 'SpreadElement') {
                    this.SpreadElement(prop, node, 'properties', index)
                }
            }
        })
    }

    Expression(
        node: AcornNodeType,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        this.runByType(node, parentNode, key, index)
    }

    ThisExpression(
        node: ThisExpression,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        this.runWithEmpty(node, parentNode, key, index)
    }

    Super(
        node: Super,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        this.runWithEmpty(node, parentNode, key, index)
    }

    MetaProperty(
        node: MetaProperty,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        this.runWithEmpty(node, parentNode, key, index)
    }

    ArrayExpression(
        node: ArrayExpression,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<ArrayExpression>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['ArrayExpression'] &&
            this.userWalk['ArrayExpression'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            const nodeArr = node.elements.slice()
            for (let index = 0; index < nodeArr.length; index++) {
                const elt = nodeArr[index]
                if (elt) {
                    this.Expression(elt, node, 'elements', index)
                }
            }
        })
    }

    ObjectExpression(
        node: ObjectExpression,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<ObjectExpression>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['ObjectExpression'] &&
            this.userWalk['ObjectExpression'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            const nodeArr = node.properties.slice()
            for (let index = 0; index < nodeArr.length; index++) {
                this.runByType(nodeArr[index], node, 'properties', index)
            }
        })
    }

    FunctionExpression(
        node: FunctionExpression,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<FunctionExpression>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['FunctionExpression'] &&
            this.userWalk['FunctionExpression'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            this.Function(node)
        })
    }

    ArrowFunctionExpression(
        node: ArrowFunctionExpression,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<ArrowFunctionExpression>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['ArrowFunctionExpression'] &&
            this.userWalk['ArrowFunctionExpression'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            this.Function(node)
        })
    }

    SequenceExpression(
        node: SequenceExpression,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<SequenceExpression>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['SequenceExpression'] &&
            this.userWalk['SequenceExpression'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            const nodeArr = node.expressions.slice()
            for (let index = 0; index < nodeArr.length; index++) {
                this.Expression(nodeArr[index], node, 'expressions', index)
            }
        })
    }

    TemplateLiteral(
        node: TemplateLiteral,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<TemplateLiteral>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['TemplateLiteral'] &&
            this.userWalk['TemplateLiteral'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            const nodeArr = node.quasis.slice()
            const nodeArr2 = node.expressions.slice()
            for (let index = 0; index < nodeArr.length; index++) {
                this.runByType(nodeArr[index], node, 'quasis', index)
            }

            for (let index = 0; index < nodeArr2.length; index++) {
                this.Expression(nodeArr2[index], node, 'expressions', index)
            }
        })
    }

    TemplateElement(
        node: TemplateElement,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        this.runWithEmpty(node, parentNode, key, index)
    }

    UpdateExpression(
        node: UpdateExpression,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<UpdateExpression>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['UpdateExpression'] &&
            this.userWalk['UpdateExpression'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            this.Expression(node.argument)
        })
    }

    UnaryExpression(
        node: UnaryExpression,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<UnaryExpression>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['UnaryExpression'] &&
            this.userWalk['UnaryExpression'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            this.Expression(node.argument)
        })
    }

    BinaryExpression(
        node: BinaryExpression,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<BinaryExpression>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['BinaryExpression'] &&
            this.userWalk['BinaryExpression'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            this.Expression(node.left)
            this.Expression(node.right)
        })
    }

    LogicalExpression(
        node: LogicalExpression,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<LogicalExpression>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['LogicalExpression'] &&
            this.userWalk['LogicalExpression'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            this.Expression(node.left)
            this.Expression(node.right)
        })
    }

    AssignmentExpression(
        node: AssignmentExpression,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<AssignmentExpression>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['AssignmentExpression'] &&
            this.userWalk['AssignmentExpression'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            this.Pattern(node.left)
            this.Expression(node.right)
        })
    }

    AssignmentPattern(
        node: AssignmentPattern,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<AssignmentPattern>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['AssignmentPattern'] &&
            this.userWalk['AssignmentPattern'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            this.Pattern(node.left)
            this.Expression(node.right)
        })
    }

    ConditionalExpression(
        node: ConditionalExpression,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<ConditionalExpression>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['ConditionalExpression'] &&
            this.userWalk['ConditionalExpression'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            this.Expression(node.test)
            this.Expression(node.consequent)
            this.Expression(node.alternate)
        })
    }

    NewExpression(
        node: NewExpression,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<NewExpression>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['NewExpression'] &&
            this.userWalk['NewExpression'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            this.Expression(node.callee)

            if (node.arguments) {
                const nodeArr = node.arguments.slice()

                for (let index = 0; index < nodeArr.length; index++) {
                    let arg = nodeArr[index]
                    if (arg) {
                        this.Expression(arg, node, 'arguments', index)
                    }
                }
            }
        })
    }

    CallExpression(
        node: CallExpression,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<CallExpression>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['CallExpression'] &&
            this.userWalk['CallExpression'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            this.Expression(node.callee)

            if (node.arguments) {
                const nodeArr = node.arguments.slice()

                for (let index = 0; index < nodeArr.length; index++) {
                    let arg = nodeArr[index]
                    if (arg) {
                        this.Expression(arg, node, 'arguments', index)
                    }
                }
            }
        })
    }

    MemberExpression(
        node: MemberExpression,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<MemberExpression>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['MemberExpression'] &&
            this.userWalk['MemberExpression'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            this.Expression(node.object)
            if (node.computed) {
                this.Expression(node.property)
            }
        })
    }

    ExportNamedDeclaration(
        node: ExportNamedDeclaration,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<ExportNamedDeclaration>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['ExportNamedDeclaration'] &&
            this.userWalk['ExportNamedDeclaration'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            if (node.declaration) {
                if ('id' in node.declaration && node.declaration.id) {
                    this.Statement(node.declaration)
                } else {
                    this.Expression(node.declaration)
                }
            }

            if (node.source) {
                this.Expression(node.source)
            }
        })
    }

    ExportDefaultDeclaration(
        node: ExportDefaultDeclaration,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<ExportDefaultDeclaration>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['ExportDefaultDeclaration'] &&
            this.userWalk['ExportDefaultDeclaration'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            if (node.declaration) {
                if ('id' in node.declaration && node.declaration.id) {
                    this.Statement(node.declaration)
                } else {
                    this.Expression(node.declaration)
                }
            }
        })
    }

    ExportAllDeclaration(
        node: ExportAllDeclaration,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<ExportAllDeclaration>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['ExportAllDeclaration'] &&
            this.userWalk['ExportAllDeclaration'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            if (node.exported) {
                this.runByType(node.exported)
            }
            this.Expression(node.source)
        })
    }

    ImportDeclaration(
        node: ImportDeclaration,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<ImportDeclaration>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['ImportDeclaration'] &&
            this.userWalk['ImportDeclaration'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            const nodeArr = node.specifiers.slice()
            for (let index = 0; index < nodeArr.length; index++) {
                this.runByType(nodeArr[index], node, 'specifiers', index)
            }

            this.Expression(node.source)
        })
    }

    ImportExpression(
        node: ImportExpression,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<ImportExpression>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['ImportExpression'] &&
            this.userWalk['ImportExpression'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            this.Expression(node.source)
        })
    }

    ImportSpecifier(
        node: ImportSpecifier,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        this.runWithEmpty(node, parentNode, key, index)
    }

    ImportDefaultSpecifier(
        node: ImportDefaultSpecifier,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        this.runWithEmpty(node, parentNode, key, index)
    }

    ImportNamespaceSpecifier(
        node: ImportNamespaceSpecifier,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        this.runWithEmpty(node, parentNode, key, index)
    }

    Identifier(
        node: Identifier,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        this.runWithEmpty(node, parentNode, key, index)
    }

    PrivateIdentifier(
        node: PrivateIdentifier,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        this.runWithEmpty(node, parentNode, key, index)
    }

    Literal(
        node: Literal,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        this.runWithEmpty(node, parentNode, key, index)
    }

    TaggedTemplateExpression(
        node: TaggedTemplateExpression,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<TaggedTemplateExpression>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['TaggedTemplateExpression'] &&
            this.userWalk['TaggedTemplateExpression'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            this.Expression(node.tag)
            this.Expression(node.quasi)
        })
    }

    ClassDeclaration(
        node: ClassDeclaration,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<ClassDeclaration>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['ClassDeclaration'] &&
            this.userWalk['ClassDeclaration'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            this.Class(node)
        })
    }

    ClassExpression(
        node: ClassExpression,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<ClassExpression>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['ClassExpression'] &&
            this.userWalk['ClassExpression'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            this.Class(node)
        })
    }

    Class(
        node: ClassExpression | ClassDeclaration,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        if (node.id) {
            this.Pattern(node.id, parentNode, key, index)
        }
        if (node.superClass) {
            this.Expression(node.superClass, parentNode, key, index)
        }
        this.runByType(node.body, parentNode, key, index)
    }

    ClassBody(
        node: ClassBody,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<ClassBody>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['ClassBody'] &&
            this.userWalk['ClassBody'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            const nodeArr = node.body.slice()

            for (let index = 0; index < nodeArr.length; index++) {
                this.runByType(nodeArr[index], node, 'body', index)
            }
        })
    }

    MethodDefinition(
        node: MethodDefinition,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<MethodDefinition>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['MethodDefinition'] &&
            this.userWalk['MethodDefinition'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            if (node.computed) {
                this.Expression(node.key)
            }
            if (node.value) {
                this.Expression(node.value)
            }
        })
    }

    PropertyDefinition(
        node: PropertyDefinition,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<PropertyDefinition>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['PropertyDefinition'] &&
            this.userWalk['PropertyDefinition'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            if (node.computed) {
                this.Expression(node.key)
            }
            if (node.value) {
                this.Expression(node.value)
            }
        })
    }

    Property(
        node: Property,
        parentNode?: AcornNodeType,
        key?: string,
        index?: number
    ) {
        const nodeManager = newNodeManager<Property>(
            node,
            parentNode,
            key,
            index
        )
        this.userWalk['Property'] &&
            this.userWalk['Property'](nodeManager, this.state)

        this.runByNewNode(nodeManager, () => {
            if (node.computed) {
                this.Expression(node.key)
            }
            if (node.value) {
                this.Expression(node.value)
            }
        })
    }
}
