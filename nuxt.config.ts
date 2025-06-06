
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Epps!'
    }
  },

  compatibilityDate: '2024-11-01',

  css: ['~/assets/css/main.css'],

  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@pinia/nuxt'
  ],

  runtimeConfig: {
    public: {
      appName: 'Epps!',
      cryptKey: process.env.CRYPT_KEY,
      cryptIv: process.env.CRYPT_IV
    }
  },

  sourcemap: {
    server: false,
    client: true
  }
})