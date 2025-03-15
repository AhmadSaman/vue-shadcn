import { MAX_VISITED_PRODUCTS } from "@/constants/visited";
import type { Product } from "@/general";
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useVisitedProductsStore = defineStore("visitedProducts", () => {
  const visitedProducts = ref<Product[]>([]);

  const getVisitedProducts = computed(() => visitedProducts.value);

  const isVisited = (productId: number) => {
    return visitedProducts.value.some((product) => product.id === productId);
  };

  function initializeStore() {
    const storedVisitedProducts = localStorage.getItem("visitedProducts");
    if (storedVisitedProducts) {
      visitedProducts.value = JSON.parse(storedVisitedProducts);
    }
  }

  function addToVisited(product: Product) {
    const filteredProducts = visitedProducts.value.filter(
      (p) => p.id !== product.id,
    );

    const updatedVisitedProducts = [product, ...filteredProducts];

    visitedProducts.value = updatedVisitedProducts.slice(
      0,
      MAX_VISITED_PRODUCTS,
    );

    saveToLocalStorage();
  }

  function clearVisitedProducts() {
    visitedProducts.value = [];
    saveToLocalStorage();
  }

  function removeFromVisited(productId: number) {
    visitedProducts.value = visitedProducts.value.filter(
      (p) => p.id !== productId,
    );
    saveToLocalStorage();
  }

  function saveToLocalStorage() {
    localStorage.setItem(
      "visitedProducts",
      JSON.stringify(visitedProducts.value),
    );
  }

  return {
    visitedProducts,
    getVisitedProducts,
    isVisited,
    initializeStore,
    addToVisited,
    clearVisitedProducts,
    removeFromVisited,
  };
});
