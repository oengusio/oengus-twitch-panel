import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useConfigStore } from '@/stores/config';

import './analytics';

import App from './App.vue';
import router from './router';

import './assets/main.scss';
import { oengusApi } from '@/apis/oengus';
import { tickerTimer } from './apis/tickerTimer';

const app = createApp(App);

app.use(createPinia());
app.use(router);

oengusApi.subscribeToStore();

const configStore = useConfigStore();

// NOTE: while in development refresh the entre page if making a big change
// Twitch does not really like the self-reloading of the app and prevents it from loading the config
await configStore.loadSettingsFromTwitch();

const mode = new URL(document.location.toString()).searchParams.get('mode');

console.log('[oengus] running in', mode, 'mode!');

if (mode === 'config') {
  // Don't await, fucks with the router
  router.push('/config');
} else {
  tickerTimer.setup();
}

console.log('[oengus] mounting app');
app.mount('#app');
