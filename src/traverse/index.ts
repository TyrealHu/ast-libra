import type { AcornNodeType } from '../node'
import type { TraverseWalk } from './type'
import { TraverseNode } from './traverse-node'

export default function traverse<State>(
    node: AcornNodeType,
    walk?: TraverseWalk<State>,
    state?: State
) {
    if (walk) {
        const traverseCtx = new TraverseNode<State>(node, walk, state)
        traverseCtx.start()
    }
}
