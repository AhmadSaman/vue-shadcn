<script setup lang="ts">
import { getProducts } from "@/api/products";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Product } from "@/general";
import { cn } from "@/lib/utils";
import { useFavoritesStore } from "@/stores/favorites";

import { ArrowLeft, ArrowRight, ExternalLink, Star } from "lucide-vue-next";
import { onMounted, ref, computed } from "vue";

const favoritesStore = useFavoritesStore();

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
const handleFavorite = (product: Product) => {
  favoritesStore.toggleFavorite(product);
};

onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <main class="custom-container mx-auto my-1 flex h-full flex-1 flex-col gap-3">
    <header class="flex flex-col gap-2">
      <h1 class="text-3xl font-medium md:text-4xl">Products Page</h1>
      <p>You can check all the Products here</p>
    </header>
    <section class="flex flex-1 rounded-3xl border bg-white p-4">
      <Table class="h-full">
        <TableHeader>
          <TableRow>
            <TableHead class="w-[100px] md:min-w-[150px]"> Image </TableHead>
            <TableHead class="w-[500px] md:w-full">Name</TableHead>
            <TableHead class="w-[50px] md:min-w-[300px]">Category</TableHead>
            <TableHead class="w-[50px] md:min-w-[100px]"> Actions </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody v-if="isProductLoading" class="h-full w-full overflow-auto">
          <TableRow v-for="skeleton in Array(pageSize).fill(0)" :key="skeleton">
            <TableCell>
              <div class="size-[84px]">
                <Skeleton class="size-full" />
              </div>
            </TableCell>
            <TableCell class="font-medium">
              <Skeleton class="size-full" />
            </TableCell>
            <TableCell class="text-nowrap">
              <Skeleton class="size-full" />
            </TableCell>
            <TableCell>
              <Skeleton class="size-full" />
            </TableCell>
          </TableRow>
        </TableBody>
        <TableBody
          v-else-if="products.length === 0 && isProductLoading === false"
          class="h-full"
        >
          <TableRow class="flex-1">
            <TableCell colspan="4" class="text-center align-middle">
              <div class="flex h-full items-center justify-center">
                <p>No products found</p>
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
            <TableCell>
              <div class="flex size-full items-center gap-2">
                <button>
                  <Star
                    @click="() => handleFavorite(product)"
                    class="transition-all duration-200 hover:scale-105"
                    :class="
                      cn(
                        favoritesStore.isFavorite(product.id)
                          ? 'fill-neutral-900'
                          : '',
                      )
                    "
                  />
                </button>
                <RouterLink :to="`/product/${product.slug}`">
                  <ExternalLink
                    class="transition-all duration-200 hover:scale-105"
                  />
                </RouterLink>
              </div>
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
