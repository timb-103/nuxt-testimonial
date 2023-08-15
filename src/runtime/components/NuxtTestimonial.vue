<template>
  <div ref="observer">
    <div v-if="show">
      <masonry-wall
        :items="props.ids"
        :ssr-columns="props.maxColumns"
        :column-width="props.columnWidth"
        :max-columns="props.maxColumns"
        :gap="16"
      >
        <template #default="{ item, index }">
          <NuxtTweet :id="item" :show-media="props.showMedia" :key="index" />
        </template>
      </masonry-wall>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, onMounted, useElementIntersection } from "#imports";

const props = defineProps({
  ids: { type: Array as PropType<string[]>, required: true },
  showMedia: { type: Boolean, required: false, default: () => true },
  maxColumns: { type: Number, required: false, default: () => 2 },
  columnWidth: { type: Number, required: false, default: () => 200 },
});

const show = ref(false);
const observer = ref();

function showTestimonials() {
  show.value = true;
}

// use this to lazy load the testimonials when 300px from view
onMounted(() => {
  useElementIntersection(showTestimonials, observer.value);
});
</script>
