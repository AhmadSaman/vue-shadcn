<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { useCounterStore } from "@/stores/counter";

const counterStore = useCounterStore();
</script>

<template>
  <div class="custom-container mx-auto">
    <h1>Home Page</h1>
    <p>Welcome to the Home Page</p>
    <div>
      <p>{{ counterStore.name }}</p>
      <p>{{ counterStore.count }}</p>
      <Button @click="counterStore.increment">Increment</Button>
    </div>
  </div>
</template>
