import { defineStore } from 'pinia'

interface QuoteState {
  quote: string | null
  author: string | null
  theme: string
  apiKey: string
  lastUpdated: string | null
}

interface QuoteActions {
  setTheme(newTheme: string): void
  fetchQuote(): Promise<void>
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const useQuoteStore = defineStore<'quote', QuoteState, {}, QuoteActions>('quote', {
  state: (): QuoteState => ({
    quote: null,
    author: null,
    theme: 'inspirational',
    apiKey: import.meta.env.VITE_NINJA_API_KEY || '',
    lastUpdated: null, // no date in the beginning
  }),
  actions: {
    setTheme(newTheme: string) {
      this.theme = newTheme
    },
    async fetchQuote() {
      const today = new Date().toISOString().split('T')[0] // (YYYY-MM-DD)

      // compare if the quote was already fetched today
      if (this.lastUpdated === today) {
        console.log('Quote already fetched for today:', this.quote)
        return
      }

      const apiUrl = `https://api.api-ninjas.com/v1/quotes?category=${this.theme}`
      try {
        const response = await fetch(apiUrl, {
          headers: {
            'X-Api-Key': this.apiKey,
          },
        })
        if (response.ok) {
          const data = await response.json()
          this.quote = data[0]?.quote || 'No quote found'
          this.author = data[0]?.author || 'No author found'
          this.lastUpdated = today
          console.log('New quote fetched:', this.quote)
        } else {
          console.error(`Error: ${response.status}`)
        }
      } catch (error) {
        console.error('API-fetching gone wrong:', error)
      }
    },
  },
  persist: true,
})
