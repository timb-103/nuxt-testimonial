import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addComponent,
  addImports,
  addServerHandler,
} from "@nuxt/kit";

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-testimonial",
    configKey: "nuxtTestimonial",
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);

    // masonry plugin
    addPlugin(resolve("./runtime/vue-masonry"));

    // composables
    addImports({
      name: "useElementIntersection",
      as: "useElementIntersection",
      from: resolve("./runtime/composables/useElementIntersection"),
    });

    // twitter components
    addComponent({
      name: "NuxtTweet",
      filePath: resolve("./runtime/components/NuxtTweet.vue"),
    });
    addComponent({
      name: "NuxtTestimonial",
      filePath: resolve("./runtime/components/NuxtTestimonial.vue"),
    });

    // add server endpoint
    addServerHandler({
      route: "/api/tweets/:id",
      handler: resolve("./runtime/server/api/tweets/[id].get"),
    });
  },
});
