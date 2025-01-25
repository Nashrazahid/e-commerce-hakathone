/** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'cdn.sanity.io',
          pathname: '/images/**',
        },
      ],
    },
  };
  
  export default nextConfig;
  