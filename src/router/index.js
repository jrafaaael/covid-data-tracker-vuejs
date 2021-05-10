import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home/Home.vue'
import World from "../views/World/World.vue"
import Country from "../views/Country/Country.vue";
import NotFound from "../views/404/NotFound.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/world',
    name: 'World',
    component: World
  },
  {
    path: '/country/:country',
    name: 'Country',
    component: Country,
    props: true
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
