import { createRouter, createMemoryHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createMemoryHistory(import.meta.env.BASE_URL), // Switch back to createWebHashHistory?
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/line/:id',
      name: 'line-details',
      props: true,
      component: () => import('../views/RunFocusView.vue'),
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
