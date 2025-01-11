import './assets/main.css'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import AddEntryPage from './components/screens/AddEntryPage.vue'
import DashboardPage from './components/screens/DashboardPage.vue'
import LoginPage from './components/screens/LoginPage.vue'
import SignUpPage from './components/screens/SignUpPage.vue'
import UserSettingsPage from './components/screens/UserSettingsPage.vue'
import './index.css'
import { useUserStore } from './types/User'

const routes = [
  { path: '/', component: LoginPage },
  { path: '/signup', component: SignUpPage },
  {
    path: '/dashboard/:username',
    component: DashboardPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/add-entry/:username',
    component: AddEntryPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/settings/:username',
    component: UserSettingsPage,
    meta: { requiresAuth: true }
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate);

app.use(pinia)
app.use(router)
app.mount('#app')
