<script lang="ts" setup>
import { getProduct, getRelatedProducts } from "@/api/products";
import ImgCarousel from "@/components/ImgCarousel.vue";
import ProductCard from "@/components/ProductCard.vue";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Product } from "@/general";
import { cn } from "@/lib/utils";
import { useFavoritesStore } from "@/stores/favorites";
import { ArrowLeft, Loader2, Star } from "lucide-vue-next";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const favoritesStore = useFavoritesStore();

const route = useRoute();
const router = useRouter();

const isProductLoading = ref(true);
const isRelatedProductsLoading = ref(true);
const product = ref<Product>();
const relatedProduct = ref<Product[]>([]);

const fetchProduct = async (slug: string) => {
  isProductLoading.value = true;
  try {
    const { data } = await getProduct(slug);
    product.value = data as Product;
    isProductLoading.value = false;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    isProductLoading.value = false;
  }
};

const fetchRelatedProducts = async (slug: string) => {
  isRelatedProductsLoading.value = true;
  try {
    const { data } = await getRelatedProducts(slug);
    relatedProduct.value = data as Product[];
    isRelatedProductsLoading.value = false;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    isRelatedProductsLoading.value = false;
  }
};

const handleFavorite = (product: Product) => {
  favoritesStore.toggleFavorite(product);
};

const goBack = () => {
  router.go(-1); // This navigates back one step in history
};

onMounted(() => {
  fetchProduct(route.params.slug as string);
  fetchRelatedProducts(route.params.slug as string);
});
</script>

<template>
  <main class="custom-container mx-auto h-full overflow-hidden">
    <div v-if="isProductLoading" class="flex flex-1 justify-center">
      <div class="flex h-full items-center justify-center">
        <Loader2 class="animate-spin" />
      </div>
    </div>
    <div v-else v-if="product" class="flex flex-col gap-8">
      <section class="flex gap-2">
        <Button
          class="rounded-full p-6 transition-colors duration-200"
          variant="secondary"
          size="icon"
          @click="goBack"
        >
          <ArrowLeft class="!size-6 text-neutral-900" />
        </Button>
        <p class="my-auto text-lg">Back</p>
      </section>
      <section class="flex flex-col gap-2 md:flex-row">
        <ImgCarousel :images="product.images" />

        <div
          class="flex flex-1 flex-col justify-center gap-4 rounded-3xl border bg-white p-6"
        >
          <div class="flex justify-between">
            <h3 class="text-6xl font-semibold">{{ product.price }}$</h3>
            <button>
              <Star
                @click="() => handleFavorite(product!)"
                class="size-9 transition-all duration-200 hover:scale-105"
                :class="
                  cn(
                    favoritesStore.isFavorite(product.id)
                      ? 'fill-neutral-900'
                      : '',
                  )
                "
              />
            </button>
          </div>
          <h1 class="text-2xl">{{ product.title }}</h1>
          <div>
            <Badge class="rounded-3xl px-4 py-2" variant="secondary">{{
              product.category.name
            }}</Badge>
          </div>
          <div class="flex flex-col gap-1">
            <p class="">Description:</p>
            <p class="line-clamp-6 text-sm text-neutral-500">
              {{ product.description }}
            </p>
          </div>
        </div>
      </section>
      <section class="flex w-full flex-col gap-2">
        <p class="text-center text-lg font-medium" v-if="relatedProduct">
          Related Products
        </p>
        <div class="flex w-full flex-wrap justify-center gap-2 self-center">
          <ProductCard
            v-for="product in relatedProduct"
            :key="product.id"
            :product="product"
          />
        </div>
      </section>
    </div>
  </main>
</template>
