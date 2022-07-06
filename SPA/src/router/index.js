import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Product from "@/components/Product";
import Shop from "@/components/Shop";
import Cart from "@/components/Cart";

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    redirect: "/shop",
  },
  {
    path: "/shop",
    component: Shop,
    name: "Shop",
  },
  {
    path: "/product/:id",
    component: Product,
    name: "Product",
    props: true,
  },
  {
    path: "/cart",
    component: Cart,
    name: "Cart",
  },
  {
    path: "*",
    redirect: "/shop",
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
