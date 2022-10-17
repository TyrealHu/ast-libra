import { AcornNodeType } from './type'
import { parse } from '../parse'
import { throwError } from '../help/error'

export default class NodeManager<T extends AcornNodeType> {
  private node: T | null
  private newNode: AcornNodeType | null
  private parentNode: AcornNodeType | null
  private key: string | null

  constructor(node: T, parentNode?: AcornNodeType, key?: string) {
    this.node = node
    this.parentNode = parentNode || null
    this.key = key || null
    this.newNode = null
  }

  getNode() {
    return this.node
  }

  /**
   * @internal
   * */
  getNewNode() {
    return this.newNode
  }

  /**
   * @param newNode The node which you want to replace with
   * @description You can call this function to replace NodeManager's node
   * */
  replaceWith(newNode: AcornNodeType) {
    if (newNode !== this.node) {
      if (!this.parentNode) {
        throwError(
          `You can't call replaceWith while the node has no parentNode`
        )
      } else if (!this.key) {
        throwError(`You can't call replaceWith while the node's key is empty`)
      } else {
        const parentNodes: AcornNodeType[] | AcornNodeType =
          // @ts-ignore
          this.parentNode[this.key]

        if (parentNodes instanceof Array) {
          const index = parentNodes.findIndex((node) => node === this.node)

          // @ts-ignore
          this.parentNode[this.key].splice(index, 1, newNode)
        } else {
          // @ts-ignore
          this.parentNode[this.key] = newNode
        }

        this.newNode = newNode
      }
    }
  }

  /**
   * @param input the code input.
   * @description You can call this function to replace NodeManager's node
   * */
  replaceWithCode(input: string) {
    const program = parse(input, {
      ecmaVersion: 'latest',
      sourceType: 'script'
    })

    if (program.body.length !== 1) {
      throwError(`The input of replaceWithCode function could only be one node`)
    }

    this.replaceWith(program.body[0])
  }

  /**
   * @description This method can support to remove this node from its parent
   * */
  remove() {
    if (!this.parentNode) {
      throwError(`You can't call remove while the node has no parentNode`)
    } else if (!this.key) {
      throwError(`You can't call remove while the node's key is empty`)
    } else {
      // @ts-ignore
      this.parentNode[this.key] = null
      this.newNode = null
    }
  }

  /**
   * @param nodes This param is the nodes which you want to insert.
   * @description This method can support to insert Nodes
   * before the NodeManager's parentNode
   * */
  insertBefore(nodes: AcornNodeType | AcornNodeType[]) {
    if (!this.parentNode) {
      throwError(`You can't call insertBefore while the node is Program`)
    } else if (!this.key) {
      throwError(`You can't call insertBefore while the node's key is empty`)
    } else {
      // @ts-ignore
      const parentNodes: AcornNodeType[] = this.parentNode[this.key]

      if (!(parentNodes instanceof Array)) {
        throwError(
          `You can't call insertBefore while the node's parentNode has an array of nodes`
        )
      }

      const index = parentNodes.findIndex((node) => node === this.node)

      if (nodes instanceof Array) {
        // @ts-ignore
        this.parentNode[this.key].splice(index, 0, ...nodes)
      } else {
        // @ts-ignore
        this.parentNode[this.key].splice(index, 0, nodes)
      }
    }
  }

  /**
   * @param nodes the nodes which you want to insert.
   * @description This method can support to insert Nodes
   * after the NodeManager's parentNode
   * */
  insertAfter(nodes: AcornNodeType | AcornNodeType[]) {
    if (!this.parentNode) {
      throwError(`You can't call insertBefore while the node is Program`)
    } else if (!this.key) {
      throwError(`You can't call insertAfter while the node's key is empty`)
    } else {
      // @ts-ignore
      const parentNodes: AcornNodeType[] = this.parentNode[this.key]

      if (!(parentNodes instanceof Array)) {
        throwError(
          `You can't call insertAfter while the node's parentNode has an array of nodes`
        )
      }

      const index = parentNodes.findIndex((node) => node === this.node)

      if (nodes instanceof Array) {
        parentNodes.splice(index + 1, 0, ...nodes)
      } else {
        parentNodes.splice(index + 1, 0, nodes)
      }
    }
  }

  /**
   * @param input the code input.
   * @description This method can support to insert Nodes
   * before the NodeManager's parentNode
   * */
  insertCodeBefore(input: string) {
    const program = parse(input, {
      ecmaVersion: 'latest',
      sourceType: 'script'
    })
    const nodes = program.body

    this.insertBefore(nodes)
  }

  /**
   * @param input the code input.
   * @description This method can support to insert Nodes
   * after the NodeManager's parentNode
   * */
  insertCodeAfter(input: string) {
    const program = parse(input, {
      ecmaVersion: 'latest',
      sourceType: 'script'
    })
    const nodes = program.body

    this.insertAfter(nodes)
  }
}
