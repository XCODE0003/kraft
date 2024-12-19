import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

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

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    };

    const validatePhone = (phone) => {
        return /^\d+$/.test(phone);
    };

    const validate = async () => {
        options.value.errors = [];

        if (!options.value.data.name) {
            options.value.errors.push('Введите имя и фамилию');
            return false;
        }

        if (!options.value.data.phone || !validatePhone(options.value.data.phone)) {
            options.value.errors.push('Введите корректный номер телефона');
            return false;
        }

        if (options.value.data.email && !validateEmail(options.value.data.email)) {
            options.value.errors.push('Введите корректный email');
            return false;
        }

        try {
            const response = await axios.post('/api/send-telegram-message', options.value.data);
            if (response.data.message === 'Message sent') {
                options.value.data = {
                    name: null,
                    email: null,
                    phone: null,
                    message: null,
                    time: null
                };
                closeModal();
                alert('Ваша заявка отправлена');
            }
        } catch (error) {
            options.value.errors.push('Произошла ошибка при отправке формы');
        }
    }

    return { options, openModal, closeModal, setErrors, validate }
}) 
