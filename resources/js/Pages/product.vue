<script setup>
import Layout from "@/Layouts/Layout.vue";
import { Link } from "@inertiajs/vue3";
import { useContactModalStore } from "@/Stores/Modals/ContactStore";
import ImageSlider from "@/Components/Slider/imageSlider.vue";
import { useProductStore } from "@/Stores/ProductStore";

const props = defineProps({
    product: Object,
    category: Object,
    subcategory: Object,
});
const productStore = useProductStore();

const historyViews =
    JSON.parse(localStorage.getItem("history_views"))?.reverse() || [];
productStore.addToHistoryViews(props.product);
</script>

<template>
    <Layout>
        <main class="flex flex-col py-14 gap-12">
            <section
                class="hidden md:flex flex-col items-start container mx-auto justify-start gap-6"
            >
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
                    <Link
                        class="text-gray_icon/70"
                        :href="route('category', props.category.id)"
                        >{{ props.category.name }}</Link
                    >
                    <svg
                        width="6"
                        height="6"
                        viewBox="0 0 6 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="3" cy="3" r="3" fill="#E3E3E3" />
                    </svg>
                    <Link
                        class="text-gray_icon/70"
                        :href="
                            route('category', {
                                category: props.category.id,
                                subcategory: props.subcategory.id,
                            })
                        "
                        >{{ props.subcategory.name }}</Link
                    >
                    <svg
                        width="6"
                        height="6"
                        viewBox="0 0 6 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="3" cy="3" r="3" fill="#E3E3E3" />
                    </svg>
                    <span>{{ props.product.name }}</span>
                </div>
            </section>
            <section class="flex container mx-auto justify-between flex-wrap">
                <!-- <img
                    class="lg:w-[616px] rounded-3xl w-full"
                    :src="
                        '/storage/' +
                        (Array.isArray(props.product.images)
                            ? props.product.images[0]
                            : props.product.images)
                    "
                    alt=""
                /> -->
                <ImageSlider :images="props.product.images" />
                <div
                    class="flex flex-col py-6 gap-8 justify-between w-full lg:w-[552px]"
                >
                    <div class="flex flex-col">
                        <div class="flex flex-col gap-4">
                            <span
                                class="text-3xl lg:text-[56px] leading-none font-bold"
                            >
                                {{ props.product.name }}
                            </span>
                            <span class="text-base font-normal lg:text-xl">
                                {{ props.product.description }}
                            </span>
                        </div>
                    </div>
                    <div
                        class="flex flex-col border-t-2 border-b-2 border-solid border-border py-6 gap-3"
                    >
                        <div
                            v-for="spec in props.product?.specifications"
                            class="catalog-item-element"
                        >
                            <span class="text-base text-gray-1 font-semibold">
                                {{ spec.name }}
                            </span>
                            <span class="text-base text-gray-1 font-semibold">
                                {{ spec.value }}
                            </span>
                        </div>
                    </div>
                    <button
                        @click="useContactModalStore().openModal()"
                        class="btn btn-primary justify-center py-4"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                        >
                            <path
                                d="M5.08685 5.90223C5.55085 6.86865 6.18338 7.77441 6.98443 8.57546C7.78548 9.37651 8.69124 10.009 9.65765 10.473C9.74078 10.5129 9.78234 10.5329 9.83494 10.5482C10.0218 10.6027 10.2513 10.5636 10.4096 10.4502C10.4542 10.4183 10.4923 10.3802 10.5685 10.304C10.8016 10.071 10.9181 9.95443 11.0353 9.87824C11.4772 9.59091 12.0469 9.59091 12.4889 9.87824C12.606 9.95443 12.7226 10.071 12.9556 10.304L13.0856 10.434C13.4399 10.7882 13.617 10.9654 13.7132 11.1556C13.9046 11.534 13.9046 11.9809 13.7132 12.3592C13.617 12.5495 13.4399 12.7266 13.0856 13.0809L12.9805 13.186C12.6274 13.5391 12.4508 13.7156 12.2108 13.8505C11.9445 14.0001 11.5308 14.1077 11.2253 14.1068C10.95 14.1059 10.7619 14.0525 10.3856 13.9457C8.36334 13.3718 6.45509 12.2888 4.86311 10.6968C3.27112 9.10479 2.18814 7.19655 1.61416 5.17429C1.50735 4.79799 1.45395 4.60984 1.45313 4.33455C1.45222 4.02906 1.5598 3.6154 1.70941 3.34907C1.84424 3.10905 2.02078 2.9325 2.37386 2.57942L2.47895 2.47433C2.83325 2.12004 3.0104 1.94289 3.20065 1.84666C3.57903 1.65528 4.02587 1.65528 4.40424 1.84666C4.5945 1.94289 4.77164 2.12004 5.12594 2.47433L5.25585 2.60424C5.48892 2.83732 5.60546 2.95385 5.68165 3.07104C5.96898 3.51296 5.96898 4.08268 5.68165 4.52461C5.60546 4.6418 5.48892 4.75833 5.25585 4.9914C5.17964 5.06761 5.14154 5.10571 5.10965 5.15026C4.99631 5.30854 4.95717 5.53805 5.01165 5.72495C5.02698 5.77755 5.04694 5.81911 5.08685 5.90223Z"
                                stroke="white"
                                stroke-width="1.6"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                        Заказать звонок
                    </button>
                </div>
            </section>
            <section class="container mx-auto flex flex-col gap-12">
                <div class="flex justify-between items-center">
                    <h2 class="title">Вы недавно смотрели</h2>
                </div>

                <div class="flex overflow-x-auto md:grid grid-cols-4 gap-4">
                    <Link
                        :href="`/product/${product.id}`"
                        v-for="product in historyViews"
                        class="product-card shrink-0"
                    >
                        <p
                            v-if="
                                product.specifications.find(
                                    (item) => item.key === 'gost'
                                )?.value
                            "
                            class="gost"
                        >
                            ГОСТ
                            {{
                                product.specifications.find(
                                    (item) => item.key === "gost"
                                )?.value
                            }}
                        </p>
                        <img
                            class="w-full h-full object-cover rounded-3xl"
                            :src="
                                '/storage/' +
                                (Array.isArray(product.images)
                                    ? product.images[0]
                                    : product.images)
                            "
                        />
                        <div class="flex flex-col h-full justify-between gap-4">
                            <p class="text-gray_icon text-xs">
                                {{
                                    product.specifications
                                        .map((spec) => spec.value)
                                        .join(", ")
                                }}
                            </p>
                            <div class="product-text">
                                <p>{{ product.name }}</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </section>
        </main>
    </Layout>
</template>
