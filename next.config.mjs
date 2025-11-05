/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'framerusercontent.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'shilpiahuja.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'assets0.mirraw.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'media.samyakk.in',
        port: '',
        pathname: '**',
      },
    ],
  },
}

export default nextConfig