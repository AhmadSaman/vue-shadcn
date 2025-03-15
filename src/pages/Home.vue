<script setup lang="ts">
import { STATIC_IMAGES } from "@/constants/images";
import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-vue-next";
import { onMounted, ref, watch } from "vue";
import { getProducts } from "@/api/products";
import type { Product } from "@/general";
import ProductCard from "@/components/ProductCard.vue";

const products = ref<Product[]>([]);
const isProductLoading = ref(false);
const searchQuery = ref("");
const debounceTimeout = ref<number | null>(null);

const fetchProducts = async (search?: string) => {
  isProductLoading.value = true;
  try {
    const { data } = await getProducts({ search });
    products.value = data as Product[];
    isProductLoading.value = false;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    isProductLoading.value = false;
  }
};

const handleSearch = (value: string) => {
  if (debounceTimeout.value) {
    clearTimeout(debounceTimeout.value);
  }

  debounceTimeout.value = setTimeout(() => {
    fetchProducts(value);
  }, 300);
};

watch(searchQuery, (newValue) => {
  handleSearch(newValue);
});

onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <main class="custom-container mx-auto my-5 flex flex-col gap-8">
    <section class="relative flex items-center justify-center md:h-96">
      <div v-for="image in STATIC_IMAGES" :key="image.name">
        <img :src="image.src" :class="image.class" :alt="image.name" />
      </div>
      <div class="relative w-full items-center md:max-w-md">
        <Input
          id="search"
          type="text"
          v-model="searchQuery"
          placeholder="Search..."
          class="rounded-3xl bg-white p-6 pl-12 transition-all duration-200"
        />
        <span
          class="absolute inset-y-0 start-2 flex items-center justify-center px-2"
        >
          <Search class="text-muted-foreground size-6" />
        </span>
      </div>
    </section>
    <section class="flex-1">
      <div class="flex w-full flex-wrap justify-center gap-6 self-center">
        <div v-if="isProductLoading" class="text-center">
          <Loader2 class="animate-spin" />
        </div>
        <ProductCard
          v-else
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
    </section>
  </main>
</template>
