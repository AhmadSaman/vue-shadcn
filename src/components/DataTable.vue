<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { RouterLink } from "vue-router";
import { Star, Eye } from "lucide-vue-next";
import type { Product } from "@/general";
import type { PropType } from "vue";
import { useFavoritesStore } from "@/stores/favorites";

const props = defineProps({
  products: {
    type: Array as PropType<Product[]>,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  pageSize: {
    type: Number,
  },
});

const favoritesStore = useFavoritesStore();
</script>

<template>
  <Table class="h-full">
    <TableHeader>
      <TableRow>
        <TableHead class="w-[100px] md:min-w-[150px]"> Image </TableHead>
        <TableHead class="w-[500px] md:w-full">Name</TableHead>
        <TableHead class="w-[50px] md:min-w-[100px]">Price</TableHead>
        <TableHead class="w-[50px] md:min-w-[200px]">Category</TableHead>
        <TableHead class="w-[50px] md:min-w-[100px]"> Actions </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody v-if="isLoading" class="h-full w-full overflow-auto">
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
    <TableBody v-else-if="products.length === 0" class="h-full">
      <TableRow class="flex-1">
        <TableCell colspan="4" class="text-center align-middle">
          <div class="flex h-full items-center justify-center">
            <p>No products found</p>
          </div>
        </TableCell>
      </TableRow>
    </TableBody>
    <TableBody v-else class="h-full w-full overflow-auto">
      <TableRow v-for="product in props.products" :key="product.id">
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
        <TableCell>{{ product.price }}</TableCell>
        <TableCell class="text-nowrap">{{ product.category.name }}</TableCell>

        <TableCell>
          <div class="flex size-full items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger as-child>
                  <button @click="() => favoritesStore.toggleFavorite(product)">
                    <Star
                      class="transition-all duration-200 hover:scale-105"
                      :class="
                        favoritesStore.isFavorite(product.id)
                          ? 'fill-neutral-900 dark:fill-neutral-50'
                          : ''
                      "
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p v-if="favoritesStore.isFavorite(product.id)">
                    Remove to Favorite
                  </p>
                  <p v-else>Add to Favorite</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger as-child>
                  <RouterLink :to="`/product/${product.slug}`">
                    <Eye class="transition-all duration-200 hover:scale-105" />
                  </RouterLink>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Open Product</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
