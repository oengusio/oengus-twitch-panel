<script lang="ts">
import { defineComponent } from 'vue';
import { useConfigStore } from '@/stores/config';
import { mapStores } from 'pinia';
import { useRunStore } from '@/stores/run';
import RunInfo from '@/components/RunInfo.vue';

export default defineComponent({
  name: 'home-view',
  components: {
    RunInfo,
  },
  data: () => ({
    //
  }),
  watch: {
    'configStore.marathonConfig': {
      deep: true,
      handler() {
        console.log(
          `New marathon id: ${this.configStore.marathonConfig.marathonId}`
        );
      },
    },
  },
  computed: {
    ...mapStores(useConfigStore, useRunStore),
  },
});
</script>

<template>
  <div v-if="configStore.loaded">
    <p>
      Loaded for id <code>{{ configStore.marathonConfig.marathonId }}</code>
    </p>
    <RunInfo v-if="runStore.current" :data="runStore.current" />
    <RunInfo v-if="runStore.next" next :data="runStore.next" />
  </div>
  <p v-else>Loading ...</p>
</template>
