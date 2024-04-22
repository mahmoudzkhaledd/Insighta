import nextra from 'nextra';
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            }
        ],
    },
    experimental: {

        serverComponentsExternalPackages: [
            '@react-email/components',
            '@react-email/render',
            '@react-email/tailwind'
        ]
    },
    
}; 
const nextraConfigs = nextra({ 
    theme: 'nextra-theme-docs',
    themeConfig: './theme.config.jsx',
});
export default nextraConfigs(nextConfig);
