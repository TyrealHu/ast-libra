# ast-libra

You can use this module to operate JavaScript AST in browser or node env

~~~typescript
import { parse, traverse, generate } from 'ast-libra'

const node = parse(`
import a from './index.ts'
export const b = 1
export default function() {
  console.log(11)
}
`, {
  ecmaVersion: 'latest',
  sourceType: 'module'
})

const node2 = parse(`
module.exports = { c: 1 }
`, {
  ecmaVersion: 'latest',
  sourceType: 'script'
})

traverse(node, {
  ExportNamedDeclaration(path) {
    path.replaceWith(node2.body[0])
  }
})

generate(node)
/**
 * node is 
 * import a from './index.ts'
 * module.exports = { c: 1 }
 * export default function() {
 *  console.log(11)
 * }
 * */

~~~
