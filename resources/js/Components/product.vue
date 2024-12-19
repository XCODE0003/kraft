<script setup>
import { computed, toRefs } from "vue";
import { Link } from "@inertiajs/vue3";
import { useProductStore } from "@/Stores/ProductStore";

const props = defineProps({
    product: {
        type: Object,
        required: true,
    },
    specifications: {
        type: Array,
        required: true,
    },
    specifications_all: {
        type: Array,
        required: true,
    },
});

const { specifications } = toRefs(props);
const productStore = useProductStore();
const specKeys = computed(() => [
    ...new Set(specifications.value.map((spec) => spec.key)),
]);

const specs = computed(() => {
    const result = {};
    specifications.value.forEach((spec) => {
        result[spec.key] = {
            value: spec.value,
            name: spec.name,
        };
    });
    return result;
});
</script>

<template>
    <Link :href="`/product/${product.id}`" class="product-item">
        <div class="flex items-center gap-6">
            <img
                :src="`/storage/${product.images[0]}`"
                class="w-20 h-20 rounded-lg"
            />
            <div class="flex flex-col gap-4 max-w-[300px]">
                <div class="flex flex-col gap-2">
                    <span class="text-gray_icon/70 text-sm">
                        ГОСТ {{ specs.gost?.value }}
                    </span>
                    <p>{{ product.name }}</p>
                </div>
                <div class="flex flex-wrap items-center font-semibold gap-2">
                    <template v-for="(spec, key) in specs" :key="key">
                        <div
                            v-if="key !== 'gost'"
                            class="flex items-center gap-1"
                        >
                            <span
                                v-tooltip.top="{
                                    value: productStore.getSpecification(
                                        key,
                                        props.specifications_all
                                    ),
                                    class: 'custom-tooltip',
                                    showDelay: 150,
                                    hideDelay: 100,
                                }"
                                class="text-gray_icon/70 text-sm text-nowrap"
                            >
                                {{ spec.value }}
                            </span>
                            <svg
                                v-if="
                                    key !==
                                    Object.keys(specs).filter(
                                        (k) => k !== 'gost'
                                    )[
                                        Object.keys(specs).filter(
                                            (k) => k !== 'gost'
                                        ).length - 1
                                    ]
                                "
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
                </div>
            </div>
        </div>
        <button class="btn btn-white">Связаться</button>
    </Link>
</template>
