<script setup>
import Header from '@/Components/Header.vue';
import Footer from '@/Components/Footer.vue';
import ContactModal from '@/Components/Modals/ContactModal.vue';
import { ModalsContainer } from 'vue-final-modal';
import { useProductStore } from '@/Stores/ProductStore';

const productStore = useProductStore()
productStore.init()
</script>

<template>
    <Header />
    <transition name="fade" mode="out-in">
        <slot :key="$page.url" />
    </transition>
    <Footer />
    <ModalsContainer />
    <ContactModal />
</template>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
