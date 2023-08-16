// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["nuxt-testimonial", "nuxt-simple-css"],
  nuxtSimpleCss: {
    accent: "#000",
  },
});
