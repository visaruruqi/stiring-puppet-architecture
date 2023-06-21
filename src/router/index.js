import Vue from 'vue'
import VueRouter from 'vue-router'
import RegisterForm from "@/views/RegisterForm/RegisterForm";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: RegisterForm
  },

]

const router = new VueRouter({
  routes
})

export default router
