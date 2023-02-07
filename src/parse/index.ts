import { Parser } from 'acorn'
import tsPlugin from 'acorn-typescript'
import type { Options } from 'acorn'
import { AcornNodeTypeMap } from '@node/type'

export default function parse(
  input: string,
  options: Options & {
    typescript?: {
      dts: boolean
    }
  }
): AcornNodeTypeMap['Program'] {
  const parser = Parser

  if (options.typescript) {
    parser.extend(
      tsPlugin({
        dts: options.typescript.dts
      })
    )
  }

  return parser.parse(input, options) as AcornNodeTypeMap['Program']
}
