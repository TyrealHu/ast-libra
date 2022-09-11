import { parse as _parse } from 'acorn'
import { ancestor as _ancestor } from 'acorn-walk'
import { Traverse as _T } from './traverse'


_ancestor(_parse(`
import b from './test.js'
export const a = 1
export default function() {
  console.log(11111)
}
`, {
    ecmaVersion: 'latest',
    sourceType: 'module'
  }), {
    ExportDefaultDeclaration: (node, state) => {
      console.log(node)
      console.log(state)
    }
  }
)
