<script lang="ts">
import { defineComponent } from 'vue';
import RunFocus from '@/components/run/RunFocus.vue';
import type { TickerRun } from '@/types/OengusTypes';
import { useRunStore } from '@/stores/run';
import { useConfigStore } from '@/stores/config';

export default defineComponent({
  name: 'run-focus-view',
  components: {
    RunFocus,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup() {
    const runStore = useRunStore();
    const configStore = useConfigStore();

    return {
      runStore,
      configStore,
    };
  },
  computed: {
    marathonId(): string {
      return this.configStore.marathonConfig.marathonId || '';
    },
    runData(): { current: boolean; runInfo: TickerRun } | null {
      if (!this.id) {
        return null;
      }

      const store = this.runStore;
      const id = parseInt(this.id, 10);

      if (store.current && store.current.id === id) {
        return {
          current: true,
          runInfo: store.current,
        };
      }

      if (store.next && store.next.id === id) {
        return {
          current: false,
          runInfo: store.next,
        };
      }

      return null;
    },
  },
  methods: {
    //
  },
});
</script>

<template>
  <RunFocus
    v-if="runData"
    :run="runData.runInfo"
    :current-run="runData.current"
    :marathon-id="marathonId"
  />
</template>

<style scoped lang="scss">
//
</style>
