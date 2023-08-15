<template>
  <h1>Nuxt Testimonial</h1>
  <p>Just add your tweet ids seperated by line below to see how it works.</p>

  <!-- Tweet Ids Input -->
  <form @submit.prevent="update" class="notice">
    <textarea type="text" v-model="idInput" rows="3"></textarea>

    <select @change="changeColumns($event)" style="margin-right: 5px">
      <option value="1">Max columns: 1</option>
      <option value="2" default selected>Max columns: 2</option>
      <option value="3">Max columns: 3</option>
    </select>

    <select @change="changeWidth($event)">
      <option value="100">Column width: 100px</option>
      <option value="200" default selected>Column width: 200px</option>
      <option value="300">Column width: 300px</option>
    </select>
    <div>
      <button type="submit">update</button>
    </div>
  </form>

  <div style="height: 2000px"></div>

  <!-- Testimonial Wall -->
  <NuxtTestimonial
    :ids="ids"
    :show-media="false"
    :max-columns="columns"
    :column-width="width"
    :key="key"
  />
</template>

<script setup lang="ts">
import { ref } from "#imports";

const ids = ref([
  "1683982469752840193",
  "1690855751001206784",
  "1689417504265834496",
  "1687618522145521664",
  "1685145017919348736",
  "1685544929458847746",
  "1637211704093478912",
  "1688762339506745344",
  "1688758457271554048",
  "1687253788804218883",
  "1687350574172577792",
]);
const key = ref(0);

const idInput = ref(ids.value.join("\n"));
const columns = ref(2);
const width = ref(200);

function changeColumns(event: Event) {
  const target = event.target as HTMLSelectElement;
  columns.value = Number(target.value);
  key.value++;
}

function changeWidth(event: Event) {
  const target = event.target as HTMLSelectElement;
  width.value = Number(target.value);
  key.value++;
}

function update() {
  ids.value = idInput.value.split("\n").filter((v) => v);
  key.value++;
}
</script>
