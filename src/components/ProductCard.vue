<script setup lang="ts">
import { toRefs } from "vue";
import { Button } from "./ui/button";
import Badge from "./ui/badge/Badge.vue";
import { Star } from "lucide-vue-next";
import { useFavoritesStore } from "@/stores/favorites";
import type { Product } from "@/general";

const props = defineProps<{ product: Product }>();
const { product } = toRefs(props);
const favoritesStore = useFavoritesStore();

const handleFavorite = (product: Product) => {
  if (favoritesStore.isFavorite(product.id)) {
    favoritesStore.removeFromFavorites(product.id);
  } else {
    favoritesStore.addToFavorites(product);
  }
};
</script>

<template>
  <div
    class="relative flex h-[400px] w-[300px] flex-col rounded-3xl border bg-white"
  >
    <Button
      class="absolute -right-2 -top-2 z-10 h-10 rounded-full p-6 shadow transition-all duration-200 hover:scale-105 hover:bg-neutral-100"
      variant="secondary"
      size="icon"
      @click="handleFavorite(product)"
    >
      <Star
        class="!size-5 text-neutral-900"
        :class="favoritesStore.isFavorite(product.id) ? 'fill-neutral-900' : ''"
      />
    </Button>
    <img :src="product.images[0]" alt="" srcset="" class="rounded-3xl p-4" />
    <div class="flex flex-col gap-1 text-center">
      <p class="line-clamp-1">
        {{ product.title }}
      </p>
      <p class="text-2xl font-medium">{{ product.price }}$</p>
      <div>
        <Badge class="rounded-3xl px-2 py-1" variant="secondary">{{
          product.category.name
        }}</Badge>
      </div>
    </div>
  </div>
</template>
