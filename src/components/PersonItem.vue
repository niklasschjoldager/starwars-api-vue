<script setup lang="ts">
defineProps({
  name: String,
  height: String,
  mass: String,
  birthYear: String
})
// TODO: Rename this to CharacterItem
</script>

<template>
  <article class="bg-secondary rounded-md p-4">
    <h2 class="font-display">{{ name }}</h2>
    <!-- TODO: Fix height & mass unknown. Tjek dokumentationen om der er andre -->
    <p>Height: {{ height }} cm</p>
    <p>Mass: {{ mass }} kg</p>
    <p>🎂 Birth year: {{ birthYear }}</p>
  </article>
</template>
