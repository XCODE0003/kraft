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

    return { options, openModal, closeModal }
}) 
