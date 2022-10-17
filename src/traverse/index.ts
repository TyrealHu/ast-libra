import type { AcornNodeType } from '../node/type'
import type { TraverseWalk } from './type'
import { TraverseNode } from './traverse-node'

export default function traverse<State>(
  node: AcornNodeType,
  walk?: TraverseWalk<State>,
  state?: State
): AcornNodeType {
  const traverseCtx = new TraverseNode<State>(node, walk || {}, state)
  traverseCtx.start()

  return traverseCtx.getNode()
}
