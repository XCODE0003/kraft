<script setup>
import Layout from '@/Layouts/Layout.vue';
import { Link } from '@inertiajs/vue3';
import { defineProps } from 'vue'

const props = defineProps({
    categories: Object,
});
</script>

<template>
    <Layout>
        <main class="flex flex-col py-14 gap-12">
            <section class="flex flex-col items-center justify-center gap-6">
                <div class="flex items-center gap-3">
                    <Link href="/" class="text-gray_icon/70">Главная</Link>
                    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="3" cy="3" r="3" fill="#E3E3E3" />
                    </svg>

                    <span>Каталог</span>
                </div>
                <h1 class=" text-[56px] leading-none font-bold">Каталог</h1>
            </section>
            <section class="grid grid-cols-4 gap-11 container mx-auto">
                <div v-for="category in props.categories" class="catalog-item">
                    <img :src="`/storage/${category.image}`" :alt="category.name">
                    <div class="catalog-item-info">
                        <Link :href="`/category/${category.id}`"
                            class="catalog-item-title transition-all hover:text-purple">{{ category.name }}</Link>
                        <div class="catalog-items-container">
                            <template v-if="category.nodes">
                                <div v-for="nodeGroup in category.nodes" class=" catalog-item-element-title">
                                    <p class="py-1">{{ nodeGroup.node.name }}</p>
                                    <div class="flex flex-col gap-3 pl-2">
                                        <Link :href="`/category/${category.id}/${subcategory.id}`"
                                            v-for="subcategory in nodeGroup.subcategories" class="catalog-item-element">
                                        <span>{{ subcategory.name }}</span>
                                        <span>{{ subcategory.products_count }} шт.</span>
                                        </Link>
                                    </div>
                                </div>
                            </template>
                            <Link :href="`/category/${category.id}/${subcategory.id}`"
                                v-for="subcategory in category.simple_subcategories" class="catalog-item-element">
                            <span>{{ subcategory.name }}</span>
                            <span>{{ subcategory.products_count }} шт.</span>
                            </Link>
                        </div>
                    </div>
                </div>

            </section>
        </main>
    </Layout>
</template>
