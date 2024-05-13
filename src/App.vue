<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="bg-secondary">
    <nav class="flex container mx-auto px-4 gap-2">
      <RouterLink to="/" class="py-4">Home</RouterLink>
      <RouterLink to="/about" class="py-4">About</RouterLink>
    </nav>
  </header>
  <RouterView />
</template>
