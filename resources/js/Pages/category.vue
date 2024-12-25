<script setup>
import Layout from "@/Layouts/Layout.vue";
import { Link } from "@inertiajs/vue3";
import Product from "@/Components/product.vue";
import { ref } from "vue";
import { Head } from "@inertiajs/vue3";
const props = defineProps({
    category: Object,
    subcategories: Array,
    products: Object,
    is_nodes: Boolean,
    specifications_all: Array,
});
const currentPage = ref(1);
const totalPages = ref(
    Math.ceil(props.products.total / props.products.per_page)
);

const goToPage = (page) => {
    const pageNumber = Number(page);
    if (pageNumber >= 1 && pageNumber <= totalPages.value) {
        window.location.href = `?page=${pageNumber}`;
    }
};

const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages.value; i++) {
        if (
            i === 1 ||
            i === totalPages.value ||
            (i >= props.products.current_page - delta &&
                i <= props.products.current_page + delta)
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
    <Head>
        <title>{{ props.category.name }} - КрафтСнаб</title>
        <meta name="description" content="Каталог продуктов КрафтСнаб" />
        <meta property="og:description" content="Каталог продуктов КрафтСнаб" />
    </Head>
    <Layout>
        <main class="flex flex-col py-14 gap-12">
            <section class="flex flex-col items-center justify-center gap-6">
                <div class="flex items-center gap-3">
                    <a class="text-gray_icon/70" href="/">Главная</a>
                    <svg
                        width="6"
                        height="6"
                        viewBox="0 0 6 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="3" cy="3" r="3" fill="#E3E3E3" />
                    </svg>
                    <a class="text-gray_icon/70" href="/catalog">Каталог</a>
                    <svg
                        width="6"
                        height="6"
                        viewBox="0 0 6 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="3" cy="3" r="3" fill="#E3E3E3" />
                    </svg>
                    <span>{{ props.category.name }}</span>
                </div>
                <h1 class="text-[56px] leading-none font-bold">
                    {{ props.category.name }}
                </h1>
            </section>

            <section
                class="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
                <Link
                    :href="`${
                        props.is_nodes
                            ? '/node/' + subcategory.id
                            : '/category/' +
                              props.category.id +
                              '/' +
                              subcategory.id
                    }`"
                    v-for="subcategory in props.subcategories"
                    class="products-card"
                >
                    <img
                        :src="'/storage/' + subcategory.image"
                        class="w-10 h-10 rounded-lg"
                        alt=""
                        srcset=""
                    />
                    <div class="flex flex-col gap-2">
                        <p>{{ subcategory.name }}</p>
                        <span class="text-sm"
                            >{{ subcategory.products_count }} товаров</span
                        >
                    </div>
                </Link>
            </section>

            <section class="flex container mx-auto flex-col gap-2">
                <Product
                    v-for="product in props.products.data"
                    :key="`${product.id}-${JSON.stringify(
                        product.specifications
                    )}`"
                    :product="product"
                    :specifications="product.specifications"
                    :specifications_all="props.specifications_all"
                />

                <div
                    v-if="props.products.total > 0"
                    class="flex justify-center gap-5 mt-8"
                >
                    <button
                        @click="goToPage(props.products.current_page - 1)"
                        :disabled="props.products.current_page === 1"
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
                                    props.products.current_page === 1
                                        ? '#CCCCCC'
                                        : '#000000'
                                "
                            />
                        </svg>
                    </button>
                    <div class="flex gap-1">
                        <template v-for="page in getVisiblePages()" :key="page">
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
                                        page === props.products.current_page,
                                }"
                                @click="goToPage(page)"
                                style="cursor: pointer"
                            >
                                {{ page }}
                            </span>
                        </template>
                    </div>
                    <button
                        @click="goToPage(props.products.current_page + 1)"
                        :disabled="props.products.current_page === totalPages"
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
                                    props.products.current_page === totalPages
                                        ? '#CCCCCC'
                                        : '#000000'
                                "
                            />
                        </svg>
                    </button>
                </div>
            </section>
        </main>
    </Layout>
</template>
