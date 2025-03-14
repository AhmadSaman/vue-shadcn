<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "@/components/Navbar.vue";
import Footer from "./components/footer.vue";
</script>

<template>
  <div
    class="mx-auto flex h-screen flex-col bg-[radial-gradient(#80808030_1px,transparent_1px)] font-poppins [background-size:16px_16px]"
  >
    <Navbar />
    <main>
      <RouterView />
    </main>
  </div>
  <Footer />
</template>

<style scoped></style>
