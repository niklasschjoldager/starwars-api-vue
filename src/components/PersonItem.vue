<script setup lang="ts">
defineProps({
  name: String,
  height: Number,
  mass: Number
})
</script>

<template>
  <article class="bg-secondary rounded-md p-4">
    <h2>{{ name }}</h2>
    <p>Height: {{ height }} cm</p>
    <p>Mass: {{ mass }} kg</p>
  </article>
</template>
