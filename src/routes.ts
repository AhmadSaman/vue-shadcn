import Categories from "@/pages/Categories.vue";
import Home from "@/pages/Home.vue";
import Products from "@/pages/Products.vue";
import { createRouter, createWebHistory } from "vue-router";

export const routes = [
  {
    title: "Home",
    route: "/",
    component: Home,
    isNavLink: true,
  },
  {
    title: "Categories",
    route: "/categories",
    component: Categories,
    isNavLink: true,
  },
  {
    title: "Products",
    route: "/products",
    component: Products,
    isNavLink: true,
  },
];

const routesConfig = routes.map((route) => ({
  path: route.route,
  component: route.component,
}));

export const router = createRouter({
  history: createWebHistory(),
  routes: routesConfig,
});
