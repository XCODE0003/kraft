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



    async function init() {
        watch(
            () => options.value.input,
            (newQuery) => {
                if (newQuery) {


                    clearTimeout(options.value.timeout)
                    options.value.timeout = setTimeout(() => {
                        options.value.loading = true
                        setTimeout(() => {
                            options.value.loading = false
                        }, 1000)
                    }, 300)
                }
            }
        )
    }

    return { options, init }
}) 
