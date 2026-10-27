import { createRouter, createWebHistory } from 'vue-router'
import CatalogPage from '../pages/CatalogPage.vue'
import CartPage from '../pages/CartPage.vue'

const routes = [
  { path: '/', name: 'Catalog', component: CatalogPage },
  { path: '/cart', name: 'Cart', component: CartPage }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
