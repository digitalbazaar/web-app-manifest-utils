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
};
