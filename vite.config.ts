import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'
import Sitemap from 'vite-plugin-sitemap'

export default defineConfig({
  base: './',
  plugins: [
    inspectAttr(), 
    react(),
    Sitemap({
      hostname: 'https://ayn-nutrition.vercel.app',
      dynamicRoutes: [
        '/products/junior-safe',
        '/products/hair-safe',
        '/products/pro-athlete',
        '/category/creatine',
        '/legal/privacy-policy',
        '/legal/terms-and-conditions',
        '/legal/refund-policy',
        '/legal/shipping-policy',
        '/legal/contact-us'
      ]
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  preview: {
    allowedHosts: true
  },
  
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['lucide-react', 'framer-motion', 'embla-carousel-react'],
        }
      }
    }
  }
});