import{_ as t,r as o,a as r,d as e,w as a,F as i,b as s,e as n,o as p}from"./app.fef5021b.js";const d={},u=s("h3",{id:"as-easy-as-1-2-3",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#as-easy-as-1-2-3","aria-hidden":"true"},"#"),n(" As Easy as 1, 2, 3")],-1),y=s("div",{class:"language-bash ext-sh"},[s("pre",{class:"shiki",style:{"background-color":"#22272e"}},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#768390"}},"# Install required software")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#ADBAC7"}},"apt install wget gnupg apt-transport-https lsb-release ca-certificates -y")]),n(`
`),s("span",{class:"line"}),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#768390"}},"# Download PGP Key")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#ADBAC7"}},"wget -O /usr/share/keyrings/nginx.u.sb.asc https://u.sb/nginx.key")]),n(`
`),s("span",{class:"line"}),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#768390"}},"# Add repo")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6CB6FF"}},"echo"),s("span",{style:{color:"#ADBAC7"}}," "),s("span",{style:{color:"#96D0FF"}},'"deb [signed-by=/usr/share/keyrings/nginx.u.sb.asc] https://mirror-cdn.xtom.com/sb/nginx/ $(lsb_release -sc) main"'),s("span",{style:{color:"#ADBAC7"}}," "),s("span",{style:{color:"#F47067"}},">"),s("span",{style:{color:"#ADBAC7"}}," /etc/apt/sources.list.d/nginx.u.sb.list")]),n(`
`),s("span",{class:"line"}),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#768390"}},"# Update system")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#ADBAC7"}},"apt update")]),n(`
`),s("span",{class:"line"}),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#768390"}},"# Install Latest Nginx")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#ADBAC7"}},"apt install nginx-extras -y")]),n(`
`),s("span",{class:"line"})])])],-1),g=s("div",{class:"language-bash ext-sh"},[s("pre",{class:"shiki",style:{"background-color":"#22272e"}},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#ADBAC7"}},"docker run --name nginx --net host --restart always -v $HOME/nginx-config:/usr/src/docker-nginx/conf:ro -d ghcr.io/nginx-io/nginx")]),n(`
`),s("span",{class:"line"})])])],-1),h=s("div",{class:"language-bash ext-sh"},[s("pre",{class:"shiki",style:{"background-color":"#22272e"}},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#768390"}},"# Clone our repo")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#ADBAC7"}},"git clone https://github.com/u-sb/nginx-docker")]),n(`
`),s("span",{class:"line"}),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#768390"}},"# Change directory to nginx-docker folder")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#6CB6FF"}},"cd"),s("span",{style:{color:"#ADBAC7"}}," nginx-docker")]),n(`
`),s("span",{class:"line"}),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#768390"}},"# Run docker-compose")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#ADBAC7"}},"docker-compose pull")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#ADBAC7"}},"docker-compose up -d")]),n(`
`),s("span",{class:"line"})])])],-1);function x(_,A){const l=o("CodeGroupItem"),c=o("CodeGroup");return p(),r(i,null,[u,e(c,null,{default:a(()=>[e(l,{title:"Debian / Ubuntu",active:""},{default:a(()=>[y]),_:1}),e(l,{title:"Docker"},{default:a(()=>[g]),_:1}),e(l,{title:"Docker Compose"},{default:a(()=>[h]),_:1})]),_:1})],64)}var m=t(d,[["render",x]]);export{m as default};
