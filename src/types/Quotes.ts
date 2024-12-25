import { defineStore } from 'pinia';

export const useQuoteStore = defineStore('quote', {
  state: () => ({
    category: 'none',
    quote: null,
    author: null,
    apiKey: import.meta.env.VITE_NINJA_API_KEY || '',
  }),
  actions: {
    setCategory(newCategory: string) {
      this.category = newCategory;
    },
    async fetchQuote() {
      const apiUrl = `https://api.api-ninjas.com/v1/quotes?category=${this.category}`;
      try {
        const response = await fetch(apiUrl, {
          headers: {
            'X-Api-Key': this.apiKey,
          },
        });
        if (response.ok) {
          const data = await response.json();
          this.quote = data[0]?.quote || 'Kein Zitat gefunden.';
          this.author = data[0]?.author || 'Unbekannter Autor';
        } else {
          console.error(`Fehler: ${response.status}`);
        }
      } catch (error) {
        console.error('API-Abfrage fehlgeschlagen:', error);
      }
    },
  },
});
