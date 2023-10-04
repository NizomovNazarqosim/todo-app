import { createRouter, createWebHistory } from 'vue-router'
import Todo from '../views/Todo.vue'
import Weather from '../views/Weather.vue'
import subTodo from '../views/SubTodo.vue'

const routes = [
  {
    path: "/",
    name: "todo",
    component: Todo,
  },
  {
    path: "/weather",
    name: "weather",
    component: Weather,
  },
  {
    path: "/todo/:id",
    name: "subTodo",
    component: subTodo,
    params:{
      id: ''
    }
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;