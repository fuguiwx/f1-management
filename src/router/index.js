import { createRouter, createWebHistory } from 'vue-router'
import User from '../views/User.vue'
import Discuss from '../views/Discuss.vue'
import Driver from '../views/Driver.vue'
import Track from '../views/Track.vue'
import Team from '../views/Team.vue'

const routes = [
  { path: '/', redirect: '/user' },
  { path: '/user', component: User },
  { path: '/discuss', component: Discuss },
  { path: '/driver', component: Driver },
  { path: '/track', component: Track },
  { path: '/team', component: Team },
]

export default createRouter({
  history: createWebHistory(),
  routes
})