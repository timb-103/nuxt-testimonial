export default defineNuxtConfig({
  modules: ["nuxt-testimonial", "nuxt-simple-css"], // "../src/module"
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
