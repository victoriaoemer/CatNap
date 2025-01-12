import { defineStore } from "pinia"

export interface User {
  firstName: string,
  lastName: string
  username: string,
  password: string,
  isAuthenticated?: boolean
}

export interface UserData {
  username: string,
  settings: {
    themeQuote: string,
    themeImage: string,
    profilePicture: number
  },
  data?: Array<{
    title: string,
    content: string,
    emotion: number
  }>
}

export const useUserStore = defineStore('user', {
  state: (): User => ({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    isAuthenticated: false
  }),
  actions: {
    login(user: User) {
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.username = user.username;
      this.password = user.password
      this.isAuthenticated = true;
    },
    logout() {
      this.firstName = '';
      this.lastName = '';
      this.username = '';
      this.password = '';
      this.isAuthenticated = false;
    },
    async createUser(data: User) {
      const response = await fetch('http://localhost:4000/create-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      return response.json()
    },
    async getUsers() {
      const response = await fetch('http://localhost:4000/get-users')
      return response.json()
    },
    async updateUser(username: string, data: User) {
      const response = await fetch(`http://localhost:4000/update-user/${username}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      return response.json()
    },
    async updateUserSettings(username: string, settings: { themeQuote: string, themeImage: string, profilePicture: number }) {
      const response = await fetch(`http://localhost:4000/update-settings/${username}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      })
      return response.json()
    },
    async createUserData(data: UserData) {
      const response = await fetch('http://localhost:4000/create-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      return response.json()
    },
    async getUserData(username: string) {
      const response = await fetch(`http://localhost:4000/get-data/${username}`)
      return response.json()
    },
    async updateUserData(username: string, newEntry: { title: string, content: string, emotion: number }) {
      try {
        const updateResponse = await fetch(`http://localhost:4000/update-data/${username}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newEntry)
        })
        if (!updateResponse.ok) {
          throw new Error(`Fehler beim Aktualisieren der Daten: ${updateResponse.status}`)
        }
        return await updateResponse.json()
      } catch (error) {
        console.error("Fehler beim Update:", error)
        throw error
      }
    },
    async resetUserdata(username: string) {
      const response = await fetch(`http://localhost:4000/reset-data/${username}`, {
        method: 'PUT'
      })
      return response.json()
    },
    async deleteUser(username: string) {
      const response = await fetch(`http://localhost:4000/delete-user/${username}`, {
        method: 'DELETE'
      })
      return response.json()
    }
  },
  persist: true
})


