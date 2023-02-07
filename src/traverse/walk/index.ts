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
  YieldExpression,
  LVal
} from '@node/type'
import type { TraverseWalk } from '@traverse/type'
import NodeManager from '@node'

function newNodeManager<T extends AcornNodeType>(
  node: T,
  parentNode?: AcornNodeType,
  key?: string
): NodeManager<T> {
  return new NodeManager(node, parentNode, key)
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
    key?: string
  ) {
    for (let index = 0; index < nodesArr.length; index++) {
      this.Statement(nodesArr[index], node, key)
    }
  }

  runByType(newNode: AcornNodeType, parentNode?: AcornNodeType, key?: string) {
    const type = newNode.type
    // @ts-ignore
    this[type](newNode, parentNode, key)
  }

  runByNewNode(nodeManager: NodeManager<any>, callback?: () => any) {
    const newNode = nodeManager.getNewNode()
    // we won't run the new node.
    if (!newNode) {
      callback && callback()
    }
  }

  runWithEmpty<T extends AcornNodeType>(
    node: T,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    const nodeManager = newNodeManager<T>(node, parentNode, key)
    this.userWalk[node.type] &&
    // @ts-ignore
    this.userWalk[node.type](nodeManager, this.state)

    this.runByNewNode(nodeManager)
  }

  Program(node: Program, parentNode?: AcornNodeType, key?: string) {
    const nodeManager = newNodeManager<Program>(node, parentNode, key)
    this.userWalk['Program'] &&
    this.userWalk['Program'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      this.runStatementArray(node.body.slice(), node, 'body')
    })
  }

  BlockStatement(
    node: BlockStatement,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    const nodeManager = newNodeManager<BlockStatement>(node, parentNode, key)
    this.userWalk['BlockStatement'] &&
    this.userWalk['BlockStatement'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      this.runStatementArray(node.body.slice(), node, 'body')
    })
  }

  StaticBlock(node: StaticBlock, parentNode?: AcornNodeType, key?: string) {
    const nodeManager = newNodeManager<StaticBlock>(node, parentNode, key)
    this.userWalk['StaticBlock'] &&
    this.userWalk['StaticBlock'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      this.runStatementArray(node.body.slice(), node, 'body')
    })
  }

  Statement(node: AcornNodeType, parentNode?: AcornNodeType, key?: string) {
    this.runByType(node, parentNode, key)
  }

  EmptyStatement(
    node: EmptyStatement,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    this.runWithEmpty<EmptyStatement>(node, parentNode, key)
  }

  ExpressionStatement(
    node: ExpressionStatement,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    const nodeManager = newNodeManager<ExpressionStatement>(
      node,
      parentNode,
      key
    )
    this.userWalk['ExpressionStatement'] &&
    this.userWalk['ExpressionStatement'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      this.Expression(node.expression, node, 'expression')
    })
  }

  ParenthesizedExpression(
    node: ParenthesizedExpression,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    const nodeManager = newNodeManager<ParenthesizedExpression>(
      node,
      parentNode,
      key
    )
    this.userWalk['ParenthesizedExpression'] &&
    this.userWalk['ParenthesizedExpression'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      this.Expression(node.expression, node, 'expression')
    })
  }

  ChainExpression(
    node: ChainExpression,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    const nodeManager = newNodeManager<ChainExpression>(node, parentNode, key)
    this.userWalk['ChainExpression'] &&
    this.userWalk['ChainExpression'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      this.Expression(node.expression, node, 'expression')
    })
  }

  IfStatement(node: IfStatement, parentNode?: AcornNodeType, key?: string) {
    const nodeManager = newNodeManager<IfStatement>(node, parentNode, key)
    this.userWalk['IfStatement'] &&
    this.userWalk['IfStatement'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      this.Expression(node.test, node, 'test')
      this.Statement(node.consequent, node, 'consequent')
      if (node.alternate) {
        this.Statement(node.alternate, node, 'alternate')
      }
    })
  }

  LabeledStatement(
    node: LabeledStatement,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    const nodeManager = newNodeManager<LabeledStatement>(node, parentNode, key)
    this.userWalk['LabeledStatement'] &&
    this.userWalk['LabeledStatement'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      this.Statement(node.body, node, 'body')
    })
  }

  BreakStatement(
    node: BreakStatement,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    this.runWithEmpty<BreakStatement>(node, parentNode, key)
  }

  ContinueStatement(
    node: ContinueStatement,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    this.runWithEmpty<ContinueStatement>(node, parentNode, key)
  }

  WithStatement(node: WithStatement, parentNode?: AcornNodeType, key?: string) {
    const nodeManager = newNodeManager<WithStatement>(node, parentNode, key)
    this.userWalk['WithStatement'] &&
    this.userWalk['WithStatement'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      this.Expression(node.object, node, 'object')
      this.Statement(node.body, node, 'body')
    })
  }

  SwitchStatement(
    node: SwitchStatement,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    const nodeManager = newNodeManager<SwitchStatement>(node, parentNode, key)
    this.userWalk['SwitchStatement'] &&
    this.userWalk['SwitchStatement'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      this.Expression(node.discriminant, node, 'discriminant')

      const cases = node.cases.slice()
      for (let index = 0; index < cases.length; index++) {
        this.SwitchCase(cases[index], node, 'cases')
      }
    })
  }

  SwitchCase(node: SwitchCase, parentNode?: AcornNodeType, key?: string) {
    const nodeManager = newNodeManager<SwitchCase>(node, parentNode, key)
    this.userWalk['SwitchCase'] &&
    this.userWalk['SwitchCase'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      if (node.test) {
        this.Expression(node.test, node, 'test')
      }

      this.runStatementArray(node.consequent.slice(), node, 'consequent')
    })
  }

  AwaitExpression(
    node: AwaitExpression,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    const nodeManager = newNodeManager<AwaitExpression>(node, parentNode, key)
    this.userWalk['AwaitExpression'] &&
    this.userWalk['AwaitExpression'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      if (node.argument) {
        this.Expression(node.argument, node, 'argument')
      }
    })
  }

  ReturnStatement(
    node: ReturnStatement,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    const nodeManager = newNodeManager<ReturnStatement>(node, parentNode, key)
    this.userWalk['ReturnStatement'] &&
    this.userWalk['ReturnStatement'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      if (node.argument) {
        this.Expression(node.argument, node, 'argument')
      }
    })
  }

  YieldExpression(
    node: YieldExpression,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    const nodeManager = newNodeManager<YieldExpression>(node, parentNode, key)
    this.userWalk['YieldExpression'] &&
    this.userWalk['YieldExpression'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      if (node.argument) {
        this.Expression(node.argument, node, 'argument')
      }
    })
  }

  ThrowStatement(
    node: ThrowStatement,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    const nodeManager = newNodeManager<ThrowStatement>(node, parentNode, key)
    this.userWalk['ThrowStatement'] &&
    this.userWalk['ThrowStatement'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      this.Expression(node.argument, node, 'argument')
    })
  }

  SpreadElement(node: SpreadElement, parentNode?: AcornNodeType, key?: string) {
    const nodeManager = newNodeManager<SpreadElement>(node, parentNode, key)
    this.userWalk['SpreadElement'] &&
    this.userWalk['SpreadElement'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      this.Expression(node.argument, node, 'argument')
    })
  }

  TryStatement(node: TryStatement, parentNode?: AcornNodeType, key?: string) {
    const nodeManager = newNodeManager<TryStatement>(node, parentNode, key)
    this.userWalk['TryStatement'] &&
    this.userWalk['TryStatement'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      this.Statement(node.block, node, 'block')
      if (node.handler) {
        this.runByType(node.handler, node, 'handler')
      }
      if (node.finalizer) {
        this.Statement(node.finalizer, node, 'finalizer')
      }
    })
  }

  CatchClause(node: CatchClause, parentNode?: AcornNodeType, key?: string) {
    const nodeManager = newNodeManager<CatchClause>(node, parentNode, key)
    this.userWalk['CatchClause'] &&
    this.userWalk['CatchClause'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      if (node.param) {
        this.Pattern(node.param, node, 'param')
      }
      this.Statement(node.body, node, 'body')
    })
  }

  DoWhileStatement(
    node: DoWhileStatement,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    const nodeManager = newNodeManager<DoWhileStatement>(node, parentNode, key)
    this.userWalk['DoWhileStatement'] &&
    this.userWalk['DoWhileStatement'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      this.Expression(node.test, node, 'test')
      this.Statement(node.body, node, 'body')
    })
  }

  WhileStatement(
    node: WhileStatement,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    const nodeManager = newNodeManager<WhileStatement>(node, parentNode, key)
    this.userWalk['WhileStatement'] &&
    this.userWalk['WhileStatement'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      this.Expression(node.test, node, 'test')
      this.Statement(node.body, node, 'body')
    })
  }

  ForStatement(node: ForStatement, parentNode?: AcornNodeType, key?: string) {
    const nodeManager = newNodeManager<ForStatement>(node, parentNode, key)
    this.userWalk['ForStatement'] &&
    this.userWalk['ForStatement'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      if (node.init) {
        this.ForInit(node.init, node, 'init')
      }
      if (node.test) {
        this.Expression(node.test, node, 'test')
      }
      if (node.update) {
        this.Expression(node.update, node, 'update')
      }
      this.Statement(node.body, node, 'body')
    })
  }

  ForInStatement(
    node: ForInStatement,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    const nodeManager = newNodeManager<ForInStatement>(node, parentNode, key)
    this.userWalk['ForInStatement'] &&
    this.userWalk['ForInStatement'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      this.ForInit(node.left, node, 'left')
      this.Expression(node.right, node, 'right')
      this.Statement(node.body, node, 'body')
    })
  }

  ForOfStatement(
    node: ForOfStatement,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    const nodeManager = newNodeManager<ForOfStatement>(node, parentNode, key)
    this.userWalk['ForOfStatement'] &&
    this.userWalk['ForOfStatement'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      this.ForInit(node.left, node, 'left')
      this.Expression(node.right, node, 'right')
      this.Statement(node.body, node, 'body')
    })
  }

  ForInit(
    node: Expression | VariableDeclaration | LVal,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    if (node.type === 'VariableDeclaration') {
      this.runByType(node, parentNode, key)
    } else {
      this.Expression(node, parentNode, key)
    }
  }

  DebuggerStatement(
    node: DebuggerStatement,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    this.runWithEmpty(node, parentNode, key)
  }

  FunctionDeclaration(
    node: FunctionDeclaration,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    const nodeManager = newNodeManager<FunctionDeclaration>(
      node,
      parentNode,
      key
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
    key?: string
  ) {
    const nodeManager = newNodeManager<VariableDeclaration>(
      node,
      parentNode,
      key
    )
    this.userWalk['VariableDeclaration'] &&
    this.userWalk['VariableDeclaration'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      const nodeArr = node.declarations.slice()
      for (let index = 0; index < nodeArr.length; index++) {
        this.runByType(nodeArr[index], node, 'declarations')
      }
    })
  }

  VariableDeclarator(
    node: VariableDeclarator,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    const nodeManager = newNodeManager<VariableDeclarator>(
      node,
      parentNode,
      key
    )
    this.userWalk['VariableDeclarator'] &&
    this.userWalk['VariableDeclarator'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      this.Pattern(node.id, node, 'id')
      if (node.init) {
        this.Expression(node.init, node, 'init')
      }
    })
  }

  Function(
    node: FunctionExpression | FunctionDeclaration | ArrowFunctionExpression
  ) {
    if ('id' in node && node.id) {
      this.Pattern(node.id, node, 'id')
    }
    const nodeArr = node.params.slice()
    for (let index = 0; index < nodeArr.length; index++) {
      this.Pattern(nodeArr[index], node, 'params')
    }

    if (node.expression) {
      this.Expression(node.body, node, 'body')
    } else {
      this.Statement(node.body, node, 'body')
    }
  }

  Pattern(node: AcornNodeType, parentNode?: AcornNodeType, key?: string) {
    if (node.type === 'Identifier') {
      this.VariablePattern(node, parentNode, key)
    } else if (node.type === 'MemberExpression') {
      this.MemberPattern(node, parentNode, key)
    } else {
      this.runByType(node, parentNode, key)
    }
  }

  VariablePattern(
    node: AcornNodeType,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    this.runWithEmpty(node, parentNode, key)
  }

  MemberPattern(node: AcornNodeType, parentNode?: AcornNodeType, key?: string) {
    this.runByType(node, parentNode, key)
  }

  RestElement(node: RestElement, parentNode?: AcornNodeType, key?: string) {
    const nodeManager = newNodeManager<RestElement>(node, parentNode, key)
    this.userWalk['RestElement'] &&
    this.userWalk['RestElement'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      this.Pattern(node.argument, node, 'argument')
    })
  }

  ArrayPattern(node: ArrayPattern, parentNode?: AcornNodeType, key?: string) {
    const nodeManager = newNodeManager<ArrayPattern>(node, parentNode, key)
    this.userWalk['ArrayPattern'] &&
    this.userWalk['ArrayPattern'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      const nodeArr = node.elements.slice()
      for (let index = 0; index < nodeArr.length; index++) {
        const _n = nodeArr[index]
        if (_n) {
          this.Pattern(_n, node, 'elements')
        }
      }
    })
  }

  ObjectPattern(node: ObjectPattern, parentNode?: AcornNodeType, key?: string) {
    const nodeManager = newNodeManager<ObjectPattern>(node, parentNode, key)
    this.userWalk['ObjectPattern'] &&
    this.userWalk['ObjectPattern'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      const nodeArr = node.properties.slice()
      for (let index = 0; index < nodeArr.length; index++) {
        const prop = nodeArr[index]
        if (prop.type === 'Property') {
          this.Property(prop, node, 'properties')
        } else if (prop.type === 'RestElement') {
          this.RestElement(prop, node, 'properties')
        } else if (prop.type === 'SpreadElement') {
          this.SpreadElement(prop, node, 'properties')
        }
      }
    })
  }

  Expression(node: AcornNodeType, parentNode?: AcornNodeType, key?: string) {
    this.runByType(node, parentNode, key)
  }

  ThisExpression(
    node: ThisExpression,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    this.runWithEmpty(node, parentNode, key)
  }

  Super(node: Super, parentNode?: AcornNodeType, key?: string) {
    this.runWithEmpty(node, parentNode, key)
  }

  MetaProperty(node: MetaProperty, parentNode?: AcornNodeType, key?: string) {
    this.runWithEmpty(node, parentNode, key)
  }

  ArrayExpression(
    node: ArrayExpression,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    const nodeManager = newNodeManager<ArrayExpression>(node, parentNode, key)
    this.userWalk['ArrayExpression'] &&
    this.userWalk['ArrayExpression'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      const nodeArr = node.elements.slice()
      for (let index = 0; index < nodeArr.length; index++) {
        const elt = nodeArr[index]
        if (elt) {
          this.Expression(elt, node, 'elements')
        }
      }
    })
  }

  ObjectExpression(
    node: ObjectExpression,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    const nodeManager = newNodeManager<ObjectExpression>(node, parentNode, key)
    this.userWalk['ObjectExpression'] &&
    this.userWalk['ObjectExpression'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      const nodeArr = node.properties.slice()
      for (let index = 0; index < nodeArr.length; index++) {
        this.runByType(nodeArr[index], node, 'properties')
      }
    })
  }

  FunctionExpression(
    node: FunctionExpression,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    const nodeManager = newNodeManager<FunctionExpression>(
      node,
      parentNode,
      key
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
    key?: string
  ) {
    const nodeManager = newNodeManager<ArrowFunctionExpression>(
      node,
      parentNode,
      key
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
    key?: string
  ) {
    const nodeManager = newNodeManager<SequenceExpression>(
      node,
      parentNode,
      key
    )
    this.userWalk['SequenceExpression'] &&
    this.userWalk['SequenceExpression'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      const nodeArr = node.expressions.slice()
      for (let index = 0; index < nodeArr.length; index++) {
        this.Expression(nodeArr[index], node, 'expressions')
      }
    })
  }

  TemplateLiteral(
    node: TemplateLiteral,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    const nodeManager = newNodeManager<TemplateLiteral>(node, parentNode, key)
    this.userWalk['TemplateLiteral'] &&
    this.userWalk['TemplateLiteral'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      const nodeArr = node.quasis.slice()
      const nodeArr2 = node.expressions.slice()
      for (let index = 0; index < nodeArr.length; index++) {
        this.runByType(nodeArr[index], node, 'quasis')
      }

      for (let index = 0; index < nodeArr2.length; index++) {
        this.Expression(nodeArr2[index], node, 'expressions')
      }
    })
  }

  TemplateElement(
    node: TemplateElement,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    this.runWithEmpty(node, parentNode, key)
  }

  UpdateExpression(
    node: UpdateExpression,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    const nodeManager = newNodeManager<UpdateExpression>(node, parentNode, key)
    this.userWalk['UpdateExpression'] &&
    this.userWalk['UpdateExpression'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      this.Expression(node.argument, node, 'argument')
    })
  }

  UnaryExpression(
    node: UnaryExpression,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    const nodeManager = newNodeManager<UnaryExpression>(node, parentNode, key)
    this.userWalk['UnaryExpression'] &&
    this.userWalk['UnaryExpression'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      this.Expression(node.argument, node, 'argument')
    })
  }

  BinaryExpression(
    node: BinaryExpression,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    const nodeManager = newNodeManager<BinaryExpression>(node, parentNode, key)
    this.userWalk['BinaryExpression'] &&
    this.userWalk['BinaryExpression'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      this.Expression(node.left, node, 'left')
      this.Expression(node.right, node, 'right')
    })
  }

  LogicalExpression(
    node: LogicalExpression,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    const nodeManager = newNodeManager<LogicalExpression>(node, parentNode, key)
    this.userWalk['LogicalExpression'] &&
    this.userWalk['LogicalExpression'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      this.Expression(node.left, node, 'left')
      this.Expression(node.right, node, 'right')
    })
  }

  AssignmentExpression(
    node: AssignmentExpression,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    const nodeManager = newNodeManager<AssignmentExpression>(
      node,
      parentNode,
      key
    )
    this.userWalk['AssignmentExpression'] &&
    this.userWalk['AssignmentExpression'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      this.Pattern(node.left, node, 'left')
      this.Expression(node.right, node, 'right')
    })
  }

  AssignmentPattern(
    node: AssignmentPattern,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    const nodeManager = newNodeManager<AssignmentPattern>(node, parentNode, key)
    this.userWalk['AssignmentPattern'] &&
    this.userWalk['AssignmentPattern'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      this.Pattern(node.left, node, 'left')
      this.Expression(node.right, node, 'right')
    })
  }

  ConditionalExpression(
    node: ConditionalExpression,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    const nodeManager = newNodeManager<ConditionalExpression>(
      node,
      parentNode,
      key
    )
    this.userWalk['ConditionalExpression'] &&
    this.userWalk['ConditionalExpression'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      this.Expression(node.test, node, 'test')
      this.Expression(node.consequent, node, 'consequent')
      this.Expression(node.alternate, node, 'alternate')
    })
  }

  NewExpression(node: NewExpression, parentNode?: AcornNodeType, key?: string) {
    const nodeManager = newNodeManager<NewExpression>(node, parentNode, key)
    this.userWalk['NewExpression'] &&
    this.userWalk['NewExpression'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      this.Expression(node.callee, node, 'callee')

      if (node.arguments) {
        const nodeArr = node.arguments.slice()

        for (let index = 0; index < nodeArr.length; index++) {
          let arg = nodeArr[index]
          if (arg) {
            this.Expression(arg, node, 'arguments')
          }
        }
      }
    })
  }

  CallExpression(
    node: CallExpression,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    const nodeManager = newNodeManager<CallExpression>(node, parentNode, key)
    this.userWalk['CallExpression'] &&
    this.userWalk['CallExpression'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      this.Expression(node.callee, node, 'callee')

      if (node.arguments) {
        const nodeArr = node.arguments.slice()

        for (let index = 0; index < nodeArr.length; index++) {
          let arg = nodeArr[index]
          if (arg) {
            this.Expression(arg, node, 'arguments')
          }
        }
      }
    })
  }

  MemberExpression(
    node: MemberExpression,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    const nodeManager = newNodeManager<MemberExpression>(node, parentNode, key)
    this.userWalk['MemberExpression'] &&
    this.userWalk['MemberExpression'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      this.Expression(node.object, node, 'object')
      if (node.computed) {
        this.Expression(node.property, node, 'property')
      }
    })
  }

  ExportNamedDeclaration(
    node: ExportNamedDeclaration,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    const nodeManager = newNodeManager<ExportNamedDeclaration>(
      node,
      parentNode,
      key
    )
    this.userWalk['ExportNamedDeclaration'] &&
    this.userWalk['ExportNamedDeclaration'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      if (node.declaration) {
        if ('id' in node.declaration && node.declaration.id) {
          this.Statement(node.declaration, node, 'declaration')
        } else {
          this.Expression(node.declaration, node, 'declaration')
        }
      }

      if (node.source) {
        this.Expression(node.source, node, 'source')
      }
    })
  }

  ExportDefaultDeclaration(
    node: ExportDefaultDeclaration,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    const nodeManager = newNodeManager<ExportDefaultDeclaration>(
      node,
      parentNode,
      key
    )
    this.userWalk['ExportDefaultDeclaration'] &&
    this.userWalk['ExportDefaultDeclaration'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      if (node.declaration) {
        if ('id' in node.declaration && node.declaration.id) {
          this.Statement(node.declaration, node, 'declaration')
        } else {
          this.Expression(node.declaration, node, 'declaration')
        }
      }
    })
  }

  ExportAllDeclaration(
    node: ExportAllDeclaration,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    const nodeManager = newNodeManager<ExportAllDeclaration>(
      node,
      parentNode,
      key
    )
    this.userWalk['ExportAllDeclaration'] &&
    this.userWalk['ExportAllDeclaration'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      if (node.exported) {
        this.runByType(node.exported, node, 'exported')
      }
      this.Expression(node.source, node, 'source')
    })
  }

  ImportDeclaration(
    node: ImportDeclaration,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    const nodeManager = newNodeManager<ImportDeclaration>(node, parentNode, key)
    this.userWalk['ImportDeclaration'] &&
    this.userWalk['ImportDeclaration'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      const nodeArr = node.specifiers.slice()
      for (let index = 0; index < nodeArr.length; index++) {
        this.runByType(nodeArr[index], node, 'specifiers')
      }

      this.Expression(node.source, node, 'source')
    })
  }

  ImportExpression(
    node: ImportExpression,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    const nodeManager = newNodeManager<ImportExpression>(node, parentNode, key)
    this.userWalk['ImportExpression'] &&
    this.userWalk['ImportExpression'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      this.Expression(node.source, node, 'source')
    })
  }

  ImportSpecifier(
    node: ImportSpecifier,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    this.runWithEmpty(node, parentNode, key)
  }

  ImportDefaultSpecifier(
    node: ImportDefaultSpecifier,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    this.runWithEmpty(node, parentNode, key)
  }

  ImportNamespaceSpecifier(
    node: ImportNamespaceSpecifier,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    this.runWithEmpty(node, parentNode, key)
  }

  Identifier(node: Identifier, parentNode?: AcornNodeType, key?: string) {
    this.runWithEmpty(node, parentNode, key)
  }

  PrivateIdentifier(
    node: PrivateIdentifier,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    this.runWithEmpty(node, parentNode, key)
  }

  Literal(node: Literal, parentNode?: AcornNodeType, key?: string) {
    this.runWithEmpty(node, parentNode, key)
  }

  TaggedTemplateExpression(
    node: TaggedTemplateExpression,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    const nodeManager = newNodeManager<TaggedTemplateExpression>(
      node,
      parentNode,
      key
    )
    this.userWalk['TaggedTemplateExpression'] &&
    this.userWalk['TaggedTemplateExpression'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      this.Expression(node.tag, node, 'tag')
      this.Expression(node.quasi, node, 'quasi')
    })
  }

  ClassDeclaration(
    node: ClassDeclaration,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    const nodeManager = newNodeManager<ClassDeclaration>(node, parentNode, key)
    this.userWalk['ClassDeclaration'] &&
    this.userWalk['ClassDeclaration'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      this.Class(node)
    })
  }

  ClassExpression(
    node: ClassExpression,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    const nodeManager = newNodeManager<ClassExpression>(node, parentNode, key)
    this.userWalk['ClassExpression'] &&
    this.userWalk['ClassExpression'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      this.Class(node)
    })
  }

  Class(node: ClassExpression | ClassDeclaration) {
    if (node.id) {
      this.Pattern(node.id, node, 'id')
    }
    if (node.superClass) {
      this.Expression(node.superClass, node, 'superClass')
    }
    this.runByType(node.body, node, 'body')
  }

  ClassBody(node: ClassBody, parentNode?: AcornNodeType, key?: string) {
    const nodeManager = newNodeManager<ClassBody>(node, parentNode, key)
    this.userWalk['ClassBody'] &&
    this.userWalk['ClassBody'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      const nodeArr = node.body.slice()

      for (let index = 0; index < nodeArr.length; index++) {
        this.runByType(nodeArr[index], node, 'body')
      }
    })
  }

  MethodDefinition(
    node: MethodDefinition,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    const nodeManager = newNodeManager<MethodDefinition>(node, parentNode, key)
    this.userWalk['MethodDefinition'] &&
    this.userWalk['MethodDefinition'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      if (node.computed) {
        this.Expression(node.key, node, 'key')
      }
      if (node.value) {
        this.Expression(node.value, node, 'value')
      }
    })
  }

  PropertyDefinition(
    node: PropertyDefinition,
    parentNode?: AcornNodeType,
    key?: string
  ) {
    const nodeManager = newNodeManager<PropertyDefinition>(
      node,
      parentNode,
      key
    )
    this.userWalk['PropertyDefinition'] &&
    this.userWalk['PropertyDefinition'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      if (node.computed) {
        this.Expression(node.key, node, 'key')
      }
      if (node.value) {
        this.Expression(node.value, node, 'value')
      }
    })
  }

  Property(node: Property, parentNode?: AcornNodeType, key?: string) {
    const nodeManager = newNodeManager<Property>(node, parentNode, key)
    this.userWalk['Property'] &&
    this.userWalk['Property'](nodeManager, this.state)

    this.runByNewNode(nodeManager, () => {
      if (node.computed) {
        this.Expression(node.key, node, 'key')
      }
      if (node.value) {
        this.Expression(node.value, node, 'value')
      }
    })
  }
}
