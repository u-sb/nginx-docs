'use client'

import HomePage from '../components/home'
import { Tabs } from 'nextra/components'
import { useState } from 'react'

const codeBlocks = {
  debian: `# Install extrepo
sudo apt update
sudo apt install extrepo -y

# Enable n.wtf repo
sudo extrepo enable n.wtf

# Install Latest Nginx
sudo apt update
sudo apt install nginx-extras -y`,

  ubuntu: `# Install required software
sudo apt install -y lsb-release ca-certificates apt-transport-https curl gnupg dpkg

# Download PGP Key
curl -sSL https://n.wtf/public.key | sudo bash -c 'gpg --dearmor > /usr/share/keyrings/n.wtf.gpg'

# Add repo
sudo bash -c 'echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/n.wtf.gpg] https://mirror-cdn.xtom.com/sb/nginx/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/n.wtf.list'

# Update system
sudo apt update

# Install Latest Nginx
sudo apt install nginx-extras -y`,

  docker: `docker run --name nginx --net host --restart always \\
  -v $HOME/nginx-config:/usr/src/docker-nginx/conf:ro \\
  -d ghcr.io/u-sb/nginx`,

  compose: `# Clone our repo
git clone https://github.com/u-sb/nginx-docker

# Change directory to nginx-docker folder
cd nginx-docker

# Run docker-compose
docker compose pull
docker compose up -d`
}

function highlightCode(code: string) {
  return code
    .split('\n')
    .map(line => {
      if (line.startsWith('#')) {
        return `<span class="code-comment">${line}</span>`
      }
      return line
        .replace(/\b(sudo|apt|curl|echo|git|cd|docker)\b/g, '<span class="code-keyword">$1</span>')
        .replace(/(-y|-d|-v|--name|--net|--restart|install|update|enable|clone|pull|up|run|compose)\b/g, '<span class="code-flag">$1</span>')
    })
    .join('\n')
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="code-block-wrapper">
      <button
        onClick={handleCopy}
        className="code-copy-btn"
        aria-label="Copy code"
      >
        {copied ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        )}
      </button>
      <pre className="code-block">
        <code dangerouslySetInnerHTML={{ __html: highlightCode(code) }} />
      </pre>
      <style jsx>{`
        .code-block-wrapper {
          position: relative;
        }
        .code-copy-btn {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          padding: 0.5rem;
          border-radius: 0.5rem;
          background: rgba(255, 255, 255, 0.05);
          color: #6b7280;
          border: 1px solid rgba(255, 255, 255, 0.1);
          cursor: pointer;
          opacity: 0;
          transition: all 0.15s;
          z-index: 10;
        }
        .code-block-wrapper:hover .code-copy-btn {
          opacity: 1;
        }
        .code-copy-btn:hover {
          background: rgba(236, 72, 153, 0.15);
          border-color: rgba(236, 72, 153, 0.3);
          color: #f472b6;
        }
        .code-block {
          white-space: pre-wrap;
          word-wrap: break-word;
          overflow-wrap: break-word;
          padding: 1.5rem 2rem;
          font-size: 0.875rem;
          line-height: 1.6;
          color: #e6edf3;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          margin: 0;
          background: transparent;
        }
        .code-block :global(.code-comment) {
          color: #6b7280;
        }
        .code-block :global(.code-keyword) {
          color: #f9a8d4;
        }
        .code-block :global(.code-flag) {
          color: #93c5fd;
        }
      `}</style>
    </div>
  )
}

export default function HomePageClient() {
  return (
    <main className="x:mx-auto x:max-w-(--nextra-content-width) x:px-6">
      <HomePage />
      <section className="quick-install-section">
        <h2>Quick Install</h2>
        <div className="install-card install-tabs">
          <Tabs items={['Debian', 'Ubuntu', 'Docker', 'Docker Compose']}>
            <Tabs.Tab>
              <CodeBlock code={codeBlocks.debian} />
            </Tabs.Tab>
            <Tabs.Tab>
              <CodeBlock code={codeBlocks.ubuntu} />
            </Tabs.Tab>
            <Tabs.Tab>
              <CodeBlock code={codeBlocks.docker} />
            </Tabs.Tab>
            <Tabs.Tab>
              <CodeBlock code={codeBlocks.compose} />
            </Tabs.Tab>
          </Tabs>
        </div>
        <style jsx>{`
          .quick-install-section {
            margin-top: 4rem;
            margin-bottom: max(150px, 20vh);
            text-align: center;
          }
          .quick-install-section h2 {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 2rem;
            color: #111827;
            letter-spacing: -0.025em;
          }
          :global(.dark) .quick-install-section h2 {
            color: #f9fafb;
          }
          .install-card {
            max-width: 800px;
            margin: 0 auto;
            text-align: left;
            background: #0d1117;
            border-radius: 1rem;
            overflow: hidden;
            border: 1px solid rgba(236, 72, 153, 0.15);
          }
          :global(.light) .install-card {
            background: #161b22;
            border-color: rgba(236, 72, 153, 0.2);
          }
          .install-tabs :global([role="tablist"]) {
            border-bottom: 1px solid rgba(236, 72, 153, 0.2);
            padding: 0.75rem 1.5rem 0;
            gap: 0;
          }
          .install-tabs :global([role="tab"]) {
            color: #6b7280;
            padding: 0.75rem 1.25rem;
            font-size: 0.9rem;
            font-weight: 500;
            transition: color 0.15s;
            border-bottom: 2px solid transparent;
            margin-bottom: -1px;
          }
          .install-tabs :global([role="tab"]:hover) {
            color: #f472b6;
          }
          .install-tabs :global([role="tab"][data-selected="true"]),
          .install-tabs :global([role="tab"][aria-selected="true"]) {
            color: #ec4899;
            border-bottom-color: #ec4899;
          }
        `}</style>
      </section>
    </main>
  )
}
