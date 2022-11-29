<script lang="ts">
import { defineComponent } from 'vue';
import { useConfigStore } from '@/stores/config';
import { useRunStore } from '@/stores/run';
import RunInfo from '@/components/run/RunInfo.vue';

export default defineComponent({
  name: 'home-view',
  components: {
    RunInfo,
  },
  setup() {
    const configStore = useConfigStore();
    const runStore = useRunStore();

    return {
      runStore,
      configStore,
    };
  },
  mounted() {
    window.ga('event', 'PageLoaded', {
      event_category: 'Page',
      event_label: 'home',
    });
  },
});
</script>

<template>
  <div v-if="configStore.loaded">
    <template v-if="configStore.marathonConfig.marathonId">
      <h1 class="subtitle">{{ configStore.marathonConfig.marathonName }}</h1>
      <template v-if="runStore.hasRuns">
        <RunInfo v-if="runStore.current" :data="runStore.current" />
        <RunInfo v-if="runStore.next" next :data="runStore.next" />
      </template>
      <p v-else>No more runs :(</p>
    </template>
    <template v-else>
      <p>Extension not configured!</p>
      <p>Please configure the extension within the settings.</p>
    </template>
  </div>
</template>
