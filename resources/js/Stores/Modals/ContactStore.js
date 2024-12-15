import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useContactModalStore = defineStore('contactModal', () => {
    const options = ref({
        teleportTo: 'body',
        modelValue: false,
        displayDirective: 'if',
        hideOverlay: false,
        overlayTransition: 'vfm-fade',
        contentTransition: 'vfm-fade',
        clickToClose: true,
        escToClose: true,
        background: 'non-interactive',
        lockScroll: true,
        reserveScrollBarGap: true,
        swipeToClose: 'none',
        errors: [],
        data: {
            name: null,
            email: null,
            phone: null,
            message: null,
            time: null
        }

    })


    const openModal = () => {
        options.value.modelValue = true
    }

    const closeModal = () => {
        options.value.modelValue = false
    }

    const setErrors = (errors) => {
        options.value.errors = errors
    }


    const validate = () => {
        if (options.value.data.name && options.value.data.phone) {
            return true
        }
        options.value.errors = ['Поля обязательны для заполнения']
        return false
    }
    return { options, openModal, closeModal, setErrors, validate }
}) 
