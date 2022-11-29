import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useConfigStore } from '@/stores/config';
import { useRunStore } from '@/stores/run';

import './analytics';

import App from './App.vue';
import router from './router';

import './assets/main.scss';
import { oengusApi } from '@/apis/oengus';

const app = createApp(App);

app.use(createPinia());
app.use(router);

const configStore = useConfigStore();
oengusApi.subscribeToStore();

// TODO: remove after settings page is created
// configStore.$patch({
//   marathonConfig: {
//     domain: 'oengus.dev',
//     marathonId: 'caching',
//     marathonName: 'Testing the cache',
//   },
// });

configStore.loadSettingsFromTwitch().then(() => {
  console.log('[oengus] mounting app');
  app.mount('#app');
});
