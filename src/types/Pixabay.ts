import { defineStore } from 'pinia';

interface PixabayState {
  image: string | null;
  apiKey: string;
  lastUpdated: string | null;
  theme: string;
}

export const usePixabayStore = defineStore('pixabay', {
  state: (): PixabayState => ({
    image: null,
    apiKey: import.meta.env.VITE_PIXABAY_API_KEY || '',
    lastUpdated: null,
    theme: 'moons',
  }),
  actions: {
    setTheme(newTheme: string) {
      if (this.theme !== newTheme) {
        this.theme = newTheme;
        this.fetchImage(true); // Fetch image immediately when theme changes
      }
    },
    async fetchImage(force = false) {
      const today = new Date().toISOString().split('T')[0];

      // If not forced and the last fetch was today, skip fetching
      if (!force && this.lastUpdated === today) {
        console.log('Image already fetched for today:', this.image);
        return;
      }

      const apiUrl = `https://pixabay.com/api/?key=${this.apiKey}&q=${this.theme}&image_type=photo&orientation=horizontal&per_page=100`;
      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          if (data.hits.length > 0) {
            const randomImage = Math.floor(Math.random() * data.hits.length);
            this.image = data.hits[randomImage].webformatURL;
            console.log('Random Image Index:', randomImage);
            this.lastUpdated = today; // Update the timestamp only if successful
          } else {
            this.image = null;
            console.log('No images found for theme:', this.theme);
          }
        }
      } catch (error) {
        console.error('Error fetching image:', error);
        this.image = null;
      }
    },
  },
  persist: true,
});
