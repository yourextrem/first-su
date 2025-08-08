/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Asset prefix for production
    assetPrefix: process.env.NODE_ENV === 'production' ? '/' : '',
    // Webpack config for Phaser
    webpack: (config) => {
        config.externals = [...(config.externals || []), { canvas: 'canvas' }];
        return config;
    },
    // Image optimization settings
    images: {
        unoptimized: true // For Phaser sprite sheets
    },
    // CORS headers
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    { key: 'Access-Control-Allow-Origin', value: '*' }
                ],
            },
        ]
    },
};

export default nextConfig;