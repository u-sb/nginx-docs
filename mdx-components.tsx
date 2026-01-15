import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs'
import { Pre } from 'nextra/components'
import type { ComponentProps, FC } from 'react'

const CustomPre: FC<ComponentProps<typeof Pre>> = (props) => {
  return <Pre data-copy="" data-word-wrap="" {...props} />
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useMDXComponents(components: any = {}) {
  return getDocsMDXComponents({
    ...components,
    pre: CustomPre
  })
}
