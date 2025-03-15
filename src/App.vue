<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "@/components/Navbar.vue";
import Footer from "./components/Footer.vue";

import { useFavoritesStore } from "@/stores/favorites";
import { useVisitedProductsStore } from "./stores/visited";

import Toaster from "@/components/ui/toast/Toaster.vue";
import { useDarkModeStore } from "./stores/dark";

const visitedStore = useVisitedProductsStore();
const favoritesStore = useFavoritesStore();
const darkModeStore = useDarkModeStore();

darkModeStore.initializeStore();
visitedStore.initializeStore();
favoritesStore.initializeStore();
</script>

<template>
  <div
    class="mx-auto flex min-h-screen flex-col bg-[radial-gradient(#80808050_1px,transparent_1px)] font-poppins [background-size:16px_16px] dark:bg-neutral-800"
    :class="darkModeStore.isDarkMode ? 'dark' : ''"
  >
    <div class="flex flex-1 flex-col">
      <Navbar />
      <RouterView />
    </div>
    <Footer />
  </div>
  <Toaster />
</template>

<style scoped></style>
