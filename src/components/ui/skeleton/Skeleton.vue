<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

interface SkeletonProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<SkeletonProps>();
</script>

<template>
  <div
    :class="
      cn(
        'animate-pulse rounded-3xl bg-neutral-100 dark:bg-neutral-50/10',
        props.class,
      )
    "
  />
</template>
