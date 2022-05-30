const nextConfig = {
    reactStrictMode: true,
    images: {
        loader: 'imgix',
        path: process.env.NEXT_PUBLIC_NEXT_URL,
    },
}

module.exports = nextConfig
