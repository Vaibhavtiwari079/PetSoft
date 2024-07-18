/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol:"https",
                hostname:"unsplash.com"
            },
            {
                protocol: 'https',
        hostname: 'images.app.goo.gl',
        port: '',
        pathname: '**',
            },{
                protocol:"https",
                hostname:"thumbs.dreamstime.com"
            }
        ]
    }
};

export default nextConfig;
