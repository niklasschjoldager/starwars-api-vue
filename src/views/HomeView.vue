<script setup lang="ts">
import { computed, ref } from 'vue'
import { useFetch } from '../composables/fetch.js'
import PersonItem from '../components/PersonItem.vue'

const { data, error, isLoading } = useFetch('https://swapi.dev/api/people')

// TODO: Ændr til object? https://vuejs.org/guide/essentials/reactivity-fundamentals
const birthYear = ref(false)
const gender = ref(null)
const genderOptions = ref([
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

// TODO: Flyt til en helpers mappe?
const sortByNameAlphabetically = (a, b) => {
  const nameA = a.name.toUpperCase()
  const nameB = b.name.toUpperCase()
  if (nameA < nameB) {
    return -1
  }
  if (nameA > nameB) {
    return 1
  }

  return 0
}

const filteredCharacters = computed(() => {
  // TODO: Make to functions?
  if (!data.value) {
    return null
  }

  let characters = data.value

  characters = characters.sort(sortByNameAlphabetically)

  if (gender.value) {
    characters = characters.filter((person) => person.gender === gender.value)
  }

  if (birthYear.value) {
    characters = characters.filter(({ birth_year }) => {
      if (birth_year === 'unknown') {
        return false
      }

      const beforeOrAfterBattleOfYavin = birth_year.match(/[a-zA-Z]+/g)[0]

      if (beforeOrAfterBattleOfYavin !== 'BBY') {
        return false
      }

      const year = birth_year.match(/\d+/g)[0]

      if (year < 20 || year > 40) {
        return false
      }

      return true
    })
  }

  return characters
})
</script>

<template>
  <!-- TODO: Make FilterList / Filters & PersonList component -->
  <div class="container mx-auto px-4 py-8 sm:grid lg:flex lg:gap-4">
    <main class="lg:w-4/5">
      <h1 class="text-2xl mb-4 font-display">Characters</h1>
      <div v-if="error">Oops, an error occured: {{ error.message }}</div>
      <div v-else-if="isLoading">Loading...</div>
      <section v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        <PersonItem
          v-for="{ name, height, mass, birth_year } in filteredCharacters"
          :name="name"
          :height="height"
          :mass="mass"
          :birthYear="birth_year"
          :key="name"
        />
      </section>
    </main>
    <aside class="lg:w-1/5">
      <h2 class="text-xl mb-4">Filters</h2>
      <select v-model="gender">
        <option v-for="{ text, value } in genderOptions" :value="value" :key="value">
          {{ text }}
        </option>
      </select>
      <label for="birthYear">Show characters with birthyear between 20 and 40 BBY</label>
      <input v-model="birthYear" id="birthYear" type="checkbox" />
    </aside>
  </div>
</template>
