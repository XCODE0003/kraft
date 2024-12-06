import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useSearchStore = defineStore('search', () => {
    const options = ref({
        show: false,
        input: null,
        items: [],
        loading: false,
        lastSearch: [],
        timeout: null
    })


    async function search() {
        const { data } = await axios.get('/search/' + options.value.input)
        options.value.items = data
    }
    async function init() {
        watch(
            () => options.value.input,
            async (newQuery) => {
                if (newQuery) {
                    clearTimeout(options.value.timeout)
                    options.value.timeout = setTimeout(async () => {
                        options.value.loading = true
                        await search()
                        options.value.loading = false
                    }, 1000)
                }
            }
        )
    }

    return { options, init }
}) 
