<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { TickerRun, RunnerInfo } from '@/types/OengusTypes';
import { oengusApi } from '@/apis/oengus';
import { useRunStore } from '@/stores/run';

export default defineComponent({
  name: 'runner-view',
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
    followOnTwitch(runner: RunnerInfo) {
      //
    },
    getAvatarUrl(runner: RunnerInfo): string {
      return oengusApi.getAvatarUrl(runner.username);
    },
    getTwitchUsername(runner: RunnerInfo): string {
      return (
        runner.connections.find((c) => c.platform === 'TWITCH')?.username ||
        'fake_username'
      );
    },
  },
});
</script>

<template>
  <div>
    <!-- TODO: font-awesome back icon -->
    <router-link to="/">&laquo; Go back</router-link>
    <div v-if="scheduleLine" class="columns">
      <div class="column" v-for="runner in scheduleLine.runners" :key="runner.id">
        <div class="card">
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img :src="getAvatarUrl(runner)" />
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">{{ runner.username }}</p>
                <p class="subtitle is-6">@{{ getTwitchUsername(runner) }}</p>
              </div>
            </div>

            <div class="content">
              <button @click="followOnTwitch(runner)" class="follow-btn">
                Follow
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.follow-btn {
  background-color: var(--twitch-purple);
  color: white;
  font-size: 2em;
  border: none;
}
</style>
