<script setup>
import { onMounted } from 'vue';

const props = defineProps({
    specification: {
        type: Object,
        required: true
    }
})

</script>

<template>
    <div v-for="(spec, index) in props.specification" class="flex items-center  gap-1">
        <span class="text-gray_icon/70 text-sm text-nowrap">{{ spec.value }}</span>
        <svg v-if="index !== Object.keys(props.specification).length - 1" width="6" height="6" viewBox="0 0 6 6"
            fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="3" cy="3" r="3" fill="#E3E3E3" />
        </svg>
    </div>

</template>