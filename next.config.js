/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'cf.bstatic.com',
            },
            {
                protocol: 'https',
                hostname: 'static51.com-hotel.com',
            },
            {
                protocol: 'https',
                hostname: 'q-xx.bstatic.com',
            },
            {
                protocol: 'https',
                hostname: 'dynamic-media-cdn.tripadvisor.com',
            }
        ],
    },
}

module.exports = nextConfig
