import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Presenca from '../views/Presenca.vue'
import Registrar from '../views/Registrar.vue'
import Admin from '../views/Admin.vue'
import NotFound from "@/views/NotFound.vue";

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
            meta:{requiresAuth:true},
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
        },
        {
            path: '/logout',
            name: 'logout',
            beforeEnter: (to, from, next) => {
                localStorage.removeItem('bat_token');
                next('/')
            }
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'notfound',
            component: NotFound
        }
    ],
})

function isTokenExpired(token) {
    if (!token || token === 'null' || token === 'undefined') return true

    try {
        // JWT tem formato: header.payload.signature
        const [, payloadBase64] = token.split('.')
        if (!payloadBase64) return true

        // Converte Base64URL → JSON
        const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/')
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        )
        const payload = JSON.parse(jsonPayload)

        // Verifica expiração (exp em segundos)
        if (!payload.exp) return true
        const now = Math.floor(Date.now() / 1000)
        return now >= payload.exp
    } catch (e) {
        console.error('Erro ao validar token:', e)
        return true // se deu erro, trata como expirado
    }
}

function isLoggedIn () {
    const token = localStorage.getItem('bat_token')

    if(!token) return false

    if(isTokenExpired(token)) {
        localStorage.removeItem('bat_token')
        return false
    }
    return true
    //  if (!token || token === 'null' || token === 'undefined') return false
    //  // opcional: validar formato de JWT
    //  const parts = token.split('.')
    //  return parts.length === 3 // se seu token não for JWT, troque por `return !!token`
}

router.beforeEach((to) => {
    const logged = isLoggedIn()

    // bloquear páginas só para visitantes se já logado
    if (to.meta?.guestOnly && logged) {
        return { path: '/admin' }
    }

    // checar meta.requiresAuth inclusive em rotas filhas/pais
    const needsAuth = to.matched.some(r => r.meta?.requiresAuth)
    if (needsAuth && !logged) {
        //return { name: 'login', query: { redirect: to.fullPath } }
        return {path: '/login'}
    }

    return true
})


export default router
