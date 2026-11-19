/*!
 * Copyright (c) 2020-2022 Digital Bazaar, Inc. All rights reserved.
 */
export const mockManifests = {
  basicManifest: {
    name: 'Mock Basic Manifest',
    icons: [
      {
        src: '/mock-image-light-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/mock-image-light-256x256.png',
        sizes: '256x256',
        type: 'image/png',
      },
    ],
    theme_color: '#ffffff',
    background_color: '#ffffff',
    display: 'standalone'
  },
  fullManifest: {
    name: 'Mock Full Manifest',
    icons: [
      {
        src: '/mock-image-light-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        color_scheme: 'light'
      },
      {
        src: '/mock-image-dark-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        color_scheme: 'dark'
      },
      {
        src: '/mock-image-light-256x256.png',
        sizes: '256x256',
        type: 'image/png',
        color_scheme: 'light'
      },
      {
        src: '/mock-image-dark-256x256.png',
        sizes: '256x256',
        type: 'image/png',
        color_scheme: 'dark'
      }
    ],
    theme_color: '#ffffff',
    background_color: '#ffffff',
    display: 'standalone'
  },
  noIconsManifest: {
    name: 'Mock No Icons Manifest',
    theme_color: '#ffffff',
    background_color: '#ffffff',
    display: 'standalone'
  },
  anySizeManifest: {
    name: 'Mock Any Size Manifest',
    icons: [
      {src: '/mock-image.svg', sizes: 'any', type: 'image/svg+xml'}
    ]
  },
  sizeListManifest: {
    name: 'Mock Size List Manifest',
    icons: [
      {src: '/mock-image-48x48.png', sizes: '48x48 96x96', type: 'image/png'}
    ]
  },
  anyAndExactManifest: {
    name: 'Mock Any And Exact Manifest',
    icons: [
      {src: '/mock-image.svg', sizes: 'any', type: 'image/svg+xml'},
      {
        src: '/mock-image-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      }
    ]
  },
};
