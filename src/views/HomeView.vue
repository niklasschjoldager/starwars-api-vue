<script setup lang="ts">
import { ref } from 'vue'

const data = ref(null)
const error = ref(null)

fetch('https://swapi.dev/api/people')
  .then((res) => res.json())
  .then((json) => (data.value = json))
  .catch((err) => (error.value = err))
</script>

<template>
  <h1>This is a home page</h1>
  <div v-if="error">Oops, an error occured: {{ error.message }}</div>
  <div v-else-if="!data">Loading...</div>
  <div v-else>
    <div v-for="({ name, height }, index) in data.results" :key="index">
      <article class="">
        <h2>{{ name }}</h2>
        <p>{{ height }}</p>
      </article>
    </div>
  </div>
</template>
