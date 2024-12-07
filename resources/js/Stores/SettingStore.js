import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useSettingStore = defineStore('setting', () => {
    const options = ref({
        show: false,
        input: null,
        settings: [],
        loading: false,
        timeout: null
    })

    async function init() {
        await getSettings()
    }
    async function getSettings() {
        const { data } = await axios.get('/settings')
        options.value.settings = data
    }


    return { options, init }
}) 
