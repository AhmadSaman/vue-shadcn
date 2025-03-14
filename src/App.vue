<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "@/components/Navbar.vue";
import Footer from "./components/footer.vue";
</script>

<template>
  <div
    class="mx-auto flex h-screen flex-col overflow-auto bg-[radial-gradient(#80808050_1px,transparent_1px)] font-poppins [background-size:16px_16px]"
  >
    <Navbar />
    <RouterView />
    <Footer />
  </div>
</template>

<style scoped></style>
