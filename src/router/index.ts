import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import ArticleDetail from '../views/ArticleDetail.vue';
import ArticleList from '../views/ArticleList.vue';
import About from '../views/About.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/categories/:id',
    name: 'ArticleList',
    component: ArticleList
  },
  {
    path: '/articles/:id',
    name: 'ArticleDetail',
    component: ArticleDetail
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
