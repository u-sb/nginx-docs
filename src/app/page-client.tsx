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

  oneline: `# Install required software
sudo apt install -y lsb-release ca-certificates apt-transport-https curl gnupg dpkg

# Download and import GPG Key
curl -sSL https://n.wtf/public.key | sudo bash -c 'gpg --dearmor > /usr/share/keyrings/n.wtf.gpg'

# Add repo
sudo bash -c 'echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/n.wtf.gpg] https://mirror-cdn.xtom.com/sb/nginx/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/n.wtf.list'

# Update system
sudo apt update

# Install the latest Nginx
sudo apt install nginx-extras -y`,

  deb822: `# Install required software
sudo apt install -y lsb-release ca-certificates apt-transport-https curl gnupg dpkg

# Download and import GPG Key
curl -sSL https://n.wtf/public.key | sudo bash -c 'gpg --dearmor > /usr/share/keyrings/n.wtf.gpg'

# Add repo
sudo bash -c 'cat > /etc/apt/sources.list.d/n.wtf.sources << EOF
Components: main
Architectures: $(dpkg --print-architecture)
Suites: $(lsb_release -cs)
Types: deb
URIs: https://mirror-cdn.xtom.com/sb/nginx/
Signed-By: /usr/share/keyrings/n.wtf.gpg
EOF'

# Update system
sudo apt update

# Install the latest Nginx
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
          <Tabs items={['Debian', 'Debian / Ubuntu One-Line', 'Debian / Ubuntu DEB822', 'Docker', 'Docker Compose']}>
            <Tabs.Tab>
              <CodeBlock code={codeBlocks.debian} />
            </Tabs.Tab>
            <Tabs.Tab>
              <CodeBlock code={codeBlocks.oneline} />
            </Tabs.Tab>
            <Tabs.Tab>
              <CodeBlock code={codeBlocks.deb822} />
            </Tabs.Tab>
            <Tabs.Tab>
              <CodeBlock code={codeBlocks.docker} />
            </Tabs.Tab>
            <Tabs.Tab>
              <CodeBlock code={codeBlocks.compose} />
            </Tabs.Tab>
          </Tabs>
        </div>
      </section>
    </main>
  )
}
