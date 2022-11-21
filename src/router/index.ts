import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/line/:id',
      name: 'line-details',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/line/:id/runners',
      name: 'line-runner-details',
      component: () => import('../views/RunnerView.vue'),
    },
    {
      path: '/config',
      name: 'config',
      component: () => import('../views/ConfigView.vue'),
    },
  ],
});

export default router;
