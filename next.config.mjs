/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(png|jpg|gif)$/i,
            type: 'asset/resource'
        });
        return config;
    },
    images: {
        unoptimized: true
    },
    // Disable trailingSlash
    trailingSlash: false,
    // Enable static exports
    output: 'standalone',
    // Disable server components
    experimental: {
        serverActions: false
    }
};

export default nextConfig;