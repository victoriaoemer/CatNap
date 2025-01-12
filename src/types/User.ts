import { defineStore } from "pinia"

export interface User {
  firstName: string,
  lastName: string
  username: string,
  password: string,
  isAuthenticated?: boolean,
  settings?: {
    themeImage: string,
    profilePicture: number
  }
}

export interface UserData {
  username: string,
  settings: {
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
    isAuthenticated: false,
    settings: {
      themeImage: 'moon',
      profilePicture: 0
    },
    firstName: '',
    lastName: '',
    username: '',
    password: ''

  }),
  actions: {
    login(user: User) {
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.username = user.username;
      this.password = user.password
      this.isAuthenticated = true;
      //console.log('User logged in:', this.username)
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
    async updateUserSettings(username: string, settings: { themeImage: string, profilePicture: number }) {
      try {
        const response = await fetch(`http://localhost:4000/update-settings/${username}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(settings),
        });

        if (!response.ok) {
          throw new Error(`Failed to update settings: ${response.status}`);
        }

        const updatedData = await response.json();

        // update local state
        if (updatedData && updatedData.settings) {
          this.settings = updatedData.settings;
        } else {
          this.settings = { themeImage: settings.themeImage , profilePicture: settings.profilePicture }; // fallback
        }
      } catch (error) {
        console.error("Error updating user settings:", error);
      }
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


