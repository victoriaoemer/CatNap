import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import DashboardPage from './components/DashboardPage.vue'
import LoginPage from './components/LoginPage.vue'
import SignUpPage from './components/SignUpPage.vue'
import './index.css'



const routes = [
  { path: '/', component: LoginPage },
  { path: '/signup', component: SignUpPage },
  { path: '/dashboard/:username', component: DashboardPage },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const app = createApp(App);
app.use(router);
app.mount('#app')
