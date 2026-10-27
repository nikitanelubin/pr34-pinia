import { defineStore } from 'pinia'

// лимит корзины: не больше 10 товаров суммарно.
// export - чтобы показать это число на странице корзины
export const MAX_ITEMS = 10

// ===== Типизация =====
// TypeScript в проекте нет, поэтому типы описаны специальными комментариями JSDoc (/** ... */).
// Работу кода они не меняют, но редактор (VS Code) по ним понимает, какие поля есть
// у товара и какие параметры у actions, и подсказывает их при наборе.

/**
 * Товар в корзине
 * @typedef {Object} CartItem
 * @property {number} id - номер товара
 * @property {string} name - название
 * @property {number} price - цена за 1 штуку
 * @property {number} quantity - количество
 */

/**
 * Состояние корзины (state)
 * @typedef {Object} CartState
 * @property {CartItem[]} items - товары в корзине
 * @property {string} warning - текст предупреждения
 * @property {CartItem[][]} history - копии корзины для кнопки «Отменить»
 */

// defineStore создаёт хранилище. 'cart' - его имя (видно в Vue DevTools).
// useCartStore - функция, через которую компоненты получают это хранилище
export const useCartStore = defineStore('cart', {
  // state - данные хранилища. Это функция, которая возвращает объект
  /** @returns {CartState} */
  state: () => ({
    // при запуске берём корзину из localStorage.
    // JSON.parse превращает текст обратно в массив, а если там пусто - берём []
    items: JSON.parse(localStorage.getItem('cart_items')) || [],
    // текст предупреждения (пустая строка - предупреждения нет)
    warning: '',
    // история для кнопки "Отменить": копии корзины до каждого изменения
    history: []
  }),

  // getters - вычисляемые значения (как computed), всегда актуальные
  getters: {
    // Пересчитываем количество и сумму на основе items.
    // reduce проходит по всем товарам и накапливает одно число (начиная с 0)
    count: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    sum: (state) => state.items.reduce((total, item) => total + item.price * item.quantity, 0),
    // можно ли что-то отменить (есть ли что-нибудь в истории)
    canUndo: (state) => state.history.length > 0
  },

  // actions - функции, которые меняют state. Все изменения корзины - только через них
  actions: {
    /** @param {{ id: number, name: string, price: number }} product - товар из каталога */
    addToCart(product) {
      // проверка лимита: корзина уже полная - показываем предупреждение и не добавляем
      if (this.count >= MAX_ITEMS) {
        this.warning = `В корзине может быть не больше ${MAX_ITEMS} товаров.`
        return
      }
      this.warning = ''
      this.saveHistory()

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

    /** @param {number} id - номер товара */
    removeFromCart(id) {
      this.warning = ''
      this.saveHistory()
      // filter оставляет все товары, кроме товара с этим id
      this.items = this.items.filter((i) => i.id !== id)
      this.saveToLocalStorage()
    },

    clearCart() {
      this.warning = ''
      this.saveHistory()
      this.items = []
      this.saveToLocalStorage()
    },

    /**
     * @param {number} id - номер товара
     * @param {number} delta - +1 увеличить количество, -1 уменьшить
     */
    updateQuantity(id, delta) {
      const item = this.items.find((i) => i.id === id)
      if (!item) return

      // кнопка "+" тоже не должна превышать лимит
      if (delta > 0 && this.count >= MAX_ITEMS) {
        this.warning = `В корзине может быть не больше ${MAX_ITEMS} товаров.`
        return
      }
      this.warning = ''
      this.saveHistory()

      item.quantity += delta
      if (item.quantity <= 0) {
        // удаляем, если 0. Здесь не вызываем removeFromCart,
        // иначе в историю запишется лишний шаг и "Отменить" придётся нажимать дважды
        this.items = this.items.filter((i) => i.id !== id)
      }
      this.saveToLocalStorage()
    },

    // Запомнить, какой была корзина ДО изменения
    saveHistory() {
      // JSON.parse(JSON.stringify(...)) делает полную копию массива.
      // Без копии в истории лежала бы ссылка на тот же самый массив,
      // и он менялся бы вместе с корзиной
      const copy = JSON.parse(JSON.stringify(this.items))
      this.history.push(copy)
    },

    // Отмена последнего действия (добавить / удалить / изменить количество / очистить)
    undo() {
      if (this.history.length === 0) return
      // pop() достаёт последний элемент массива и удаляет его из истории
      this.items = this.history.pop()
      this.warning = ''
      this.saveToLocalStorage()
    },

    saveToLocalStorage() {
      // в localStorage можно хранить только текст, поэтому превращаем массив в JSON
      localStorage.setItem('cart_items', JSON.stringify(this.items))
    }
  }
})
