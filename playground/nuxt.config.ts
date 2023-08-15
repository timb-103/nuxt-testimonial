export default defineNuxtConfig({
  modules: ["../src/module", "nuxt-simple-css"],
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
