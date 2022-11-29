import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useConfigStore } from '@/stores/config';

import './analytics';

import App from './App.vue';
import router from './router';

import './assets/main.scss';
import { oengusApi } from '@/apis/oengus';

const app = createApp(App);

app.use(createPinia());
app.use(router);

oengusApi.subscribeToStore();

// TODO: remove after settings page is created
// configStore.$patch({
//   marathonConfig: {
//     domain: 'oengus.dev',
//     marathonId: 'caching',
//     marathonName: 'Testing the cache',
//   },
// });

const configStore = useConfigStore();
await configStore.loadSettingsFromTwitch();

console.log('[oengus] mounting app');
app.mount('#app');
