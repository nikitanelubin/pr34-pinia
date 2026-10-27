<template>
  <nav class="nav">
    <RouterLink to="/" class="nav-link">Каталог</RouterLink>
    <RouterLink to="/cart" class="nav-link">Корзина</RouterLink>
  </nav>
  <!-- сюда роутер подставляет страницу по текущему адресу -->
  <RouterView />
</template>

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
</style>
