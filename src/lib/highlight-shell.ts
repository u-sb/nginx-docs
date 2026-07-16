// Build-time shell "highlighter" — same simple scheme as the design mockup.
// Used by the homepage install tabs and the /install/ page terminal cards.
const CMD_WORDS = new Set(['sudo', 'apt', 'apt-get', 'curl', 'echo', 'tee', 'docker', 'git', 'cd', 'mkdir', 'systemctl', 'rsync']);
const TOKEN_RE = /(\s+)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(https?:\/\/[^\s"']+|rsync:\/\/[^\s"']+)|(--?[A-Za-z][\w-]*)|([A-Za-z][\w.-]*:)|([^\s]+)/g;

function esc(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function highlightShell(text: string): string {
    return text
        .split('\n')
        .map((line) => {
            if (line.trim().startsWith('#')) return `<div class="text-comment">${esc(line)}</div>`;
            if (line.trim() === '') return '<div> </div>';
            let out = '';
            let m: RegExpExecArray | null;
            TOKEN_RE.lastIndex = 0;
            while ((m = TOKEN_RE.exec(line))) {
                const t = esc(m[0]);
                if (m[1]) out += t;
                else if (m[2]) out += `<span class="text-[#b5e8a0]">${t}</span>`;
                else if (m[3]) out += `<span class="text-[#7cc4ff] underline">${t}</span>`;
                else if (m[4]) out += `<span class="text-[#e0a45c]">${t}</span>`;
                else if (m[5]) out += `<span class="text-[#7cc4ff]">${t}</span>`;
                else out += CMD_WORDS.has(m[0]) ? `<span class="text-acc">${t}</span>` : t;
            }
            return `<div>${out}</div>`;
        })
        .join('');
}
