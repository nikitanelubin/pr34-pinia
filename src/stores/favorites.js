import { defineStore } from 'pinia'

/**
 * Состояние избранного (state)
 * @typedef {Object} FavoritesState
 * @property {number[]} ids - номера избранных товаров
 */

// Второе хранилище - избранные товары. Храним только id товаров
export const useFavoritesStore = defineStore('favorites', {
  /** @returns {FavoritesState} */
  state: () => ({
    ids: JSON.parse(localStorage.getItem('favorite_ids')) || []
  }),

  getters: {
    // сколько товаров в избранном - этот счётчик показывается в шапке
    count: (state) => state.ids.length
  },

  actions: {
    // если товар уже в избранном - убираем его, если нет - добавляем
    /** @param {number} id - номер товара */
    toggleFavorite(id) {
      if (this.ids.includes(id)) {
        this.ids = this.ids.filter((favoriteId) => favoriteId !== id)
      } else {
        this.ids.push(id)
      }
      localStorage.setItem('favorite_ids', JSON.stringify(this.ids))
    }
  }
})
