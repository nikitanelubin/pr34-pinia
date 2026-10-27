import { defineStore } from 'pinia'

// лимит корзины: не больше 10 товаров суммарно.
// export - чтобы показать это число на странице корзины
export const MAX_ITEMS = 10

// defineStore создаёт хранилище. 'cart' - его имя (видно в Vue DevTools).
// useCartStore - функция, через которую компоненты получают это хранилище
export const useCartStore = defineStore('cart', {
  // state - данные хранилища. Это функция, которая возвращает объект
  state: () => ({
    // при запуске берём корзину из localStorage.
    // JSON.parse превращает текст обратно в массив, а если там пусто - берём []
    items: JSON.parse(localStorage.getItem('cart_items')) || [],
    // текст предупреждения (пустая строка - предупреждения нет)
    warning: ''
  }),

  // getters - вычисляемые значения (как computed), всегда актуальные
  getters: {
    // Пересчитываем количество и сумму на основе items.
    // reduce проходит по всем товарам и накапливает одно число (начиная с 0)
    count: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    sum: (state) => state.items.reduce((total, item) => total + item.price * item.quantity, 0)
  },

  // actions - функции, которые меняют state. Все изменения корзины - только через них
  actions: {
    addToCart(product) {
      // проверка лимита: корзина уже полная - показываем предупреждение и не добавляем
      if (this.count >= MAX_ITEMS) {
        this.warning = `В корзине может быть не больше ${MAX_ITEMS} товаров.`
        return
      }
      this.warning = ''

      // ищем, есть ли уже такой товар в корзине
      const existing = this.items.find((i) => i.id === product.id)
      if (existing) {
        existing.quantity += 1
      } else {
        this.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1
        })
      }
      this.saveToLocalStorage()
    },

    removeFromCart(id) {
      this.warning = ''
      // filter оставляет все товары, кроме товара с этим id
      this.items = this.items.filter((i) => i.id !== id)
      this.saveToLocalStorage()
    },

    clearCart() {
      this.warning = ''
      this.items = []
      this.saveToLocalStorage()
    },

    // delta: +1 - увеличить количество, -1 - уменьшить
    updateQuantity(id, delta) {
      const item = this.items.find((i) => i.id === id)
      if (!item) return

      // кнопка "+" тоже не должна превышать лимит
      if (delta > 0 && this.count >= MAX_ITEMS) {
        this.warning = `В корзине может быть не больше ${MAX_ITEMS} товаров.`
        return
      }
      this.warning = ''

      item.quantity += delta
      if (item.quantity <= 0) {
        this.removeFromCart(id) // удаляем, если 0
      } else {
        this.saveToLocalStorage()
      }
    },

    saveToLocalStorage() {
      // в localStorage можно хранить только текст, поэтому превращаем массив в JSON
      localStorage.setItem('cart_items', JSON.stringify(this.items))
    }
  }
})
