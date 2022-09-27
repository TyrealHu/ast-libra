import { AcornNodeType } from './type'
import { parse } from '../parse'

export default class NodeManager {
    private node: AcornNodeType
    // @ts-ignore
    private parentNode?: AcornNodeType
    // @ts-ignore
    private key?: string

    constructor(node: AcornNodeType, parentNode?: AcornNodeType, key?: string) {
        this.node = node
        this.parentNode = parentNode
        this.key = key
    }

    replaceWith(newNode: AcornNodeType) {
        if (newNode !== this.node) {
            // todo 在这里替换了node之后，要通知walk
            this.node = newNode
        }
    }

    replaceWithCode(_code: string) {}

    remove() {
        // todo 删除这个node之后也得通知walk
    }

    insertBefore(_nodes: AcornNodeType | AcornNodeType[]) {
        // todo 在这里得给parent通知需要给这个node之前插入node
    }

    insertAfter(_nodes: AcornNodeType | AcornNodeType[]) {
        // todo 在这里得给parent通知需要给这个node之后插入node
    }

    /**
     * @param input This is the code input.
     *
     * @description This method can only support insert Statement Node
     * before the NodeManager's parentNode
     * */
    insertCodeBefore(input: string) {
        // todo 在这里得给parent通知需要给这个node之前插入node
        const program = parse(input, {
            ecmaVersion: 'latest',
            sourceType: 'script'
        })
        // @ts-ignore
        const nodes = program.body
    }

    /**
     * @param input This is the code input.
     *
     * @description This method can only support insert Statement Node
     * after the NodeManager's parentNode
     * */
    insertCodeAfter(input: string) {
        if (!this.parentNode) {
        }
        // todo 在这里得给parent通知需要给这个node之后插入node
        const program = parse(input, {
            ecmaVersion: 'latest',
            sourceType: 'script'
        })
        // @ts-ignore
        const nodes = program.body
    }
}
