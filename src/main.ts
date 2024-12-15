import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import AddEntryPage from './components/AddEntryPage.vue'
import DashboardPage from './components/DashboardPage.vue'
import LoginPage from './components/LoginPage.vue'
import SignUpPage from './components/SignUpPage.vue'
import UserSettingsPage from './components/UserSettingsPage.vue'
import './index.css'



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

const app = createApp(App);
app.use(router);
app.mount('#app')
