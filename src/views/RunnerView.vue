<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { RunnerInfo } from '@/types/OengusTypes';
import { oengusApi } from '@/apis/oengus';

export default defineComponent({
  name: 'runner-view',
  setup() {
    const runner = ref<RunnerInfo | null>(null);

    return {
      runner,
    };
  },
  data: () => ({
    username: '',
  }),
  watch: {
    '$route.params.name': {
      immediate: true,
      async handler(val) {
        this.runner = await oengusApi.getUserInfo(val);
      },
    },
  },
  computed: {
    twitchUsername(): string {
      if (!this.runner) {
        return '';
      }

      return (
        this.runner.connections.find((c) => c.platform === 'TWITCH')
          ?.username || ''
      );
    },
  },
});
</script>

<template>
  <div>
    <!-- TODO: font-awesome back icon -->
    <router-link to="/">&laquo; Go back</router-link>
    <div v-if="runner">
      <h1>{{ runner.username }}</h1>
      <div v-if="twitchUsername">
        <button>Follow @{{ twitchUsername }}</button>
      </div>
      <p v-else>No twitch info found for user</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
// TODO: style
</style>
