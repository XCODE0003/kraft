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

const products = ref(props.products)

const selectedFilters = ref({})

props.filters.forEach(filter => {
    selectedFilters.value[filter.key] = null
})

const getProducts = async () => {
    const response = await axios.get(`/category/${props.category.id}/${props.subcategory.id}/filters`, {
        params: selectedFilters.value
    })
    products.value = response.data
}
</script>

<template>
    <Layout>
        <main class="flex flex-col py-14 gap-12">
            <section class="flex flex-col items-center justify-center gap-6">
                <div class="flex flex-wrap max-md:justify-center items-center gap-3">
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
            <section class="flex gap-12 max-md:flex-col container mx-auto items-start">
                <div
                    class="md:flex grid grid-cols-2 max-md:gap-2 md:max-w-[300px] w-full max-md:flex-wrap md:flex-col gap-6">
                    <div v-for="filter in props.filters" class="flex flex-col gap-2">
                        <p>{{ filter.name }}</p>
                        <VueSelect class="" :key="filter.key" v-model="selectedFilters[filter.key]" :options="filter.values.map(value => ({
                            label: value,
                            value: value
                        }))" :placeholder="filter.name" />
                    </div>

                    <div class="input-wrapper-label hidden gap-3 flex-col flex">
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
                    <transition name="jumped-fade">
                        <button @click="getProducts"
                            v-if="Object.values(selectedFilters).some(filter => filter !== null)"
                            class="btn btn-primary text-center justify-center">
                            Показать
                        </button>
                    </transition>
                </div>
                <div class="flex container mx-auto flex-col gap-2">
                    <Product v-for="product in products" :product="product" />


                </div>
            </section>
        </main>
    </Layout>
</template>


<style scoped>
.jumped-fade-enter-active,
.jumped-fade-leave-active {
    transition: all 0.05s ease;
}

.jumped-fade-enter-from,
.jumped-fade-leave-to {
    transform: translateY(-5px);
}
</style>
