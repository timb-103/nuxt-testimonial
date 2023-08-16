<template>
  <main>
    <header>
      <nav>
        <a
          @click.prevent="show = 'testimonial'"
          :class="{ active: show === 'testimonial' }"
        >
          Testimonial
        </a>
        <a
          @click.prevent="show = 'tweet'"
          :class="{ active: show === 'tweet' }"
        >
          Tweet
        </a>
      </nav>
    </header>

    <!-- Testimonial -->
    <Testimonial v-if="show === 'testimonial'" />

    <!-- Tweet -->
    <Tweet v-if="show === 'tweet'" />
  </main>
</template>
<script setup lang="ts">
import { ref } from "#imports";
const show = ref("tweet");
</script>

<style scoped>
.active {
  background: var(--accent);
  color: var(--accent-bg);
}
</style>
