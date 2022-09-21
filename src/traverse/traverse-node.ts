import { base } from 'acorn-walk'
import type { AcornNodeType } from '../node'
import type { TraverseWalk } from './type'

export class TraverseNode<State> {
    private node: AcornNodeType
    private walk: TraverseWalk<State>
    private state: State | undefined
    private ancestors: AcornNodeType[]

    constructor(node: AcornNodeType, walk: TraverseWalk<State>, state?: State) {
        this.node = node
        this.walk = walk
        this.state = state
        this.ancestors = []
    }

    run(node: AcornNodeType, state?: State) {
        const topNode = this.ancestors[this.ancestors.length - 1]
        if (topNode && topNode !== node) {
            this.ancestors.push(node)
        }

        // ignore the next line, because of acornjs didn't support NodeType
        // @ts-ignore
        base[node.type](node, state, this.run)

        const walkFun = this.walk[node.type]

        if (walkFun) {
            // ignore the next line, because of the walkFun node is never
            // @ts-ignore
            walkFun(node, this.state)
        }
    }

    start() {
        this.run(this.node, this.state)
    }
}
