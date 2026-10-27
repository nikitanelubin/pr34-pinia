<template>
  <div class="page">
    <h1>Корзина</h1>

    <div class="cart-summary">
      <!-- count и sum - геттеры из store, пересчитываются сами -->
      <p><strong>Товаров:</strong> {{ cartStore.count }}</p>
      <p><strong>Итого:</strong> {{ cartStore.sum }} ₽</p>
    </div>

    <ul v-if="cartStore.items.length" class="cart-list">
      <li v-for="item in cartStore.items" :key="item.id" class="cart-item">
        <div class="item-info">
          <strong>{{ item.name }}</strong>
          <span>{{ item.price }} ₽ × {{ item.quantity }}</span>
        </div>
        <div class="item-actions">
          <button @click="updateQuantity(item.id, -1)" class="btn-qty">-</button>
          <button @click="updateQuantity(item.id, 1)" class="btn-qty">+</button>
          <button @click="removeFromCart(item.id)" class="btn-remove">✕</button>
        </div>
      </li>
    </ul>

    <p v-else>Корзина пуста.</p>

    <button v-if="cartStore.items.length" @click="clearCart" class="btn-danger">
      Очистить корзину
    </button>

    <p class="note">Обнови страницу - состояние сохранится благодаря localStorage.</p>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart.js'

const cartStore = useCartStore()

const removeFromCart = (id) => {
  cartStore.removeFromCart(id)
}

const updateQuantity = (id, delta) => {
  cartStore.updateQuantity(id, delta)
}

const clearCart = () => {
  cartStore.clearCart()
}
</script>

<style scoped>
.cart-summary {
  margin-bottom: 1.5rem;
  padding: 1rem;
  border-radius: 8px;
  background: #f5f5f5;
}

.cart-list {
  padding: 0;
  list-style: none;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  border-bottom: 1px solid #eee;
}

.item-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.item-actions button {
  margin-left: 0.4rem;
  padding: 0.3rem 0.6rem;
  cursor: pointer;
}

.btn-qty {
  border: 1px solid #ccc;
  background: #eee;
}

.btn-remove {
  border: none;
  background: #ffebee;
  color: #c62828;
}

.btn-danger {
  padding: 0.7rem 1.2rem;
  border: none;
  border-radius: 4px;
  background: #c62828;
  color: white;
  cursor: pointer;
}

.note {
  margin-top: 1.5rem;
  color: #666;
}
</style>
