<template>
  <!-- шапка приложения -->
  <header class="header">
    <nav>
      <RouterLink to="/" class="nav-link">Каталог</RouterLink>
      <RouterLink to="/cart" class="nav-link">Корзина ({{ cartStore.count }})</RouterLink>
    </nav>

    <!-- счётчик из второго store. Он реактивный: меняется сам,
         как только на любой странице нажали на сердечко -->
    <span class="favorites">♥ Избранное: {{ favoritesStore.count }}</span>
  </header>

  <!-- предупреждение из store (например, о лимите корзины) - видно на любой странице -->
  <p v-if="cartStore.warning" class="warning">⚠ {{ cartStore.warning }}</p>

  <!-- сюда роутер подставляет страницу по текущему адресу -->
  <RouterView />
</template>

<script setup>
import { useCartStore } from './stores/cart.js'
import { useFavoritesStore } from './stores/favorites.js'

const cartStore = useCartStore()
const favoritesStore = useFavoritesStore()
</script>

<style scoped>
.header {
  /* ссылки слева, счётчики справа */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 20px;
  border-bottom: 1px solid #eee;
}

.favorites {
  padding: 4px 12px;
  border-radius: 12px;
  background: #fce4ec;
  color: #c2185b;
  font-weight: bold;
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
