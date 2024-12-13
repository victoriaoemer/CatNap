import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import Dashboard from './components/Dashboard.vue'
import WelcomePage from './components/WelcomePage.vue'
import './index.css'



const routes = [
  { path: '/', component: WelcomePage },
  { path: '/dashboard', component: Dashboard },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const app = createApp(App);
app.use(router);
app.mount('#app')
