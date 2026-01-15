import nextra from 'nextra'

const withNextra = nextra({
  mdxOptions: {
    rehypePrettyCodeOptions: {
      theme: 'dracula-soft'
    }
  }
})

export default withNextra({
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true
  }
})
