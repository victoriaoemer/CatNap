import { defineStore } from 'pinia';

interface PixabayState {
  image: string | null;
  apiKey: string;
  lastUpdated: string | null;
}

export const usePixabayStore = defineStore('pixabay', {
  state: (): PixabayState => ({
    image: null,
    apiKey: import.meta.env.VITE_PIXABAY_API_KEY || '',
    lastUpdated: null,
  }),
  actions: {
    async fetchImage(query: string) {
      const today = new Date().toISOString().split('T')[0];

      if (this.lastUpdated === today) {
        return;
      }

      const apiUrl = `https://pixabay.com/api/?key=${this.apiKey}&q=${encodeURIComponent(query)}&image_type=photo`;
      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          if (data.hits.length > 0) {
            this.image = data.hits[0].webformatURL;
            this.lastUpdated = today;
          } else {
            this.image = null;
          }
        }
      } catch {
        this.image = null;
      }
    },
  },
  persist: true,
});
