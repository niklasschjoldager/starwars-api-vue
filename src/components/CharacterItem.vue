<script setup lang="ts">
defineProps({
  name: String,
  height: String,
  mass: String,
  birthYear: String,
  filmsQuantity: Number,
  hair_color: String
})
</script>

<template>
  <article class="border border-primary rounded-md pt-4 px-6 pb-8 text-center">
    <h2 class="font-display text-2xl mb-4">{{ name }}</h2>
    <ul class="grid gap-y-8 grid-cols-2">
      <li>
        <p class="flex flex-col">
          <span class="text-lg">{{ height === 'unknown' ? height : `${height} cm` }}</span>
          <span class="text-sm text-primary">Height</span>
        </p>
      </li>
      <li>
        <p class="flex flex-col">
          <span class="text-lg">{{ mass === 'unknown' ? mass : `${mass} kg` }}</span>
          <span class="text-sm text-primary">Mass</span>
        </p>
      </li>
      <li>
        <p class="flex flex-col">
          <span class="text-lg"
            >{{ filmsQuantity }} {{ filmsQuantity !== 1 ? 'films' : 'film' }}</span
          >
          <span class="text-sm text-primary">Appears in</span>
        </p>
      </li>
      <li>
        <p class="flex flex-col">
          <span class="text-lg">{{ birthYear }}</span>
          <span class="text-sm text-primary">Birth year</span>
        </p>
      </li>
    </ul>
  </article>
</template>
