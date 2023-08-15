![Nuxt Testimonial](./.github/assets/og-landscape.png)

# Nuxt Testimonial

[![npm version][npm-version-src]][npm-version-href]
[![Nuxt][nuxt-src]][nuxt-href]

> Create a Twitter testimonial wall for your Nuxt website.

- [🏀 Online playground](https://stackblitz.com/github/your-org/nuxt-testimonial?file=playground%2Fapp.vue)

## Features

- 👏🏻 Show off your favourite tweets
- 🍱 Customizable Masonry layout
- 💿 Server side cached for speed
- 🌪 No layout shift (SSR)
- ⚡ Fast & Easy setup
- 🦥 Lazy loading

## Quick Setup

1. Add `nuxt-testimonial` dependency to your project

```bash
npm install --save-dev nuxt-testimonial
```

2. Add `nuxt-testimonial` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: ["nuxt-testimonial"],
});
```

That's it! You can now use Nuxt Testimonial in your Nuxt app ✨

## Usage

We provide a simple `<NuxtTestimonial />` component that you can add to your website.

**Example**

```vue
<template>
  <NuxtTestimonial
    :ids="ids"
    :show-media="false"
    :max-columns="columns"
    :column-width="width"
  />
</template>

<script setup>
const ids = [
  "1683982469752840193",
  // ... more twitter ids
];
const columns = ref(2);
const width = ref(200);
</script>
```

We also provide a simple Tweet component if you want to build your own integrations:

```vue
<template>
  <NuxtTweet :id="id" :show-media="false" />
</template>

<script setup>
const id = "1683982469752840193";
</script>
```

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/nuxt-testimonial/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-testimonial
[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-testimonial.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-testimonial
[license-src]: https://img.shields.io/npm/l/nuxt-testimonial.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-testimonial
[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
