import type { AcornNodeType } from '../node'
import type { TraverseWalk } from './type'
import { TraverseNode } from './traverse-node'

export function traverse<State>(node?: AcornNodeType, walk?: TraverseWalk<State>, state?: State) {
    if (node && walk) {
        const traverseCtx = new TraverseNode<State>(node, walk, state)
        traverseCtx.start()
    }
}
