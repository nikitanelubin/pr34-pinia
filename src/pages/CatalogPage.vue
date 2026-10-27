<template>
  <div class="page">
    <h1>Каталог товаров</h1>
    <p>Перейди в <RouterLink to="/cart">корзину</RouterLink>, чтобы проверить работу состояния.</p>

    <div class="products-grid">
      <div v-for="product in products" :key="product.id" class="product-card">
        <h3>{{ product.name }}</h3>
        <p>{{ product.price }} ₽</p>
        <button @click="addToCart(product)" class="btn-add">В корзину</button>
        <!-- сердечко: закрашенное, если товар в избранном -->
        <button
          @click="favoritesStore.toggleFavorite(product.id)"
          class="btn-fav"
          :class="{ active: isFavorite(product.id) }"
        >
          {{ isFavorite(product.id) ? '♥' : '♡' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart.js'
import { useFavoritesStore } from '../stores/favorites.js'

// получаем хранилище корзины - то же самое, что и на странице корзины
const cartStore = useCartStore()
const favoritesStore = useFavoritesStore()

const products = [
  { id: 1, name: 'Ноутбук', price: 75000 },
  { id: 2, name: 'Смартфон', price: 35000 },
  { id: 3, name: 'Наушники', price: 5000 },
  { id: 4, name: 'Клавиатура', price: 4000 }
]

// компонент сам корзину не меняет - только вызывает action из store
const addToCart = (product) => {
  cartStore.addToCart(product)
}

// includes проверяет, есть ли id в массиве избранного
const isFavorite = (id) => {
  return favoritesStore.ids.includes(id)
}
</script>

<style scoped>
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.product-card {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
}

/* одинаковая высота и vertical-align: middle - кнопки "В корзину" и сердечко
   стоят ровно на одной линии (у символов ♡ и ♥ разная высота) */
.btn-add,
.btn-fav {
  height: 34px;
  vertical-align: middle;
}

.btn-add {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: #42b983;
  color: white;
  cursor: pointer;
}

.btn-add:hover {
  background: #3aa875;
}

.btn-fav {
  margin-left: 0.5rem;
  padding: 0.4rem 0.7rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  color: #e91e63;
  font-size: 16px;
  cursor: pointer;
}

.btn-fav.active {
  border-color: #e91e63;
  background: #fce4ec;
}
</style>
