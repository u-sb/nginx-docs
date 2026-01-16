'use client'

import HomePage from '../components/home'
import { useState } from 'react'
import Image from 'next/image'

type InstallMethod = 'debian' | 'oneline' | 'deb822' | 'docker' | 'compose'

const installMethods = [
  { id: 'debian' as const, label: 'Debian', icon: '/debian.svg' },
  { id: 'oneline' as const, label: 'One-Line', icon: '/ubuntu.svg' },
  { id: 'deb822' as const, label: 'DEB822', icon: '/ubuntu.svg' },
  { id: 'docker' as const, label: 'Docker', icon: '/docker.svg' },
  { id: 'compose' as const, label: 'Compose', icon: '/docker.svg' },
]

const codeBlocks: Record<InstallMethod, string> = {
  debian: `# Install extrepo
sudo apt update
sudo apt install extrepo -y

# Enable n.wtf repo
sudo extrepo enable n.wtf

# Install the latest Nginx
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

function CodeBlock({ code, filename }: { code: string; filename?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="code-block-wrapper">
      <div className="code-block-header">
        <div className="code-block-dots">
          <span className="dot dot-red"></span>
          <span className="dot dot-yellow"></span>
          <span className="dot dot-green"></span>
        </div>
        <span className="code-block-filename">{filename || 'terminal'}</span>
        <button
          onClick={handleCopy}
          className="code-copy-btn"
          aria-label="Copy code"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="code-block">
        <code dangerouslySetInnerHTML={{ __html: highlightCode(code) }} />
      </pre>
    </div>
  )
}

export default function HomePageClient() {
  const [selected, setSelected] = useState<InstallMethod>('debian')

  return (
    <main className="x:mx-auto x:max-w-(--nextra-content-width) x:px-6">
      <HomePage />
      <section className="quick-install-section">
        <h2>Quick Install</h2>
        <div className="install-methods-grid">
          {installMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelected(method.id)}
              className={`install-method-card ${selected === method.id ? 'active' : ''}`}
            >
              <span className="install-method-icon">
                <Image
                  src={method.icon}
                  alt={method.label}
                  width={24}
                  height={24}
                />
              </span>
              <span className="install-method-label">{method.label}</span>
            </button>
          ))}
        </div>
        <div className="install-card">
          <CodeBlock code={codeBlocks[selected]} />
        </div>
      </section>
    </main>
  )
}
