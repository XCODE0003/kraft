<script setup>
import { onMounted } from "vue";

const props = defineProps({
    specification: {
        type: Object,
        required: true,
    },
});

const specification = props.specification.filter((item) => item.key !== "gost");
</script>

<template>
    <div
        v-tooltip.top="{
            value: 'Enter your username',
            class: 'custom-tooltip',
            showDelay: 150,
            hideDelay: 100,
        }"
        v-for="(spec, index) in specification"
        v-if="spec?.key !== 'gost'"
        class="flex items-center gap-1"
    >
        <span class="text-gray_icon/70 text-sm text-nowrap">{{
            spec.value
        }}</span>
        <svg
            v-if="index !== Object.keys(specification).length - 1"
            width="6"
            height="6"
            viewBox="0 0 6 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="3" cy="3" r="3" fill="#E3E3E3" />
        </svg>
    </div>
</template>
