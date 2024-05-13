<script setup lang="ts">
import { ref } from 'vue'
import { useFetch } from '../composables/fetch.js'
import PersonItem from '../components/PersonItem.vue'

const { data, error } = useFetch('https://swapi.dev/api/people')

const gender = ref(null)
const options = ref([
  {
    text: 'All',
    value: null
  },
  {
    text: 'Male',
    value: 'male'
  },
  {
    text: 'Female',
    value: 'female'
  }
])
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <main>
      <h1 class="text-2xl mb-4">People</h1>
      <div v-if="error">Oops, an error occured: {{ error.message }}</div>
      <div v-else-if="!data">Loading...</div>
      <section v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        <PersonItem
          v-for="{ name, height, mass } in gender
            ? data.results.filter((person) => person.gender === gender)
            : data.results"
          :name="name"
          :height="height"
          :mass="mass"
          :key="name"
        />
      </section>
    </main>
    <aside>
      <h2 class="text-xl">Filters</h2>
      <select v-model="gender">
        <option v-for="{ text, value } in options" :value="value" :key="value">
          {{ text }}
        </option>
      </select>
    </aside>
  </div>
</template>
