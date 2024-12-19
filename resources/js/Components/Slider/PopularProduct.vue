<script setup>
import { Link } from "@inertiajs/vue3";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { useContactModalStore } from "../../Stores/Modals/ContactStore";
import { ref, defineProps } from "vue";

const props = defineProps({
    products: Array,
});

const swiperInstance = ref(null);

const onSwiper = (swiper) => {
    swiperInstance.value = swiper;
};

const onSlideChange = () => {
    console.log("Слайд изменен");
};

const slideNext = () => {
    if (swiperInstance.value) {
        swiperInstance.value.slideNext();
    }
};
</script>

<template>
    <div class="relative container mx-auto">
        <Swiper
            :loop="false"
            :allow-touch-move="true"
            :breakpoints="{
                320: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
            }"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
        >
            <SwiperSlide v-for="product in products">
                <Link
                    :href="`/product/${product.id}`"
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
                    <div class="image-wrapper">
                        <img
                            :src="
                                '/storage/' +
                                (Array.isArray(product.images)
                                    ? product.images[0]
                                    : product.images)
                            "
                            alt=""
                        />
                    </div>
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
                        <button
                            @click.prevent="useContactModalStore().openModal()"
                            class="btn btn-secondary w-fit mt-auto"
                        >
                            Заказать звонок
                        </button>
                    </div>
                </Link>
            </SwiperSlide>
        </Swiper>
        <div
            class="absolute flex gap-2 transform -translate-x-1/2 z-10 w-full justify-between px-5 left-1/2 top-1/2"
        >
            <button
                v-if="swiperInstance?.activeIndex > 0"
                @click="swiperInstance?.slidePrev()"
                class="rounded-full bg-white h-10 w-10 flex items-center justify-center shadow-md"
            >
                <svg
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M7 1L1 7L7 13"
                        stroke="#7645EF"
                        stroke-width="1.6"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </button>
            <div v-else></div>
            <button
                v-if="
                    swiperInstance?.activeIndex <
                    swiperInstance?.slides?.length -
                        swiperInstance?.params?.slidesPerView
                "
                @click="swiperInstance?.slideNext()"
                class="rounded-full bg-white h-10 w-10 flex items-center justify-center shadow-md"
            >
                <svg
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M1 13L7 7L1 1"
                        stroke="#7645EF"
                        stroke-width="1.6"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </button>
        </div>
    </div>
</template>
