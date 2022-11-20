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
    avatarUrl(): string {
      if (!this.runner) {
        return '';
      }

      return oengusApi.getAvatarUrl(this.runner.username);
    },
    twitchUsername(): string {
      if (!this.runner) {
        return '';
      }

      return (
        this.runner.connections.find((c) => c.platform === 'TWITCH')
          ?.username || 'fake_username'
      );
    },
  },
  methods: {
    followOnTwitch() {
      //
    },
  },
});
</script>

<template>
  <div>
    <!-- TODO: font-awesome back icon -->
    <router-link to="/">&laquo; Go back</router-link>
    <div v-if="runner">
      <div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img :src="avatarUrl" alt="Placeholder image">
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">{{ runner.username }}</p>
              <p class="subtitle is-6">@{{ twitchUsername }}</p>
            </div>
          </div>

          <div class="content">
            <div v-if="twitchUsername">
              <button @click="followOnTwitch" class="follow-btn">
                Follow
              </button>
            </div>
            <p v-else>User did not link twitch to Oengus profile</p>
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
  font-size: 3em;
  border: none;
}
</style>
