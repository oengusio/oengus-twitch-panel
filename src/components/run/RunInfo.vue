<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import type { PropType } from 'vue';
import type { TickerRun } from '@/types/OengusTypes';
import { getTimeDistance } from '@/helpers/timehelper';

export default defineComponent({
  name: 'run-info',
  components: {
    RouterLink,
  },
  props: {
    data: {
      type: Object as PropType<TickerRun>,
      required: true,
    },
    next: Boolean,
  },
  data: () => ({
    timeUntilNext: '',
    updateInterval: -1,
  }),
  mounted() {
    if (this.next) {
      this.timeUntilNext = getTimeDistance(this.data.date);
      // Vue only updates when a dependency changes,
      //  this is why we manually update the time on an interval.
      this.updateInterval = setInterval(() => {
        this.timeUntilNext = getTimeDistance(this.data.date);
      }, 500);
    }
  },
  beforeUnmount() {
    clearInterval(this.updateInterval);
  },
  computed: {
    runId() {
      return this.data.id;
    },
    runInfo(): string[] {
      if (this.data.setupBlock) {
        return [this.data.setupBlockText || 'Setup block'];
      }

      return [
        this.data.gameName || '',
        this.data.categoryName || '',
        this.data.console || '',
      ];
    },
    runners() {
      return this.data.runners;
    },
    classSelector(): string {
      return this.next ? 'is-secondary' : 'is-primary';
    },
  },
});
</script>

<template>
  <article :class="`message ${classSelector}`">
    <div class="message-header">
      <p>
        <RouterLink :to="`/line/${runId}`">
          <span v-if="next">Next run ({{ timeUntilNext }})</span>
          <span v-else>Current run</span>
        </RouterLink>
      </p>
    </div>
    <div class="message-body">
      <p class="run-info">
        <template v-for="(word, i) in runInfo" :key="i">
          <span v-if="word">{{ word }}</span>
        </template>
      </p>
      <p class="runner-info" v-if="runners.length">
        By:
        <span v-for="(runner, i) in runners" :key="i">
          <RouterLink :to="`/line/${runId}/runners`">{{
            runner.displayName
          }}</RouterLink>
        </span>
      </p>
    </div>
  </article>
</template>

<style scoped>
.run-info > span:not(:last-of-type)::after {
  content: ' - ';
}

.runner-info > span:not(:last-of-type)::after {
  content: ', ';
}
</style>
