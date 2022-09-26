import Walk from '../walk'
import type { AcornNodeType, AcornNodeTypeString } from '../node'
import type { TraverseWalk } from './type'

export class TraverseNode<State> {
    private node: AcornNodeType
    private walk: TraverseWalk<State>
    private state: State | undefined
    private ancestors: AcornNodeType[]

    constructor(node: AcornNodeType, walk: TraverseWalk<State>, state?: State) {
        debugger
        this.node = node
        this.walk = walk
        this.state = state
        this.ancestors = []
    }

    run(node: AcornNodeType, state?: State, type?: AcornNodeTypeString) {
        const nowType = type || node.type
        const topNode = this.ancestors[this.ancestors.length - 1]
        debugger
        if (topNode !== node) {
            this.ancestors.push(node)
        }

        // ignore the next line, because of acornjs didn't support NodeType
        // @ts-ignore
        Walk[nowType](node, state, this.run.bind(this))

        const walkFun = this.walk[nowType]

        if (walkFun) {
            // ignore the next line, because of the walkFun node is never
            // @ts-ignore
            walkFun(node, this.state)
        }

        if (topNode !== node) {
            this.ancestors.pop()
        }
    }

    start() {
        this.run(this.node, this.state)
    }
}
