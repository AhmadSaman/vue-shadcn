import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useDarkModeStore = defineStore("darkMode", () => {
  const isDarkMode = ref(false);

  const getDarkMode = computed(() => isDarkMode.value);

  function initializeStore() {
    const storedDarkMode = localStorage.getItem("darkMode");

    if (storedDarkMode !== null) {
      isDarkMode.value = JSON.parse(storedDarkMode);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      isDarkMode.value = prefersDark;
      saveToLocalStorage();
    }

    applyTheme();
  }

  function toggleDarkMode() {
    isDarkMode.value = !isDarkMode.value;
    saveToLocalStorage();
    applyTheme();
  }

  function setDarkMode(value: boolean) {
    isDarkMode.value = value;
    saveToLocalStorage();
    applyTheme();
  }

  function saveToLocalStorage() {
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode.value));
  }

  function applyTheme() {
    if (isDarkMode.value) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  return {
    isDarkMode,
    getDarkMode,
    initializeStore,
    toggleDarkMode,
    setDarkMode,
  };
});
