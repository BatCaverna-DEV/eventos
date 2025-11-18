import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Presenca from '../views/Presenca.vue'
import Registrar from '../views/Registrar.vue'
import Admin from '../views/Admin.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
        path: '/',
        name: 'home',
        component: Presenca,
        },
        {
            path: '/admin',
            name: 'admin',
            component: Admin,
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
          path: '/registrar/:id',
          name: 'registrar',
          component: Registrar,
        }
    ],
})

export default router
