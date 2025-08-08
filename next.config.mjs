/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    webpack: (config) => {
        // Configure webpack to handle game assets
        config.module.rules.push({
            test: /\.(png|jpg|gif|json)$/i,
            type: 'asset/resource'
        });
        return config;
    },
    // Configure output for Vercel
    output: 'standalone',
    // Disable image optimization for game assets
    images: {
        unoptimized: true
    },
    // Configure base path for assets
    basePath: '',
    // Disable powered by header
    poweredByHeader: false,
    // Enable static exports
    distDir: '.next',
    // Configure headers for CORS
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    { key: 'Access-Control-Allow-Origin', value: '*' }
                ]
            }
        ];
    }
}

export default nextConfig;