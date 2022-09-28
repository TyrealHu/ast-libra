import { AcornNodeType } from './type'
import { parse } from '../parse'
import { throwError } from '../help/error'

export default class NodeManager {
    private node: AcornNodeType | null
    private parentNode: AcornNodeType | null
    private key: string | null
    private index: number | null

    constructor(node: AcornNodeType, parentNode?: AcornNodeType, key?: string, index?: number) {
        this.node = node
        this.parentNode = parentNode || null
        this.key = key || null
        this.index = index || null
    }

    /**
     * @param newNode The node which you want to replace with
     * @description You can use this function to replace NodeManager's node
     * */
    replaceWith(newNode: AcornNodeType) {
        if (newNode !== this.node) {
            this.node = newNode
        }
    }

    /**
     * @param input the code input.
     * @description You can use this function to replace NodeManager's node
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
        this.node = null
    }

    /**
     * @param nodes This param is the nodes which you want to insert.
     * @description This method can support to insert Nodes
     * before the NodeManager's parentNode
     * */
    insertBefore(nodes: AcornNodeType | AcornNodeType[]) {
        if (!this.parentNode) {
            throwError(`You can't use insertBefore while the node is Program`)
        } else if (!this.key || !this.index) {
            throwError(
                `You can't use insertBefore while the node's parentNode has an array of nodes`
            )
        } else {
            // @ts-ignore
            const parentNodes: AcornNodeType[] = this.parentNode[this.key]

            if (nodes instanceof Array) {
                parentNodes.splice(this.index, 0, ...nodes)
            } else {
                parentNodes.splice(this.index, 0, nodes)
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
            throwError(`You can't use insertBefore while the node is Program`)
        } else if (!this.key || !this.index) {
            throwError(
                `You can't use insertBefore while the node's parentNode has an array of nodes`
            )
        } else {
            // @ts-ignore
            const parentNodes: AcornNodeType[] = this.parentNode[this.key]

            if (nodes instanceof Array) {
                parentNodes.splice(this.index + 1, 0, ...nodes)
            } else {
                parentNodes.splice(this.index + 1, 0, nodes)
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
