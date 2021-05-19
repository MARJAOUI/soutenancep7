import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/signin',
      name:'signin',
      component: () => import(/* webpackChunKName: "slot" */ '../views/signin.vue')
    },
  {
   path:'/CreateUser',
    name:'CreateUser',
    component: () => import(/* webpackChunKName: "slot" */ '../views/CreateUser.vue')
  },
  {
    path:'/DeleteUser',
     name:'DeleteUser',
     component: () => import(/* webpackChunKName: "slot" */ '../views/DeleteUser.vue')
   },
  {      
  path:'/CreateMessage',
    name:'CreateMessage',
    component: () => import(/* webpackChunKName: "slot" */ '../views/CreateMessage.vue')
  },
  { 
  path:'/DisplayMessages',
    name:'DisplayMessages',
    component: () => import(/* webpackChunKName: "slot" */ '../views/DisplayMessages.vue')
  },
  { 
  path:'/ModifyUser/',
    name:'ModifyUser',
    component: () => import(/* webpackChunKName: "slot" */ '../views/ModifyUser.vue')
  },
  { 
    path:'/ProfileManage/',
      name:'ProfileManage',
      component: () => import(/* webpackChunKName: "slot" */ '../views/ProfileManage.vue')
  },
  { 
    path:'/MessageManage/',
      name:'MessageManage',
      component: () => import(/* webpackChunKName: "slot" */ '../views/MessageManage.vue')
  },
  
  { 
    path:'/DisplayUsers/',
      name:'DisplayUsers',
      component: () => import(/* webpackChunKName: "slot" */ '../views/DisplayUsers.vue')
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
