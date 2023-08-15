<template>
  <h1>Nuxt Tweet</h1>
  <p>Just add your tweet id below to see it in action.</p>

  <!-- Id Input -->
  <form @submit.prevent="update" class="notice">
    <input type="text" v-model="idInput" />
    <div>
      <button type="submit">update</button>
    </div>
  </form>

  <!-- Tweet -->
  <NuxtTweet :id="id" :show-media="true" :key="id" />
</template>

<script setup>
import { ref } from "#imports"

const idInput = ref("1687618522145521664");
const id = ref("1687618522145521664");

function update() {
  id.value = idInput.value;
}
</script>
