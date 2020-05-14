import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Room from '../views/Room.vue'
import Chat from '../views/Chat.vue'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/room',
    name: 'Room',
    meta: { requiresAuth: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Room
  },
  {
    path: '/chat',
    name: 'Chat',
    meta: { requiresAuth: true },
    component: Chat 
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.isloggedin
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!isLoggedIn) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else {
    if (isLoggedIn) {
      next("/room") // make sure to always call next()!
    }else{
      next() // make sure to always call next()!
    }
  }
})

export default router
