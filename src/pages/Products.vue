<script setup lang="ts">
import { getProducts } from "@/api/products";
import DataTable from "@/components/DataTable.vue";
import { Button } from "@/components/ui/button";

import { toast } from "@/components/ui/toast";

import type { Product } from "@/general";
import { AxiosError } from "axios";

import { ArrowLeft, ArrowRight } from "lucide-vue-next";
import { onMounted, ref, computed } from "vue";

const products = ref<Product[]>([]);
const isProductLoading = ref(false);
const currentPage = ref(1);
const pageSize = ref(10);

const offset = computed(() => (currentPage.value - 1) * pageSize.value);
const limit = computed(() => pageSize.value);

const fetchProducts = async () => {
  isProductLoading.value = true;
  try {
    const { data } = await getProducts({
      offset: offset.value,
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

const changePage = (page: number) => {
  if (page >= 1) {
    currentPage.value = page;
    fetchProducts();
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

onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <main
    class="custom-container mx-auto my-10 flex h-full flex-1 flex-col gap-8"
  >
    <header class="flex flex-col gap-2">
      <h1 class="text-3xl font-medium md:text-4xl">Products Page</h1>
      <p>You can check all the Products here</p>
    </header>
    <section
      class="flex flex-1 rounded-3xl border bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800"
    >
      <DataTable
        :products="products"
        :is-loading="isProductLoading"
        :page-size="pageSize"
      />
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
