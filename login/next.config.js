/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites () {
    return process.env.NODE_ENV === "production" ? [
        {
          source: '/server/:path*',
          destination: 'http://localhost:5000/:path*' // Leave it to nginx
        }
    ] : [
      {
        source: '/server/:path*',
        destination: 'http://localhost:1337/:path*' // Proxy to Backend
      }
    ]
  }
}

module.exports = nextConfig
