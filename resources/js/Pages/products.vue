<script setup>
import Layout from "@/Layouts/Layout.vue";
import Product from "@/Components/product.vue";
import { Link } from "@inertiajs/vue3";
import VueSelect from "vue3-select-component";
import { ref, watch } from "vue";
const props = defineProps({
    category: {
        type: Object,
        required: true,
    },
    subcategory: {
        type: Object,
        required: true,
    },
    products: {
        type: Object,
        required: true,
    },
    filters: {
        type: Array,
        required: true,
    },
    specifications_all: {
        type: Array,
        required: true,
    },
});

const currentPage = ref(1);
const products = ref(props.products.data);
const totalPages = ref(
    Math.ceil(props.products.total / props.products.per_page)
);

watch(
    () => props.products,
    (newProducts) => {
        products.value = JSON.parse(JSON.stringify(newProducts));
    },
    { deep: true }
);

const selectedFilters = ref({});

props.filters.forEach((filter) => {
    selectedFilters.value[filter.key] = null;
});

const getProducts = async (page = 1) => {
    try {
        const response = await axios.get(
            `/category/${props.category.id}/${props.subcategory.id}/filters`,
            {
                params: {
                    ...selectedFilters.value,
                    page: page,
                },
            }
        );

        products.value = JSON.parse(JSON.stringify(response.data.data));
        console.log(response.data.data);
        totalPages.value = Math.ceil(
            response.data.total / response.data.per_page
        );
        currentPage.value = page;

        document.getElementById("catalog-title").scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    } catch (error) {
        console.error("Ошибка при загрузке продуктов:", error);
    }
};

const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        getProducts(page);
    }
};

const getVisiblePages = () => {
    const delta = 2; // Количество страниц до и после текущей
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages.value; i++) {
        if (
            i === 1 ||
            i === totalPages.value ||
            (i >= currentPage.value - delta && i <= currentPage.value + delta)
        ) {
            range.push(i);
        }
    }

    for (let i of range) {
        if (l) {
            if (i - l === 2) {
                rangeWithDots.push(l + 1);
            } else if (i - l !== 1) {
                rangeWithDots.push("...");
            }
        }
        rangeWithDots.push(i);
        l = i;
    }

    return rangeWithDots;
};
</script>

