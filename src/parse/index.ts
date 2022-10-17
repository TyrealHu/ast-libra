import { parse as acornParse } from 'acorn'
import type { Options } from 'acorn'
import { AcornNodeTypeMap } from '../node/type'

export default function parse(
  input: string,
  options: Options
): AcornNodeTypeMap['Program'] {
  // @ts-ignore
  return acornParse(input, options)
}
