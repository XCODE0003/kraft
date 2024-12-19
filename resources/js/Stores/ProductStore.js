import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useProductStore = defineStore('product', () => {
    const options = ref({
        show: false,
        input: null,
        popularProducts: [],
        loading: false,
        lastSearch: [],
        timeout: null,
        history_views: localStorage.getItem('history_views') ? JSON.parse(localStorage.getItem('history_views')) : []
    })

    async function init() {
        await getPopularProducts()
    }

    async function getPopularProducts() {
        const { data } = await axios.get('/popular-products')
        options.value.popularProducts = data
    }

    function addToHistoryViews(product) {
        if (options.value.history_views.find(item => item.id === product.id)) {
            return
        }
        if (options.value.history_views.length >= 4) {
            options.value.history_views.shift()
        }
        options.value.history_views.push(product)
        localStorage.setItem('history_views', JSON.stringify(options.value.history_views))
    }

    function getSpecification(key, specifications) {
        let result = specifications.find(spec => spec.key === key)
        return result?.name
    }


    return { options, init, getSpecification, addToHistoryViews }
}) 
