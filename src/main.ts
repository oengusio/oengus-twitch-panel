import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useConfigStore } from '@/stores/config';
import { useRunStore } from '@/stores/run';

import App from './App.vue';
import router from './router';

import './assets/main.scss';
import { oengusApi } from '@/apis/oengus';

const app = createApp(App);

app.use(createPinia());
app.use(router);

oengusApi.subscribeToStore();

// TODO: remove, only for testing
// TODO: load settings from twitch
const configStore = useConfigStore();

await configStore.loadSettingsFromTwitch();

configStore.$patch({
  marathonConfig: {
    domain: 'oengus.dev',
    marathonId: 'caching',
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
