export default defineNuxtConfig({
  modules: [
    '@nuxthub/core',
    '@nuxt/ui',
    'nuxt-auth-utils',
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@pinia/colada-nuxt'
  ],
  devtools: {
    enabled: true
  },
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2024-07-30',
  hub: {
    database: true
  },
  // nuxt.config.ts
  app: {
    head: {
      link: [
        // Favicon
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        
        // Apple Touch Icons
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon-180x180.png' },
        { rel: 'apple-touch-icon', sizes: '152x152', href: '/apple-touch-icon-152x152.png' },
        { rel: 'apple-touch-icon', sizes: '120x120', href: '/apple-touch-icon-120x120.png' },
        { rel: 'apple-touch-icon', sizes: '76x76', href: '/apple-touch-icon-76x76.png' }
      ],
      meta: [
        // iOS Status Bar Style
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-title', content: 'LOUIE TODO' },
      ]
    }
  },
  // Development config
  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
        commaDangle: 'never'
      }
    }
  }
})
