import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
      {
        path: '',
        require: 'Goods',
        component: () => import('@/views/home/childCom/goods/Goods.vue')
      },
      {
        path: '/goods',
        name: 'Goods',
        component: () => import('@/views/home/childCom/goods/Goods.vue'),
       
      },
      {
        path: '/ratings',
        name: 'Ratings',
        component: () => import('@/views/home/childCom/ratings/Ratings.vue')
      },
      {
        path: '/seller',
        name: 'Seller',
        component: () => import('@/views/home/childCom/seller/Seller.vue')
      }
    


 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
