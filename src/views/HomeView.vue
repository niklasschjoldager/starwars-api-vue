<script setup lang="ts">
import { computed, ref } from 'vue'
import { useFetch } from '../composables/fetch.js'
import CharacterItem from '../components/CharacterItem.vue'

const { data, error, isLoading } = useFetch('https://swapi.dev/api/people')

// TODO: Ændr til object? https://vuejs.org/guide/essentials/reactivity-fundamentals
const birthYear = ref(false)
const gender = ref(null)
const genderOptions = ref([
  {
    text: 'Show all',
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
  <!-- TODO: Make FilterList / Filters & CharcterList component -->
  <div class="container mx-auto px-4 py-8">
    <main>
      <h1 class="flex flex-col mb-16 text-center">
        <span class="text-8xl font-display ml-4 flex flex-col mb-8 text-primary">
          <span>Star</span>
          <span>Wars</span>
        </span>
        <span class="text-5xl">Database</span>
        <span class="text-lg">Everything about Star Wars!</span>
      </h1>
      <div class="lg:flex lg:gap-12 relative">
        <section class="lg:w-9/12 py-4">
          <h2 class="text-4xl mb-4 font-display">Characters</h2>
          <div v-if="error">Oops, an error occured: {{ error.message }}</div>
          <div v-else-if="isLoading">Loading...</div>
          <ul v-else class="grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
            <CharacterItem
              v-for="{ name, height, mass, birth_year, films, hair_color } in filteredCharacters"
              :name="name"
              :height="height"
              :mass="mass"
              :birthYear="birth_year"
              :filmsQuantity="films.length"
              :hairColor="hair_color"
              :key="name"
            />
          </ul>
        </section>
        <aside class="lg:w-3/12 py-4">
          <h2 class="ml-1 text-4xl mb-4 font-display">Filters</h2>
          <div class="flex flex-col">
            <h3 class="mb-1">Gender</h3>
            <select
              v-model="gender"
              class="p-2 bg-transparent border border-primary rounded-md cursor-pointer"
            >
              <option v-for="{ text, value } in genderOptions" :value="value" :key="value">
                {{ text }}
              </option>
            </select>
            <hr class="border border-slate-100 my-4" />
            <h3 class="mb-1">Birth year</h3>
            <label
              for="birthYear"
              class="flex gap-2 text-sm border border-primary p-2 rounded-md cursor-pointer"
            >
              <input v-model="birthYear" id="birthYear" type="checkbox" />
              <span>Between 20 and 40 BBY</span>
            </label>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>
