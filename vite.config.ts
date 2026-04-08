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
        '/product/junior-safe',
        '/product/hair-safe',
        '/product/pro-athlete',
        '/privacy-policy',
        '/terms-and-conditions',
        '/refund-policy',
        '/shipping-policy',
        '/contact-us'
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
  }
});