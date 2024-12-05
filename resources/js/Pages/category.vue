<script setup>
import Layout from '@/Layouts/Layout.vue';

import Product from '@/Components/product.vue';
const props = defineProps({
    category: Object,
    subcategories: Array,
    products: Array,
});

</script>

<template>
    <Layout>
        <main class="flex flex-col py-14 gap-12">
            <section class="flex flex-col items-center justify-center gap-6">
                <div class="flex items-center gap-3">
                    <a class="text-gray_icon/70" href="#">Главная</a>
                    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="3" cy="3" r="3" fill="#E3E3E3" />
                    </svg>
                    <a class="text-gray_icon/70" href="#">Каталог</a>
                    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="3" cy="3" r="3" fill="#E3E3E3" />
                    </svg>
                    <span>{{ props.category.name }}</span>
                </div>
                <h1 class=" text-[56px] leading-none font-bold">{{ props.category.name }}</h1>
            </section>
            <section class="container mx-auto grid grid-cols-4 gap-4">
                <div v-for="subcategory in props.subcategories" class="products-card">
                    <img :src="'/storage/' + subcategory.image" class="w-10 h-10 rounded-lg" alt="" srcset="">
                    <div class="flex flex-col gap-2">
                        <p>{{ subcategory.name }}</p>
                        <span class="text-sm">{{ props.products.length }} товаров</span>
                    </div>
                </div>

            </section>

            <section class="flex container mx-auto flex-col gap-2">
                <Product v-for="product in props.products" :product="product" />

            </section>
        </main>
    </Layout>
</template>
