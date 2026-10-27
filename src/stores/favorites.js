import { defineStore } from 'pinia'

// Второе хранилище - избранные товары. Храним только id товаров
export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    ids: JSON.parse(localStorage.getItem('favorite_ids')) || []
  }),

  getters: {
    // сколько товаров в избранном - этот счётчик показывается в шапке
    count: (state) => state.ids.length
  },

  actions: {
    // если товар уже в избранном - убираем его, если нет - добавляем
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
