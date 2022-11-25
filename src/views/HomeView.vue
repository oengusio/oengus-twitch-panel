<script lang="ts">
import { defineComponent } from 'vue';
import { useConfigStore } from '@/stores/config';
import { useRunStore } from '@/stores/run';
import RunInfo from '@/components/run/RunInfo.vue';

// TODO: mount,beforeUnmount hooks for starting and stopping the timer
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
