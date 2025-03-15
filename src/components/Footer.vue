<script setup lang="ts">
import { routes } from "@/routes";
</script>

<template>
  <div class="bg-neutral-900">
    <div
      class="custom-container mx-auto flex items-center justify-between bg-neutral-900 p-2 text-neutral-50"
    >
      <p>&copy; 2025 <a href="https://weisi.dev" class="text-">Ahmad</a></p>
      <ul class="flex gap-4">
        <li v-for="route in routes" :key="route.route">
          <RouterLink
            v-if="route.isNavLink"
            :to="route.route"
            class="text-neutral-500"
            active-class="!text-neutral-50"
            >{{ route.title }}</RouterLink
          >
        </li>
      </ul>
    </div>
  </div>
</template>