<template>
    <Layout>
        <main class="flex flex-col py-14 gap-12">
            <section class="flex flex-col items-center justify-center gap-6">
                <div class="flex flex-wrap items-center gap-3">
                    <Link
                        class="text-gray_icon/70 flex items-center gap-2"
                        :href="`/`"
                    >
                        Главная
                        <svg
                            width="6"
                            height="6"
                            viewBox="0 0 6 6"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx="3" cy="3" r="3" fill="#E3E3E3" />
                        </svg>
                    </Link>
                    <Link
                        class="text-gray_icon/70 flex items-center gap-2"
                        :href="`/catalog`"
                    >
                        Каталог
                        <svg
                            width="6"
                            height="6"
                            viewBox="0 0 6 6"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx="3" cy="3" r="3" fill="#E3E3E3" />
                        </svg>
                    </Link>
                    <Link
                        class="text-gray_icon/70 flex items-center gap-2"
                        :href="`/category/${category.id}`"
                    >
                        {{ category.name }}
                        <svg
                            width="6"
                            height="6"
                            viewBox="0 0 6 6"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx="3" cy="3" r="3" fill="#E3E3E3" />
                        </svg>
                    </Link>
                    <span>{{ subcategory.name }}</span>
                </div>
                <h1
                    id="catalog-title"
                    class="text-[56px] leading-none font-bold"
                >
                    {{ subcategory.name }}
                </h1>
            </section>
            <section
                class="flex gap-12 max-md:flex-col container mx-auto items-stretch"
            >
                <div
                    class="flex max-sm:flex-col max-md:gap-2 md:max-w-[300px] w-full max-md:flex-wrap md:flex-col gap-6"
                >
                    <div
                        v-for="filter in props.filters"
                        class="flex flex-col gap-2"
                    >
                        <p>{{ filter.name }}</p>
                        <VueSelect
                            class=""
                            :key="filter.key"
                            v-model="selectedFilters[filter.key]"
                            :options="
                                filter.values.map((value) => ({
                                    label: value,
                                    value: value,
                                }))
                            "
                            :placeholder="filter.name"
                        />
                    </div>

                    <div class="input-wrapper-label hidden gap-3 flex-col">
                        <p>Способ получения</p>
                        <div class="flex flex-col gap-2">
                            <div class="checkbox-wrapper">
                                <input type="checkbox" />
                                <label for="search">Пункты выдачи</label>
                            </div>
                            <div class="checkbox-wrapper">
                                <input type="checkbox" />
                                <label for="search">Самовывоз</label>
                            </div>
                            <div class="checkbox-wrapper">
                                <input type="checkbox" />
                                <label for="search">Доставка курьером</label>
                            </div>
                        </div>
                    </div>
                    <transition name="jumped-fade">
                        <button
                            @click="getProducts(1)"
                            v-if="
                                Object.values(selectedFilters).some(
                                    (filter) => filter !== null
                                )
                            "
                            class="btn btn-primary text-center justify-center"
                        >
                            Показать
                        </button>
                    </transition>
                </div>

                <div class="flex flex-col gap-6 w-full">
                    <div class="flex container mx-auto flex-col gap-2">
                        <Product
                            v-for="product in products"
                            :key="`${product.id}-${JSON.stringify(
                                product.specifications
                            )}`"
                            :product="product"
                            :specifications="product.specifications"
                            :specifications_all="specifications_all"
                        />
                    </div>

                    <div class="w-full mt-auto">
                        <div class="flex justify-center gap-5">
                            <button
                                @click="goToPage(currentPage - 1)"
                                :disabled="currentPage === 1"
                            >
                                <svg
                                    width="7.500000"
                                    height="13.333313"
                                    viewBox="0 0 7.5 13.3333"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        id="Icon"
                                        d="M7.25 0.24C7.58 0.56 7.58 1.09 7.25 1.42L2.01 6.66L7.25 11.91C7.58 12.23 7.58 12.76 7.25 13.08C6.93 13.41 6.4 13.41 6.07 13.08L0.24 7.25C-0.09 6.93 -0.09 6.4 0.24 6.07L6.07 0.24C6.4 -0.09 6.93 -0.09 7.25 0.24Z"
                                        :fill="
                                            currentPage === 1
                                                ? '#CCCCCC'
                                                : '#000000'
                                        "
                                    />
                                </svg>
                            </button>
                            <div class="flex gap-1">
                                <template
                                    v-for="page in getVisiblePages()"
                                    :key="page"
                                >
                                    <span
                                        v-if="page === '...'"
                                        class="w-12 h-12 items-center justify-center flex"
                                    >
                                        {{ page }}
                                    </span>
                                    <span
                                        v-else
                                        class="rounded-2xl w-12 h-12 items-center justify-center flex"
                                        :class="{
                                            'bg-black text-white':
                                                page === currentPage,
                                        }"
                                        @click="goToPage(page)"
                                        style="cursor: pointer"
                                    >
                                        {{ page }}
                                    </span>
                                </template>
                            </div>
                            <button
                                @click="goToPage(currentPage + 1)"
                                :disabled="currentPage === totalPages"
                            >
                                <svg
                                    width="7.500000"
                                    height="13.333313"
                                    viewBox="0 0 7.5 13.3333"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        id="Icon"
                                        d="M0.24 0.24C-0.09 0.56 -0.09 1.09 0.24 1.42L5.48 6.66L0.24 11.91C-0.09 12.23 -0.09 12.76 0.24 13.08C0.56 13.41 1.09 13.41 1.42 13.08L7.25 7.25C7.58 6.93 7.58 6.4 7.25 6.07L1.42 0.24C1.09 -0.09 0.56 -0.09 0.24 0.24Z"
                                        :fill="
                                            currentPage === totalPages
                                                ? '#CCCCCC'
                                                : '#000000'
                                        "
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
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
