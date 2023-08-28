<template>
  <div
    class="w-full flex-col items-center gap-2 p-4 my-5 justify-center mx-auto flex max-w-xl"
  >
    <h1 class="text-center text-xl">Hannahs App</h1>

    <div class="p-2 w-full border rounded">
      <p>Helligkeit</p>
      <input class="w-full" min="0" max="128" v-model="slider" type="range" />
    </div>
  </div>
</template>

<script setup lang="ts">
let slider = ref(0);
const { $io } = useNuxtApp();

watch(slider, (v) => $io.emit("slider", v));
</script>
