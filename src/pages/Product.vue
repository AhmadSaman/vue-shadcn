<script lang="ts" setup>
import { getProduct, getRelatedProducts } from "@/api/products";
import ImgCarousel from "@/components/ImgCarousel.vue";
import ProductCard from "@/components/ProductCard.vue";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/toast";
import type { Product } from "@/general";
import { cn } from "@/lib/utils";
import { useFavoritesStore } from "@/stores/favorites";
import { AxiosError } from "axios";
import { ArrowLeft, Star } from "lucide-vue-next";
import { ref, onMounted, watch } from "vue";
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
    console.error("Failed to fetch related products:", error);
    if (error instanceof AxiosError)
      toast({
        variant: "destructive",
        title: error.response?.data.message[0],
      });
    isRelatedProductsLoading.value = false;
  }
};

const handleFavorite = (product: Product) => {
  favoritesStore.toggleFavorite(product);
};

const goBack = () => {
  router.go(-1); // This navigates back one step in history
};

watch(
  () => route.params.slug,
  (newSlug) => {
    fetchProduct(newSlug as string);
  },
);

onMounted(() => {
  fetchProduct(route.params.slug as string);
  fetchRelatedProducts(route.params.slug as string);
});
</script>

<template>
  <main class="custom-container mx-auto h-full overflow-hidden">
    <div class="flex flex-col gap-8">
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
        <div
          v-if="isProductLoading"
          class="flex h-[400px] w-full flex-col items-center sm:w-auto md:w-1/3"
        >
          <Skeleton class="size-full" />
        </div>
        <ImgCarousel v-else v-if="product" :images="product.images" />
        <div
          v-if="isProductLoading"
          class="flex h-[400px] w-full flex-col justify-center gap-4 rounded-3xl md:w-2/3"
        >
          <Skeleton class="size-full" />
        </div>
        <div
          v-else
          v-if="product"
          class="flex h-[400px] flex-1 flex-col gap-4 rounded-3xl border bg-white px-6 py-10"
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
        <p class="text-center text-lg font-medium">Related Products</p>
        <div class="flex w-full flex-wrap justify-center gap-2 self-center">
          <div
            v-if="isProductLoading"
            v-for="skeleton in Array(6).fill(0)"
            :key="skeleton"
          >
            <Skeleton class="h-[400px] w-[300px]" />
          </div>
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
