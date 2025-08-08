/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false, // Disable strict mode for Phaser
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(png|jpg|gif)$/i,
            type: 'asset/resource'
        });
        return config;
    },
    // Enable static exports
    output: 'export',
    // Disable image optimization
    images: {
        unoptimized: true
    },
    // Disable server components
    experimental: {
        appDir: true
    }
};

export default nextConfig;