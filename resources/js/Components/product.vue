<script setup>
import { Link } from '@inertiajs/vue3';
import Specification from '@/Components/specification.vue';
const props = defineProps({
    product: {
        type: Object,
        required: true
    }
})
</script>

<template>

    <Link :href="route('product', props.product.id)" class="product-item">
    <div class="flex items-center gap-6 ">
        <img :src="'/storage/' + props.product?.images?.split(',')[0]" class="w-20 h-20 ">
        <div class="flex flex-col gap-4 max-w-[300px]">
            <div class="flex flex-col gap-2">
                <span v-if="props.product?.specifications?.find(item => item.key === 'gost')?.value"
                    class="text-gray_icon/70 text-sm">
                    ГОСТ
                    {{
                        props.product?.specifications?.find(item => item.key === 'gost')?.value }}</span>
                <p>{{ props.product.name }}</p>
            </div>
            <div class="flex items-center font-semibold gap-2">
                <Specification :specification="props.product.specifications" />
            </div>
        </div>
    </div>
    <button class="btn btn-white">Связаться</button>
    </Link>
</template>