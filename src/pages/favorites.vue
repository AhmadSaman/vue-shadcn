<script setup lang="ts">
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
import { Star } from "lucide-vue-next";

const favoritesStore = useFavoritesStore();

const handleFavorite = (product: Product) => {
  favoritesStore.toggleFavorite(product);
};
</script>
<template>
  <main
    class="custom-container mx-auto my-10 flex h-full flex-1 flex-col gap-8"
  >
    <header class="flex flex-col gap-2">
      <h1 class="text-3xl font-medium md:text-4xl">Favorites Page</h1>
      <p>You can see all the Favorite Products here</p>
    </header>
    <section
      class="flex flex-1 rounded-3xl border bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800"
    >
      <Table class="h-full">
        <TableHeader>
          <TableRow>
            <TableHead class="w-[100px] md:min-w-[150px]"> Image </TableHead>
            <TableHead class="w-[500px] md:w-full">Name</TableHead>
            <TableHead class="w-[50px] md:min-w-[300px]">Category</TableHead>
            <TableHead class="w-[50px] md:min-w-[100px]"> Favorite </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody
          v-if="favoritesStore.favoriteProducts.length === 0"
          class="h-full"
        >
          <TableRow class="flex-1">
            <TableCell colspan="4" class="text-center align-middle">
              <div class="flex h-full items-center justify-center">
                <p>No favorite products found</p>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
        <TableBody v-else class="h-full w-full overflow-auto">
          <TableRow
            v-for="product in favoritesStore.favoriteProducts"
            :key="product.id"
          >
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
              <button>
                <Star
                  @click="() => handleFavorite(product)"
                  :class="
                    cn(
                      favoritesStore.isFavorite(product.id)
                        ? 'fill-neutral-900 dark:fill-neutral-50'
                        : '',
                    )
                  "
                />
              </button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  </main>
</template>
