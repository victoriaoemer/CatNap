import { defineStore } from 'pinia';

interface PixabayState {
  image: string | null;
  apiKey: string;
  lastUpdated: string | null;
  theme: string;
  newTheme: string | null;
}

export const usePixabayStore = defineStore('pixabay', {
  state: (): PixabayState => ({
    image: null,
    apiKey: import.meta.env.VITE_PIXABAY_API_KEY || '',
    lastUpdated: null,
    theme: 'moons',
    newTheme: null,
  }),
  actions: {
    setNewTheme(newTheme: string) {
      this.newTheme = newTheme;
      //console.log('New theme set to:', this.newTheme);
    },
    confirmThemeChange() {
      // Compare the new theme with the current theme
      if (this.newTheme && this.newTheme !== this.theme) {
        this.theme = this.newTheme;
        this.fetchImage(true);
        // console.log('Theme updated to:', this.theme);
      } else {
        // console.log('No theme change detected.');
      }
      this.newTheme = null;
    },
    async fetchImage(force = false) {
      const today = new Date().toISOString().split('T')[0];

      // Check if fetch should be skipped
      if (!force && this.lastUpdated === today) {
        //console.log('Image already fetched for today:', this.image);
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
            //console.log('Fetched new image for theme:', this.theme);
            this.lastUpdated = today;
          } else {
            this.image = null;
            console.warn('No images found for theme:', this.theme);
          }
        } else {
          console.error('Failed to fetch image. HTTP status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching image:', error);
        this.image = null;
      }
    },
  },
  persist: true,
});
