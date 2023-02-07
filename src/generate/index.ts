import { generate as astringGenerate } from 'astring'
import type { AcornNodeType } from '@node/type'
import type { Generator } from 'astring'
import type { SourceMapGenerator } from 'source-map'

interface GenerateOptions {
  /**
   * If present, source mappings will be written to the generator.
   */
  sourceMap?: SourceMapGenerator
  /**
   * String to use for indentation, defaults to `"␣␣"`.
   */
  indent?: string
  /**
   * String to use for line endings, defaults to `"\n"`.
   */
  lineEnd?: string
  /**
   * Indent level to start from, defaults to `0`.
   */
  startingIndentLevel?: number
  /**
   * Generate comments if `true`, defaults to `false`.
   */
  comments?: boolean
  /**
   * Custom code generator logic.
   */
  generator?: Generator
}

export default function generate(
  node: AcornNodeType,
  options?: GenerateOptions
): string {
  return astringGenerate(node, options)
}
