import { parse, traverse, generate } from '..'

it('test', () => {

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
    ExportNamedDeclaration(path: any) {
      path.replaceWith(node2.body[0])
    }
  })

  expect(generate(node.body[0]).trim()).toBe(`import a from './index.ts';`)
  expect(generate(node.body[1]).trim()).toBe([
    'module.exports = {',
    '  c: 1',
    '};'
  ].join('\n'))
  /**
   * node is
   * import a from './index.ts'
   * module.exports = { c: 1 }
   * export default function() {
   *  console.log(11)
   * }
   * */
})
