// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import { VitePWA } from 'vite-plugin-pwa'; // Correcta importación

// export default defineConfig({
//   plugins: [
//     react(),
//     VitePWA({
//       registerType: 'autoUpdate',
//       devOptions: {
//         enabled: true,
//       },
//       manifest: {
//         name: 'WineClub',
//         short_name: 'WineClub',
//         description: 'Wine Club PWA App',
//         theme_color: '#ffffff',
//         icons: [
//           {
//             src: 'favicon.ico',
//             sizes: '192x192',
//             type: 'image/png',
//           },
//           {
//             src: 'favicon.ico',
//             sizes: '512x512',
//             type: 'image/png',
//           },
//         ],
//       },
//     }),
//   ],
// });
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        display: 'standalone',
        display_override: ['window-controls-overlay'],
        includeAssets: ["favicon.ico", "apple-touch-icon.png", "assets/*"],
        start_url: '/',
        name: 'WineClub',
        short_name: 'WineClub',
        description: 'Wine Club PWA App',
        background_color: "#ffffff",
        theme_color: '#ffffff',
        icons: [
          {
            src: "icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ],
        screenshots: [
          {
            src: "screenshots/wineclub-desktop.png",
            sizes: "1280x720",
            type: "image/png",
            form_factor: "wide"
          },
          {
            src: "screenshots/wineclub-mobile.png",
            sizes: "412x732",
            type: "image/png",
            form_factor: "narrow"
          }
        ]
      },
      workbox: {
        // defining cached files formats
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webmanifest}"],
      }
    })
  ]
})