<script setup lang="ts">
import { getCategories, getCategoryProducts } from "@/api/categories";
import DataTable from "@/components/DataTable.vue";
import { Button } from "@/components/ui/button";
import Skeleton from "@/components/ui/skeleton/Skeleton.vue";

import { toast } from "@/components/ui/toast";

import type { Category, Product } from "@/general";
import { AxiosError } from "axios";

import { ArrowLeft, ArrowRight } from "lucide-vue-next";
import { onMounted, ref, computed } from "vue";

const products = ref<Product[]>([]);
const isProductLoading = ref(false);

const categories = ref<Category[]>([]);
const selectedCategories = ref("");
const isCategoriesLoading = ref(false);

const currentPage = ref(1);
const pageSize = ref(10);

const offset = computed(() => (currentPage.value - 1) * pageSize.value);
const limit = computed(() => pageSize.value);

const fetchProducts = async (category: string) => {
  isProductLoading.value = true;
  try {
    const { data } = await getCategoryProducts({
      offset: offset.value,
      slug: category,
      limit: limit.value,
    });
    products.value = data as Product[];
    isProductLoading.value = false;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    if (error instanceof AxiosError)
      toast({
        variant: "destructive",
        title: error.response?.data.message[0],
      });
    isProductLoading.value = false;
  }
};

const fetchCategories = async () => {
  isCategoriesLoading.value = true;
  try {
    const { data } = await getCategories();
    categories.value = data as Category[];
    isCategoriesLoading.value = false;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    if (error instanceof AxiosError)
      toast({
        variant: "destructive",
        title: error.response?.data.message[0],
      });
    isCategoriesLoading.value = false;
  }
};

const changePage = (page: number) => {
  if (page >= 1) {
    currentPage.value = page;
    fetchProducts(selectedCategories.value);
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    changePage(currentPage.value - 1);
  }
};

const nextPage = () => {
  if (currentPage.value) {
    changePage(currentPage.value + 1);
  }
};

const handleCategoryChange = (slug: string) => {
  selectedCategories.value = slug;
  currentPage.value = 1;
  fetchProducts(slug);
};

onMounted(() => {
  fetchCategories();
});
</script>

<template>
  <main
    class="custom-container mx-auto my-10 flex h-full flex-1 flex-col gap-8"
  >
    <header class="flex flex-col gap-2">
      <h1 class="text-3xl font-medium md:text-4xl">Categories Page</h1>
      <p>You can filter by Category and see all the Products here</p>
    </header>
    <section class="flex flex-1 flex-col gap-4">
      <section class="h-12">
        <div v-if="isCategoriesLoading">
          <div class="flex gap-4 overflow-auto">
            <div v-for="skeleton in Array(6).fill(0)" :key="skeleton">
              <Skeleton class="h-full w-[100px] rounded-3xl px-9 py-6" />
            </div>
          </div>
        </div>
        <div v-else>
          <div class="flex gap-4 overflow-auto">
            <Button
              v-for="category in categories"
              :key="category.slug"
              @click="() => handleCategoryChange(category.slug)"
              class="rounded-3xl px-9 py-6 transition-all duration-200"
              :variant="
                selectedCategories === category.slug ? 'default' : 'outline'
              "
            >
              {{ category.name }}
            </Button>
          </div>
        </div>
      </section>
      <section
        class="flex flex-1 rounded-3xl border bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800"
      >
        <DataTable
          :products="products"
          :is-loading="isProductLoading"
          :page-size="pageSize"
        />
      </section>
    </section>
    <div class="flex items-center justify-between">
      <div
        class="rounded-3xl border bg-neutral-50 p-4 text-sm text-gray-600 dark:border-neutral-700 dark:bg-neutral-800"
      >
        <span v-if="products.length > 0">
          Showing {{ (currentPage - 1) * pageSize + 1 }}-{{
            Math.min(
              currentPage * pageSize,
              (currentPage - 1) * pageSize + products.length,
            )
          }}
          items
        </span>
        <span v-else>No items</span>
      </div>

      <div
        class="flex items-center gap-1 rounded-3xl border bg-neutral-50 p-2 dark:border-neutral-700 dark:bg-neutral-800"
      >
        <Button
          variant="secondary"
          size="icon"
          @click="prevPage"
          :disabled="currentPage <= 1"
          class="rounded-full"
        >
          <ArrowLeft />
        </Button>

        <div class="mx-2 flex items-center gap-1">
          <p>{{ currentPage }}</p>
        </div>
        <Button
          variant="secondary"
          size="icon"
          @click="nextPage"
          :disabled="!products.length"
          class="rounded-full"
        >
          <ArrowRight />
        </Button>
      </div>
    </div>
  </main>
</template>
