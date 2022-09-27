import Walk from '../walk'
import type { AcornNodeType, AcornNodeTypeString } from '../node/type'
import type { TraverseWalk } from './type'

export class TraverseNode<State> {
    private node: AcornNodeType
    private walk: Walk<State>
    private state: State | undefined
    private ancestors: AcornNodeType[]

    constructor(node: AcornNodeType, walk: TraverseWalk<State>, state?: State) {
        this.node = node
        this.walk = new Walk<State>(walk, state)
        this.state = state
        this.ancestors = []
    }

    run(node: AcornNodeType, state?: State, type?: AcornNodeTypeString) {
        const nowType = type || node.type
        const topNode = this.ancestors[this.ancestors.length - 1]

        if (topNode !== node) {
            this.ancestors.push(node)
        }

        // @ts-ignore
        this.walk[nowType](node, state, this.run.bind(this))

        if (topNode !== node) {
            this.ancestors.pop()
        }
    }

    start() {
        this.run(this.node, this.state)
    }
}
