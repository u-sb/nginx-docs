import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs'
import { TerminalPre } from './src/components/terminal-code'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useMDXComponents(components: any = {}) {
  return getDocsMDXComponents({
    ...components,
    pre: TerminalPre
  })
}
