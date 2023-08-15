export default defineNuxtConfig({
  modules: ["nuxt-testinmonial", "nuxt-simple-css"],
  devtools: { enabled: false },
  vite: {
    server: {
      fs: {
        strict: false,
      },
    },
  },
  css: ["@/assets/css/global.css"],
  nuxtSimpleCSS: {
    accent: "#000",
  },
});
