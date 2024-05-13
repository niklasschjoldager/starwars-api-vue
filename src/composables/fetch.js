import { ref } from 'vue'

export function useFetch(url) {
  const isLoading = ref(true)
  const data = ref(null)
  const error = ref(null)

  async function getData(url) {
    isLoading.value = true

    try {
      const request = await fetch(url)
      const response = await request.json()

      if (response.next) {
        return (data.value = data.value
          ? data.value.concat(response.results, await getData(response.next))
          : response.results.concat(await getData(response.next)))
      }

      return (data.value = data.value ? data.value.concat(response.results) : response.results)
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  }

  getData(url)

  return { data, error, isLoading }
}
