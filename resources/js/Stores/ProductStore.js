import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductStore = defineStore('product', () => {
    const options = ref({
        show: false,
        input: null,
        popularProducts: [],
        loading: false,
        lastSearch: [],
        timeout: null,
        history_views: []
    })

    // Инициализация store с проверкой окружения
    function initClientSide() {
        if (typeof window !== 'undefined') {
            const savedHistory = localStorage.getItem('history_views')
            if (savedHistory) {
                options.value.history_views = JSON.parse(savedHistory)
            }
        }
    }

    async function init() {
        initClientSide() // Инициализируем клиентские данные, если возможно
        await getPopularProducts()
    }

    async function getPopularProducts() {
        try {
            const { data } = await axios.get('/popular-products')
            options.value.popularProducts = data
        } catch (error) {
            console.error('Error fetching popular products:', error)
        }
    }

    function addToHistoryViews(product) {
        if (options.value.history_views.find(item => item.id === product.id)) {
            return
        }
        if (options.value.history_views.length >= 4) {
            options.value.history_views.shift()
        }
        options.value.history_views.push(product)

        // Сохраняем в localStorage только на клиенте
        if (typeof window !== 'undefined') {
            try {
                localStorage.setItem('history_views', JSON.stringify(options.value.history_views))
            } catch (error) {
                console.error('Error saving to localStorage:', error)
            }
        }
    }

    function getSpecification(key, specifications) {
        let result = specifications.find(spec => spec.key === key)
        return result?.name
    }

    return {
        options,
        init,
        getSpecification,
        addToHistoryViews
    }
}) 
