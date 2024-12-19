import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useProductStore = defineStore('product', () => {
    const options = ref({
        show: false,
        input: null,
        popularProducts: [],
        loading: false,
        lastSearch: [],
        timeout: null
    })

    async function init() {
        await getPopularProducts()
    }

    async function getPopularProducts() {
        const { data } = await axios.get('/popular-products')
        options.value.popularProducts = data
    }
    function getSpecification(key, specifications) {
        let result = specifications.find(spec => spec.key === key)
        return result?.name
    }


    return { options, init, getSpecification }
}) 
