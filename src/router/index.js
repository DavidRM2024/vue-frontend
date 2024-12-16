import { createRouter, createWebHistory } from "vue-router";
import Login from "../assets/views/Login.vue";
import Register from "../assets/views/Register.vue";
import Products from "../assets/views/Products.vue";

const routes = [
  { path: "/login", name: "Login", component: Login, meta: { guest: true } },
  { path: "/register", name: "Register", component: Register, meta: { guest: true } },
  { path: "/products", name: "Products", component: Products, meta: { requiresAuth: true } },
  { path: "/:pathMatch(.*)*", redirect: "/login" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Protección de rutas
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token") !== null;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  } else if (to.meta.guest && isAuthenticated) {
    next("/products");
  } else {
    next();
  }
});

export default router;
