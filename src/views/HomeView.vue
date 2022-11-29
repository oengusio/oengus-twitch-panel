<script lang="ts">
import { defineComponent } from 'vue';
import { useConfigStore } from '@/stores/config';
import { useRunStore } from '@/stores/run';
import RunInfo from '@/components/run/RunInfo.vue';
import { oengusApi } from '@/apis/oengus';

// TODO: mount,beforeUnmount hooks for starting and stopping the timer
export default defineComponent({
  name: 'home-view',
  components: {
    RunInfo,
  },
  setup() {
    const configStore = useConfigStore();
    const runStore = useRunStore();

    // TODO: timer
    const short = configStore.marathonConfig.marathonId || '';
    console.log('[oengus] current short', JSON.stringify(short));

    if (short) {
      oengusApi.getTickerData(short).then((data) => {
        if (data === null) {
          return;
        }

        const { current, next } = data;

        runStore.$patch({ current, next });
      });
    }

    return {
      runStore,
      configStore,
    };
  },
  mounted() {
    /*window.gtag('event', 'PageLoaded', {
      event_category: 'Page',
      event_label: 'home',
    });*/
  },
});
</script>

<template>
  <div v-if="configStore.loaded">
    <h1 class="subtitle">{{ configStore.marathonConfig.marathonName }}</h1>
    <template v-if="runStore.hasRuns">
      <RunInfo v-if="runStore.current" :data="runStore.current" />
      <RunInfo v-if="runStore.next" next :data="runStore.next" />
    </template>
    <p v-else>No more runs :(</p>
  </div>
  <p v-else>Loading ...</p>
</template>
