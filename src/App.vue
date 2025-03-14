<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "@/components/Navbar.vue";
import Footer from "./components/footer.vue";

import { useFavoritesStore } from "@/stores/favorites";
const favoritesStore = useFavoritesStore();
favoritesStore.initializeStore();
</script>

<template>
  <div
    class="mx-auto flex min-h-screen flex-col bg-[radial-gradient(#80808050_1px,transparent_1px)] font-poppins [background-size:16px_16px]"
  >
    <div class="flex flex-1 flex-col">
      <Navbar />
      <RouterView />
    </div>
    <Footer />
  </div>
</template>

<style scoped></style>
