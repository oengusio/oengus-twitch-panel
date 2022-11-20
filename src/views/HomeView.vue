<script lang="ts">
import { defineComponent } from 'vue';
import { useConfigStore } from '@/stores/config';
import { useRunStore } from '@/stores/run';
import RunInfo from '@/components/RunInfo.vue';

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
  watch: {
    'configStore.marathonConfig.marathonId': {
      deep: true,
      handler() {
        console.log(
          `[oengus] New marathon id: ${this.configStore.marathonConfig.marathonId}`
        );
      },
    },
  },
});
</script>

<template>
  <div v-if="configStore.loaded">
    <p>
      Loaded for id <code>{{ configStore.marathonConfig.marathonId }}</code>
    </p>
    <template v-if="runStore.hasRuns">
      <RunInfo v-if="runStore.current" :data="runStore.current" />
      <RunInfo v-if="runStore.next" next :data="runStore.next" />
    </template>
  </div>
  <p v-else>Loading ...</p>
</template>
