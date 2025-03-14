<script setup lang="ts">
import { RouterLink } from "vue-router";
import { Button } from "./ui/button";
import { Menu, Moon, Star } from "lucide-vue-next";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { routes } from "@/routes";
</script>
<template>
  <nav
    class="custom-container mx-auto flex items-center justify-between gap-6 py-6"
  >
    <h1 class="text-2xl font-semibold md:text-lg">Shad/Vue</h1>
    <div class="hidden flex-1 justify-between md:flex">
      <ul class="flex items-center gap-2">
        <li v-for="link in routes" :key="link.route">
          <RouterLink
            :to="link.route"
            class="rounded-3xl px-6 py-3 transition-colors duration-200 hover:bg-neutral-100"
            active-class="bg-neutral-900 text-neutral-50 hover:bg-neutral-900/90"
            v-if="link.isNavLink"
            >{{ link.title }}</RouterLink
          >
        </li>
      </ul>
      <div class="ml-auto flex gap-2">
        <Button
          class="h-10 rounded-3xl px-6 py-3 transition-colors duration-200"
          variant="secondary"
          size="icon"
        >
          <Moon class="!size-5 text-neutral-900" />
        </Button>
        <Button
          class="group h-10 rounded-3xl px-6 py-3 transition-colors duration-200"
          variant="secondary"
          size="icon"
          as-child
        >
          <RouterLink to="/favorites">
            <Star class="!size-5 text-neutral-900" />
          </RouterLink>
        </Button>
      </div>
    </div>
    <div class="ml-auto flex md:hidden">
      <Sheet>
        <SheetTrigger as-child>
          <Button
            class="h-12 rounded-full px-8 py-4 transition-colors duration-200"
            variant="secondary"
            size="icon"
          >
            <Menu class="!size-6 text-neutral-900" />
          </Button>
        </SheetTrigger>
        <SheetContent class="flex w-full flex-col justify-between">
          <ul class="flex flex-1 flex-col items-center justify-center gap-16">
            <li v-for="link in routes" :key="link.route">
              <RouterLink
                :to="link.route"
                class="rounded-full px-12 py-5 text-2xl transition-colors duration-200 hover:bg-neutral-100"
                active-class="bg-neutral-900 text-neutral-50 hover:bg-neutral-900/90"
                v-if="link.isNavLink"
                >{{ link.title }}</RouterLink
              >
            </li>
          </ul>
          <div>
            <div class="ml-auto flex gap-2">
              <Button
                class="h-16 w-full rounded-full px-6 py-3 transition-colors duration-200"
                variant="secondary"
                size="icon"
              >
                <Moon class="!size-7" />
              </Button>
              <Button
                class="h-16 w-full rounded-full px-6 py-3 transition-colors duration-200"
                variant="secondary"
                size="icon"
                as-child
              >
                <RouterLink
                  to="/favorites"
                  active-class="bg-neutral-900 text-neutral-50 hover:bg-neutral-900/90"
                >
                  <Star class="!size-7" />
                </RouterLink>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  </nav>
</template>
