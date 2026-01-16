'use client'

import { Pre } from 'nextra/components'
import type { ComponentProps, FC } from 'react'
import { useState, useRef } from 'react'

export const TerminalPre: FC<ComponentProps<typeof Pre>> = (props) => {
  const [copied, setCopied] = useState(false)
  const preRef = useRef<HTMLDivElement>(null)

  const handleCopy = async () => {
    const code = preRef.current?.querySelector('code')?.textContent || ''
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Extract filename from data-filename or use default
  const filename = (props as { 'data-filename'?: string })['data-filename'] || 'terminal'

  return (
    <div className="terminal-wrapper">
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="dot dot-red"></span>
          <span className="dot dot-yellow"></span>
          <span className="dot dot-green"></span>
        </div>
        <span className="terminal-filename">{filename}</span>
        <button
          onClick={handleCopy}
          className="terminal-copy-btn"
          aria-label="Copy code"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div ref={preRef}>
        <Pre data-word-wrap="" {...props} />
      </div>
    </div>
  )
}
