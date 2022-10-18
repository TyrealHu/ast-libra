import Walk from './walk'
import type { AcornNodeType } from '../node/type'
import type { TraverseWalk } from './type'

export class TraverseNode<State> {
  private node: AcornNodeType
  private walk: Walk<State>
  constructor(node: AcornNodeType, walk: TraverseWalk<State>, state?: State) {
    this.node = node
    this.walk = new Walk<State>(walk, state)
  }

  start() {
    this.walk.runByType(this.node)
  }

  getNode() {
    return this.node
  }
}
