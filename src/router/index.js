import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      showTab: true
    }
  },
  {
    path: '/input',
    name: 'Input',
    component: () => import('../views/Input'),
    meta: {
      showTab: false
    }
  },

  {
    path: '/layout',
    name: 'Layout',
    component: () => import('../views/Layout'),
    meta: {
      showTab: false
    }
  },
  {
    path: '/list',
    name: 'List',
    component: () => import('../views/List'),
    meta: {
      showTab: false
    }
  },
  {
    path: '/camera',
    name: 'Camera',
    component: () => import('../views/Camera'),
    meta: {
      showTab: true
    }
  },
  {
    path: '/mock',
    name: 'Mock',
    component: () => import('../views/Mock'),
    meta: {
      showTab: true
    }
  },
  {
    path: '/image',
    name: 'Image',
    component: () => import('../views/Image'),
    meta: {
      showTab: true
    }
  },
  // game
  {
    path: '/gameBox',
    name: 'GameBox',
    component: () => import('../views/game/GameBox'),
    meta: {
      showTab: true
    }
  },
  {
    path: '/audioRecorder',
    name: 'AudioRecorder',
    component: () => import('../views/game/AudioRecorder'),
    meta: {
      showTab: false
    }
  },
  {
    path: '/puzzleGame',
    name: 'PuzzleGame',
    component: () => import('../views/game/PuzzleGame'),
    meta: {
      showTab: false
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
