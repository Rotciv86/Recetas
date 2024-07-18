import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './views/Home.vue'
import Form from './views/Form.vue'

const routes = [
    {path: "/", component: Home},
    {path: "/form", component: Form}
]

export const router = createRouter({history: createWebHashHistory(), routes})