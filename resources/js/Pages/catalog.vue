<script setup>
import Layout from '@/Layouts/Layout.vue';
import { Link } from '@inertiajs/vue3';
import { defineProps, ref } from 'vue'

const props = defineProps({
    categories: Object,
});

const expandedCategories = ref(new Set());

const toggleCategory = (categoryId) => {
    if (expandedCategories.value.has(categoryId)) {
        expandedCategories.value.delete(categoryId);
    } else {
        expandedCategories.value.add(categoryId);
    }
};

const isExpanded = (categoryId) => expandedCategories.value.has(categoryId);

const getTotalSubcategories = (category) => {
    const nodesSubcategoriesCount = category.nodes?.reduce((sum, nodeGroup) =>
        sum + nodeGroup.subcategories.length, 0) || 0;
    const simpleSubcategoriesCount = category.simple_subcategories?.length || 0;
    return nodesSubcategoriesCount + simpleSubcategoriesCount;
};

const getCurrentIndex = (category, nodeIndex, subcategoryIndex = 0) => {
    let index = 0;
    if (category.nodes) {
        for (let i = 0; i < nodeIndex; i++) {
            index += category.nodes[i].subcategories.length;
        }
        index += subcategoryIndex;
    }
    return index;
};
</script>

<template>
    <Layout>
        <main class="flex flex-col py-14 gap-12">
            <section class="flex flex-col items-center justify-center gap-6">
                <div class="flex items-center gap-3">
                    <Link href="/" class="text-gray_icon/70">Главная</Link>
                    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="3" cy="3" r="3" fill="#E3E3E3" />
                    </svg>

                    <span>Каталог</span>
                </div>
                <h1 class=" text-[56px] leading-none font-bold">Каталог</h1>
            </section>
            <section class="grid  md:grid-cols-3 lg:grid-cols-4 gap-11 container mx-auto">
                <div v-for="category in props.categories" class="catalog-item">
                    <img :src="`/storage/${category.image}`" :alt="category.name">
                    <div class="catalog-item-info">
                        <Link :href="`/category/${category.id}`"
                            class="catalog-item-title transition-all hover:text-purple">{{ category.name }}</Link>
                        <div class="catalog-items-container">
                            <transition-group name="list">
                                <template v-if="category.nodes">
                                    <template v-for="(nodeGroup, nodeIndex) in category.nodes"
                                        :key="`node-${nodeGroup.node.id}`">
                                        <div v-show="getCurrentIndex(category, nodeIndex) < 8 || isExpanded(category.id)"
                                            class="catalog-item-element-title">
                                            <p class="py-1">{{ nodeGroup.node.name }}</p>
                                            <div class="flex flex-col gap-3 pl-2">
                                                <Link v-for="(subcategory, subIndex) in nodeGroup.subcategories"
                                                    v-show="getCurrentIndex(category, nodeIndex, subIndex) < 8 || isExpanded(category.id)"
                                                    :key="`node-sub-${subcategory.id}`"
                                                    :href="`/category/${category.id}/${subcategory.id}`"
                                                    class="catalog-item-element">
                                                <span>{{ subcategory.name }}</span>
                                                <span>{{ subcategory.products_count }} шт.</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </template>
                                </template>

                                <Link v-for="(subcategory, index) in category.simple_subcategories"
                                    v-show="index < 8 || isExpanded(category.id)" :key="`simple-${subcategory.id}`"
                                    :href="`/category/${category.id}/${subcategory.id}`" class="catalog-item-element">
                                <span>{{ subcategory.name }}</span>
                                <span>{{ subcategory.products_count }} шт.</span>
                                </Link>
                            </transition-group>

                            <div v-if="getTotalSubcategories(category) > 8" @click="toggleCategory(category.id)"
                                class="flex items-center gap-1 text-purple_2 cursor-pointer mt-2">
                                {{ isExpanded(category.id) ? 'Скрыть' : 'Показать еще' }}
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8"
                                    fill="none" :class="{ 'rotate-180': isExpanded(category.id) }"
                                    class="transition-transform duration-300">
                                    <path d="M1 1L7 7L13 1" stroke="#7645EF" stroke-width="1.6" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </main>
    </Layout>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
    transition: all 0.1s ease;
    position: absolute;
    width: 100%;
}

.list-enter-from {
    opacity: 0;
    transform: translateY(10px);
}

.list-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

.catalog-items-container {
    position: relative;
    min-height: 100px;
}

.catalog-item-element-title,
.catalog-item-element {
    position: relative;
    z-index: 1;
    background: white;
}

svg {
    transition: transform 0.1s ease;
}
</style>
