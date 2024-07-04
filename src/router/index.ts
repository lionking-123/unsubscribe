import { createRouter, createWebHistory } from 'vue-router'
import Unsubscribe from "../components/Unsubscribe.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/",component:Unsubscribe},
    
  ]
})

export default router
