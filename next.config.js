module.exports = {
  staticPageGenerationTimeout: 300,
  images: {
    domains: [
      'www.notion.so',
      'notion.so',
      'images.unsplash.com',
      'pbs.twimg.com',
      'abs.twimg.com',
      's3.us-west-2.amazonaws.com',
      'prod-files-secure.s3.us-west-2.amazonaws.com',
      'flowbite.s3.amazonaws.com',
      'a0.awsstatic.com',
      'transitivebullsh.it'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
        port: '',
        pathname: '/b23a8ea6-3b63-4164-abc6-68b872545e43/**'
      }
    ],
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [1920],
    imageSizes: [256],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  }
};
