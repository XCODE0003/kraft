<script setup>
import { useSettingStore } from '@/Stores/SettingStore';

const settingStore = useSettingStore()
</script>

<template>
    <footer class="container mt-12 mx-auto flex justify-between items-center py-6">
        <div class="flex max-md:hidden flex-col gap-6">
            <div class="flex flex-col gap-0.5 flex-shrink-0">
                <div class="flex items-center gap-1">
                    <img src="/assets/img/logo.svg" alt="logo" width="24" height="24" srcset="">
                    <span class="text-purple text-2xl leading-none font-semibold">{{
                        settingStore.options.settings?.name_company }}</span>
                </div>
                <span class="text-gray_icon leading-none text-sm">г. Краснодар</span>
            </div>
            <div class="flex-1 contact-container">
                <div class="contact-element">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                        <path
                            d="M7.99998 4.50016V8.50016L10.6666 9.8335M14.6666 8.50016C14.6666 12.1821 11.6819 15.1668 7.99998 15.1668C4.31808 15.1668 1.33331 12.1821 1.33331 8.50016C1.33331 4.81826 4.31808 1.8335 7.99998 1.8335C11.6819 1.8335 14.6666 4.81826 14.6666 8.50016Z"
                            stroke="#4B4951" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    {{ settingStore.options.settings?.work_time }}
                </div>
                <div class="contact-element">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                        <path
                            d="M5.58685 6.40224C6.05085 7.36865 6.68338 8.27441 7.48443 9.07546C8.28548 9.87651 9.19124 10.509 10.1577 10.973C10.2408 11.0129 10.2823 11.0329 10.3349 11.0482C10.5218 11.1027 10.7513 11.0636 10.9096 10.9502C10.9542 10.9183 10.9923 10.8802 11.0685 10.804C11.3016 10.571 11.4181 10.4544 11.5353 10.3782C11.9772 10.0909 12.5469 10.0909 12.9889 10.3782C13.106 10.4544 13.2226 10.571 13.4556 10.804L13.5856 10.934C13.9399 11.2882 14.117 11.4654 14.2132 11.6556C14.4046 12.034 14.4046 12.4809 14.2132 12.8592C14.117 13.0495 13.9399 13.2266 13.5856 13.5809L13.4805 13.686C13.1274 14.0391 12.9508 14.2156 12.7108 14.3505C12.4445 14.5001 12.0308 14.6077 11.7253 14.6068C11.45 14.6059 11.2619 14.5525 10.8856 14.4457C8.86334 13.8718 6.95509 12.7888 5.36311 11.1968C3.77112 9.6048 2.68814 7.69655 2.11416 5.67429C2.00735 5.29799 1.95395 5.10984 1.95313 4.83455C1.95222 4.52906 2.0598 4.1154 2.20941 3.84907C2.34424 3.60905 2.52078 3.4325 2.87386 3.07942L2.97895 2.97433C3.33325 2.62004 3.5104 2.44289 3.70065 2.34666C4.07903 2.15528 4.52587 2.15528 4.90424 2.34666C5.0945 2.44289 5.27164 2.62004 5.62594 2.97433L5.75585 3.10425C5.98892 3.33732 6.10546 3.45385 6.18165 3.57104C6.46898 4.01296 6.46898 4.58268 6.18165 5.02461C6.10546 5.1418 5.98892 5.25833 5.75585 5.4914C5.67964 5.56761 5.64154 5.60572 5.60965 5.65026C5.49631 5.80854 5.45717 6.03805 5.51165 6.22495C5.52698 6.27755 5.54694 6.31911 5.58685 6.40224Z"
                            stroke="#4B4951" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    {{ settingStore.options.settings?.phone }}
                </div>
                <div class="contact-element">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                        <path
                            d="M1.33333 5.1665L6.77661 8.9768C7.21739 9.28535 7.43778 9.43962 7.6775 9.49938C7.88926 9.55216 8.11073 9.55216 8.32249 9.49938C8.56221 9.43962 8.7826 9.28535 9.22338 8.9768L14.6667 5.1665M4.53333 13.8332H11.4667C12.5868 13.8332 13.1468 13.8332 13.5746 13.6152C13.951 13.4234 14.2569 13.1175 14.4487 12.7412C14.6667 12.3133 14.6667 11.7533 14.6667 10.6332V6.3665C14.6667 5.2464 14.6667 4.68635 14.4487 4.25852C14.2569 3.8822 13.951 3.57624 13.5746 3.38449C13.1468 3.1665 12.5868 3.1665 11.4667 3.1665H4.53333C3.41322 3.1665 2.85317 3.1665 2.42535 3.38449C2.04902 3.57624 1.74306 3.8822 1.55132 4.25852C1.33333 4.68635 1.33333 5.2464 1.33333 6.3665V10.6332C1.33333 11.7533 1.33333 12.3133 1.55132 12.7412C1.74306 13.1175 2.04902 13.4234 2.42535 13.6152C2.85317 13.8332 3.41322 13.8332 4.53333 13.8332Z"
                            stroke="#4B4951" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    {{ settingStore.options.settings?.email }}
                </div>
            </div>
        </div>
        <div class="flex max-md:hidden flex-col gap-6">
            <div class="nav-menu">
                <a href="#">О компании</a>
                <a href="#">Услуги</a>
                <a href="#">Доставка</a>
                <a href="#">Оплата</a>
                <a href="#">Калькулятор</a>
                <a href="#">Контакты</a>
            </div>
            <p>© {{ settingStore.options.settings?.name_company }}, ИНН {{ settingStore.options.settings?.inn }}. Все
                права защищены, 2024.</p>
        </div>
    </footer>
</template>