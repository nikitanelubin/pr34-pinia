<template>
  <nav class="nav">
    <RouterLink to="/" class="nav-link">Каталог</RouterLink>
    <RouterLink to="/cart" class="nav-link">Корзина</RouterLink>
  </nav>

  <!-- предупреждение из store (например, о лимите корзины) - видно на любой странице -->
  <p v-if="cartStore.warning" class="warning">⚠ {{ cartStore.warning }}</p>

  <!-- сюда роутер подставляет страницу по текущему адресу -->
  <RouterView />
</template>

<script setup>
import { useCartStore } from './stores/cart.js'

const cartStore = useCartStore()
</script>

<style scoped>
.nav {
  padding: 1rem 20px;
  border-bottom: 1px solid #eee;
}

.nav-link {
  margin-right: 1rem;
  color: #42b983;
  font-weight: bold;
  text-decoration: none;
}

/* ссылка на текущую страницу (класс добавляет сам RouterLink) */
.nav-link.router-link-exact-active {
  color: #333;
}

.warning {
  max-width: 860px;
  margin: 15px auto 0;
  padding: 10px 20px;
  border: 1px solid #ffb74d;
  border-radius: 6px;
  background: #fff3e0;
  color: #e65100;
}
</style>
