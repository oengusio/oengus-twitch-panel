import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useConfigStore } from '@/stores/config';

import App from './App.vue';
import router from './router';

import './assets/main.scss';
import { oengusApi } from '@/apis/oengus';
import { useRunStore } from '@/stores/run';

const app = createApp(App);

app.use(createPinia());
app.use(router);

// TODO: remove, only for testing
const configStore = useConfigStore();
const runStore = useRunStore();
const short = configStore.marathonConfig.marathonId || '';

oengusApi.getTickerData(short).then((data) => {
  const { current, next } = data;

  runStore.$patch({ current, next });
});
// TODO: end of section

app.mount('#app');