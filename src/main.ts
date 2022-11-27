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

oengusApi.subscribeToStore();

// TODO: remove, only for testing
const configStore = useConfigStore();

await configStore.loadSettingsFromTwitch();

// TODO: remove after settings page is created
configStore.$patch({
  marathonConfig: {
    domain: 'oengus.dev',
    marathonId: 'caching',
    marathonName: 'Testing the cache',
  },
});

const runStore = useRunStore();
const short = configStore.marathonConfig.marathonId || '';

oengusApi.getTickerData(short).then((data) => {
  if (data === null) {
    return;
  }

  const { current, next } = data;

  runStore.$patch({ current, next });
});
// TODO: end of section

app.mount('#app');
