<script setup>
import Layout from '@/Layouts/Layout.vue';
import Product from '@/Components/product.vue';
import VueSelect from "vue3-select-component";
import { ref } from 'vue';
const props = defineProps({
    category: {
        type: Object,
        required: true
    },
    subcategory: {
        type: Object,
        required: true
    },
    products: {
        type: Array,
        required: true
    },
    filters: {
        type: Array,
        required: true
    }
})

const selectedFilters = ref({})

props.filters.forEach(filter => {
    selectedFilters.value[filter.key] = null
})
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
                    <a class="text-gray_icon/70" href="#">{{ category.name }}</a>
                    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="3" cy="3" r="3" fill="#E3E3E3" />
                    </svg>
                    <span>{{ subcategory.name }}</span>
                </div>
                <h1 class=" text-[56px] leading-none font-bold">{{ subcategory.name }}</h1>
            </section>
            <section class="flex gap-12 container mx-auto items-start">
                <div class="flex max-w-[300px] w-full flex-col gap-6">
                    <VueSelect v-for="filter in props.filters" :key="filter.key" v-model="selectedFilters[filter.key]"
                        :options="filter.values.map(value => ({
                            label: value,
                            value: value
                        }))" :placeholder="filter.name" />
                    <div class="input-wrapper-label gap-3 flex-col flex">
                        <p>Способ получения</p>
                        <div class="flex flex-col gap-2">
                            <div class="checkbox-wrapper">
                                <input type="checkbox">
                                <label for="search">Пункты выдачи</label>
                            </div>
                            <div class="checkbox-wrapper">
                                <input type="checkbox">
                                <label for="search">Самовывоз</label>
                            </div>
                            <div class="checkbox-wrapper">
                                <input type="checkbox">
                                <label for="search">Доставка курьером</label>
                            </div>
                        </div>

                    </div>

                </div>
                <div class="flex container mx-auto flex-col gap-2">
                    <Product v-for="product in props.products" :product="product" />


                </div>
            </section>
        </main>
    </Layout>
</template>


<style scoped></style>