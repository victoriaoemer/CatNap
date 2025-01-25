import { defineStore } from 'pinia';
import { useUserStore } from './User';

interface UserImageState {
  image: string | null;
  lastUpdated: string | null;
  theme: string | null;
}

interface PixabayState {
  apiKey: string;
  theme: string;
  userImages: Record<string, UserImageState>;
}

export const usePixabayStore = defineStore('pixabay', {
  state: (): PixabayState => ({
    apiKey: import.meta.env.VITE_PIXABAY_API_KEY || '',
    theme: 'moon', // default
    userImages: {}, // UserImages with Image, Theme and date
  }),
  actions: {
    async initializeTheme() {
      try {
        const userStore = useUserStore();
        if (!userStore || !userStore.username) {
          console.warn('UserStore is not properly initialized.');
          return;
        }
        const user = userStore.username;
        const data = await userStore.getUserData(user);
        if (data.settings?.themeImage) {
          this.theme = data.settings?.themeImage || "moon";
        }
      } catch (error) {
        console.error('Error initializing theme:', error);
      }
    },
    async setNewTheme(userID: string, theme: string) {
      this.theme = theme;
      const userStore = useUserStore();
      if (!userStore || !userStore.username) {
        console.warn('UserStore is not properly initialized.');
        return;
      }
      if (this.userImages[userID]) {
        this.userImages[userID].theme = theme;
      }

      this.confirmThemeChange(userID);
    },
    confirmThemeChange(userID: string) {
      this.fetchImage(true, userID);
    },
    async fetchImage(force = false, userID: string) {
      if (!this.apiKey) {
        console.error('Pixabay API key is missing.');
        return;
      }

      const today = new Date().toISOString().split('T')[0];

      if (!force && this.userImages[userID] && this.userImages[userID].lastUpdated === today) {
        return;
      }

      const apiUrl = `https://pixabay.com/api/?key=${this.apiKey}&q=${this.theme}&image_type=photo&orientation=horizontal&per_page=20`;

      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          if (data.hits?.length > 0) {
            const randomImage = Math.floor(Math.random() * data.hits.length);
            const selectedImage = data.hits[randomImage];

            const newImage = selectedImage.fullHDURL || selectedImage.largeImageURL || selectedImage.webformatURL || selectedImage.pageURL;

            const imagePage = selectedImage.pageURL;

            if (!newImage) {
              console.warn("No valid image found for theme:", this.theme);
              return;
            }

            this.userImages[userID] = {
              image: newImage,
              lastUpdated: today,
              theme: this.theme,
            };
          } else {
            console.warn("No images found for theme:", this.theme);
          }
        } else {
          console.error("Failed to fetch image. HTTP status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    },

    getUserImage(userID: string): string {
      return this.userImages[userID]?.image || '';
    },
    getUserTheme(userID: string): string {
      return this.userImages[userID]?.theme || 'default';
    },
  },
  persist: true,
});
