<script setup lang="ts">
import DataTable from "@/components/DataTable.vue";

import { useFavoritesStore } from "@/stores/favorites";

const favoritesStore = useFavoritesStore();
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
      <DataTable
        :products="favoritesStore.favoriteProducts"
        :is-loading="false"
      />
    </section>
  </main>
</template>
