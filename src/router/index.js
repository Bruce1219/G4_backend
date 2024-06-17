import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/farm',
            name: 'farm',
            component: () => import('@/views/FarmView.vue')
        },
        {
            path: '/news',
            name: 'news',
            component: () => import('@/views/NewsView.vue')
        },
        {
            path: '/chatbox',
            name: 'chatbox',
            component: () => import('@/views/ChatBoxView.vue')
        },
        {
            path: '/member',
            name: 'member',
            component: () => import('@/views/MemberView.vue')
        },
        {
            path: '/product',
            name: 'product',
            component: () => import('@/views/ProductView.vue')
        },
        {
            path: '/porders',
            name: 'porders',
            component: () => import('@/views/POrdersView.vue')
        },
        {
            path: '/activity',
            name: 'activity',
            component: () => import('@/views/ActivityView.vue')
        },
        {
            path: '/aorders',
            name: 'aorders',
            component: () => import('@/views/AOrdersView.vue')
        },
        {
            path: '/game',
            name: 'game',
            component: () => import('@/views/GameView.vue')
        },
        {
            path: '/admin',
            name: 'admin',
            component: () => import('@/views/AdminView.vue')
        },
        {
            path: '/coupon',
            name: 'coupon',
            component: () => import('@/views/CouponView.vue')
        }
    ]
})

export default router
