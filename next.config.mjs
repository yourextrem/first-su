/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    webpack: (config) => {
        // Konfigurasi untuk asset game
        config.module.rules.push({
            test: /\.(png|jpg|gif|json)$/i,
            type: 'asset/resource'
        });
        return config;
    },
    // Konfigurasi untuk production
    distDir: '.next',
    // Disable image optimization
    images: {
        unoptimized: true
    },
    // Asset prefix untuk production
    assetPrefix: process.env.NODE_ENV === 'production' ? 'https://first-su-pilek.vercel.app' : '',
    // Konfigurasi untuk static files
    basePath: '',
    // Output sebagai standalone
    output: 'standalone',
    // Disable powered by header
    poweredByHeader: false
};

export default nextConfig;