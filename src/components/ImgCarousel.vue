<script setup lang="ts">
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { watchOnce } from "@vueuse/core";
import { ref, defineProps } from "vue";

const props = defineProps<{
  images: string[];
}>();

const emblaMainApi = ref<CarouselApi>();
const emblaThumbnailApi = ref<CarouselApi>();
const selectedIndex = ref(0);

function onSelect() {
  if (!emblaMainApi.value || !emblaThumbnailApi.value) return;
  selectedIndex.value = emblaMainApi.value.selectedScrollSnap();
  emblaThumbnailApi.value.scrollTo(emblaMainApi.value.selectedScrollSnap());
}

function onThumbClick(index: number) {
  if (!emblaMainApi.value || !emblaThumbnailApi.value) return;
  emblaMainApi.value.scrollTo(index);
}

watchOnce(emblaMainApi, (emblaMainApi) => {
  if (!emblaMainApi) return;

  onSelect();
  emblaMainApi.on("select", onSelect);
  emblaMainApi.on("reInit", onSelect);
});
</script>

<template>
  <div class="flex w-[full] flex-col items-center sm:w-auto">
    <Carousel
      class="relative w-full max-w-xs flex-1"
      @init-api="(val) => (emblaMainApi = val)"
    >
      <CarouselContent>
        <CarouselItem v-for="(url, index) in props.images" :key="index">
          <img loading="lazy" :src="url" alt="img" class="rounded-3xl" />
        </CarouselItem>
      </CarouselContent>
    </Carousel>

    <Carousel
      class="relative w-full max-w-xs"
      @init-api="(val) => (emblaThumbnailApi = val)"
    >
      <CarouselContent class="ml-0 flex justify-center gap-1">
        <CarouselItem
          v-for="(url, index) in props.images"
          :key="index"
          class="basis-1/4 cursor-pointer pl-0"
          @click="onThumbClick(index)"
        >
          <div
            class="p-1 transition-all duration-200"
            :class="index === selectedIndex ? '' : 'opacity-50'"
          >
            <img loading="lazy" :src="url" alt="img" class="rounded-xl" />
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  </div>
</template>
