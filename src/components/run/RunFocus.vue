<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { TickerRun } from '@/types/OengusTypes';
import DetailContainer from '@/components/run/DetailContainer.vue';

export default defineComponent({
  name: 'run-focus-view',
  components: {
    DetailContainer,
  },
  props: {
    run: {
      type: Object as PropType<TickerRun>,
      required: true,
    },
    scheduleSlug: {
      type: String,
      required: true,
    },
    marathonId: {
      type: String,
      required: true,
    },
    currentRun: Boolean,
  },
});
</script>

<template>
  <div
    class="notification"
    :class="{
      'is-primary': currentRun,
      'has-background-grey has-text-white': !currentRun,
    }"
  >
    <router-link to="/" class="delete"></router-link>
    <DetailContainer
      :run="run"
      :schedule-slug="scheduleSlug"
      :marathonId="marathonId"
    />
  </div>
</template>

<style scoped lang="scss">
//
</style>
