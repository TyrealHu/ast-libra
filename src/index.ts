import { parse as _parse } from 'acorn'
import traverse from './traverse'
import { Program } from './node/type'

traverse(
    _parse(
        `
import b from './test.js'
export const a = 1
export default function() {
  console.log(11111)
}
`,
        {
            ecmaVersion: 'latest',
            sourceType: 'module'
        }
    ) as Program,
    {
        ExportDefaultDeclaration: (node, state) => {
            console.log(node)
            console.log(state)
        }
    }
)
