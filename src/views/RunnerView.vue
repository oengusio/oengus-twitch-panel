<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { TickerRun } from '@/types/OengusTypes';
import { useRunStore } from '@/stores/run';
import RunnerInfoComponent from '@/components/runner/RunnerInfo.vue';

export default defineComponent({
  name: 'runner-view',
  components: {
    RunnerInfoComponent,
  },
  setup() {
    const scheduleLine = ref<TickerRun | null>(null);
    const runStore = useRunStore();

    return {
      runStore,
      scheduleLine,
    };
  },
  watch: {
    '$route.params.id': {
      immediate: true,
      handler(val: string) {
        this.scheduleLine = this.runStore.getLineById(parseInt(val, 10));
      },
    },
  },
  computed: {
    //
  },
  methods: {
    //
  },
});
</script>

<template>
  <div>
    <router-link to="/">&laquo; Go back</router-link>
    <h4 class="title is-4">Follow the runner(s)</h4>
    <div v-if="scheduleLine" class="columns is-gapless">
      <RunnerInfoComponent
        v-for="runner in scheduleLine.runners"
        :key="runner.runnerName ?? runner.profile?.id"
        :runner="runner"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
//
</style>
