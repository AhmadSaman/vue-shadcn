import { toast } from "@/components/ui/toast";
import type { Product } from "@/general";
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useFavoritesStore = defineStore("favorites", () => {
  const favoriteProducts = ref<Product[]>([]);
  const getFavorites = computed(() => favoriteProducts.value);

  const isFavorite = (productId: number) => {
    return favoriteProducts.value.some((product) => product.id === productId);
  };

  function initializeStore() {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      favoriteProducts.value = JSON.parse(storedFavorites);
    }
  }

  function addToFavorites(product: Product) {
    if (!isFavorite(product.id)) {
      favoriteProducts.value.push(product);
      saveToLocalStorage();
      toast({
        title: "Added to favorites list successfully",
      });
    }
  }

  function removeFromFavorites(productId: number) {
    favoriteProducts.value = favoriteProducts.value.filter(
      (product) => product.id !== productId,
    );
    saveToLocalStorage();
    toast({
      title: "Removed from favorites list",
    });
  }

  function toggleFavorite(product: Product) {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  }

  function saveToLocalStorage() {
    localStorage.setItem("favorites", JSON.stringify(favoriteProducts.value));
  }

  return {
    favoriteProducts,
    getFavorites,
    isFavorite,
    initializeStore,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
  };
});
