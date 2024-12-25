import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import AddEntryPage from './components/screens/AddEntryPage.vue'
import DashboardPage from './components/screens/DashboardPage.vue'
import LoginPage from './components/screens/LoginPage.vue'
import SignUpPage from './components/screens/SignUpPage.vue'
import UserSettingsPage from './components/screens/UserSettingsPage.vue'
import './index.css'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const routes = [
  { path: '/', component: LoginPage },
  { path: '/signup', component: SignUpPage },
  { path: '/dashboard/:username', component: DashboardPage },
  { path: '/add-entry/:username', component: AddEntryPage },
  { path: '/settings/:username', component: UserSettingsPage },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate);

app.use(pinia)
app.use(router)
app.mount('#app')
