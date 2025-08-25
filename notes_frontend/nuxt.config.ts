/**
 * Nuxt configuration for Notes app
 * - Light, minimal, modern UI
 * - CORS open for preview environment
 */
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Notes',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#ffffff' },
        { name: 'description', content: 'A minimal, modern personal notes app.' }
      ],
      link: [
        { rel: 'icon', href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><circle cx=%2250%22 cy=%2250%22 r=%2240%22 fill=%22%23fbc02d%22/></svg>' }
      ]
    }
  },
  css: ['~/assets/styles.css'],
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  nitro: {
    routeRules: {
      "/**": {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    },
  },
  vite: {
    server: {
      host: '0.0.0.0',
      allowedHosts: true,
      port: 3000,
    },
  },
})
