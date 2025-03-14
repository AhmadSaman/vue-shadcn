<script setup lang="ts">
import { getProducts } from "@/api/products";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Product } from "@/general";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-vue-next";
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
    class="custom-container mx-auto my-1 flex h-full flex-col gap-3 overflow-hidden"
  >
    <header class="flex flex-col gap-2">
      <h1 class="text-3xl font-medium md:text-4xl">Products Page</h1>
      <p>You can check all the Products here</p>
    </header>
    <section
      class="flex h-full flex-1 overflow-auto rounded-3xl border bg-white p-4"
    >
      <Table class="h-full w-full flex-1 overflow-auto">
        <TableHeader>
          <TableRow>
            <TableHead class="w-[150px]"> Image </TableHead>
            <TableHead class="w-[350px]">Name</TableHead>
            <TableHead class="w-[100px]">Category</TableHead>
            <TableHead class="text-right"> Favorite </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody v-if="isProductLoading" class="h-full">
          <TableRow>
            <TableCell colspan="4" class="h-full text-center align-middle">
              <div class="flex h-full items-center justify-center">
                <Loader2 class="animate-spin" />
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
        <TableBody v-else-if="products.length === 0" class="h-full">
          <TableRow>
            <TableCell colspan="4" class="h-full text-center align-middle">
              <div class="flex h-full items-center justify-center">
                No products found
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
        <TableBody v-else class="h-full w-full overflow-auto">
          <TableRow v-for="product in products" :key="product.id">
            <TableCell>
              <div class="size-[84px]">
                <img
                  :src="product.images[0]"
                  loading="lazy"
                  :alt="product.title"
                  class="size-full rounded-2xl object-cover"
                />
              </div>
            </TableCell>
            <TableCell class="font-medium">{{ product.title }}</TableCell>
            <TableCell class="text-nowrap">{{
              product.category.name
            }}</TableCell>
            <TableCell class="text-right">
              {{ "fav" }}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>

    <div class="flex items-center justify-between">
      <div class="rounded-3xl border bg-white p-4 text-sm text-gray-600">
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

      <div class="flex items-center gap-1 rounded-3xl border bg-white p-2">
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
