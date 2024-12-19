<script setup>
import { Link } from "@inertiajs/vue3";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { useContactModalStore } from "../../Stores/Modals/ContactStore";
import { ref, defineProps } from "vue";

const props = defineProps({
    images: Array,
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
    <div class="relative max-w-[630px] container mx-auto">
        <Swiper
            class="lg:w-[616px] rounded-3xl w-full"
            :loop="false"
            :allow-touch-move="false"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
        >
            <SwiperSlide v-for="image in images">
                <img
                    :src="'/storage/' + image"
                    alt=""
                    class="rounded-3xl w-full h-full object-cover"
                />
            </SwiperSlide>
        </Swiper>
        <div
            class="absolute flex gap-2 transform -translate-x-1/2 z-10 w-full justify-between px-5 left-1/2 top-1/2"
        >
            <button
                v-if="swiperInstance?.activeIndex > 0"
                @click="swiperInstance?.slidePrev()"
                class="rounded-full bg-white_blur h-12 w-12 flex items-center justify-center shadow-md"
            >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 32 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M11.1874 1.07612C11.8816 0.381854 13.0073 0.381854 13.7015 1.07612C14.3958 1.77038 14.3958 2.89601 13.7015 3.59028L6.06971 11.2221H30.2222C31.2041 11.2221 32 12.018 32 12.9999C32 13.9817 31.2041 14.7776 30.2222 14.7776H6.06971L13.7015 22.4095C14.3958 23.1037 14.3958 24.2293 13.7015 24.9236C13.0073 25.6179 11.8816 25.6179 11.1874 24.9236L0.520697 14.2569C-0.173569 13.5627 -0.173569 12.4371 0.520697 11.7428L11.1874 1.07612Z"
                        fill="white"
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
                class="rounded-full bg-white_blur h-12 w-12 flex items-center justify-center shadow-md"
            >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 32 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M20.8126 1.07612C20.1184 0.381854 18.9927 0.381854 18.2985 1.07612C17.6042 1.77038 17.6042 2.89601 18.2985 3.59028L25.9303 11.2221H1.77778C0.795938 11.2221 0 12.018 0 12.9999C0 13.9817 0.795938 14.7776 1.77778 14.7776H25.9303L18.2985 22.4095C17.6042 23.1037 17.6042 24.2293 18.2985 24.9236C18.9927 25.6179 20.1184 25.6179 20.8126 24.9236L31.4793 14.2569C32.1736 13.5627 32.1736 12.4371 31.4793 11.7428L20.8126 1.07612Z"
                        fill="white"
                    />
                </svg>
            </button>
        </div>
    </div>
</template>
