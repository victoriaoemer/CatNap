import { defineStore } from 'pinia';

interface QuoteState {
  quote: string | null;
  author: string | null;
  theme: string; // Current confirmed theme
  newTheme: string | null; // Temporarily stored new theme
  apiKey: string;
  lastUpdated: string | null;
}

export const useQuoteStore = defineStore('quote', {
  state: (): QuoteState => ({
    quote: null,
    author: null,
    theme: 'inspirational', // Default theme
    newTheme: null,
    apiKey: import.meta.env.VITE_NINJA_API_KEY || '',
    lastUpdated: null,
  }),
  actions: {
    setNewTheme(newTheme: string) {
      // Temporarily store the new theme
      this.newTheme = newTheme;
      console.log('New theme set to:', this.newTheme);
    },
    confirmThemeChange() {
      // Compare the new theme with the current theme
      if (this.newTheme && this.newTheme !== this.theme) {
        this.theme = this.newTheme; // Update the theme
        this.fetchQuote(true); // Fetch a new quote immediately
        // console.log('Theme updated to:', this.theme);
      } else {
        //console.warn('No theme change detected.');
      }
      // Clear the temporary newTheme after confirmation
      this.newTheme = null;
    },
    async fetchQuote(force = false) {
      const today = new Date().toISOString().split('T')[0]; // (YYYY-MM-DD)

      // Skip fetching if not forced and quote already fetched today
      if (!force && this.lastUpdated === today) {
        //console.log('Quote already fetched for today:', this.quote);
        return;
      }

      const apiUrl = `https://api.api-ninjas.com/v1/quotes?category=${this.theme}`;
      try {
        const response = await fetch(apiUrl, {
          headers: {
            'X-Api-Key': this.apiKey,
          },
        });
        if (response.ok) {
          const data = await response.json();
          this.quote = data[0]?.quote || 'No quote found';
          this.author = data[0]?.author || 'Unknown';
          this.lastUpdated = today; // Update the last updated date
          //console.log('New quote fetched:', this.quote);
        } else {
          console.error(`Error: ${response.status}`);
        }
      } catch (error) {
        console.error('Error fetching quote:', error);
      }
    },
  },
  persist: true,
});
